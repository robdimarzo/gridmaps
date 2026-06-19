import { LitElement, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { bundledDatasets } from './data/index.js';
import styles from './tile-map.css?inline';
import type {
  AdministrativeLayer,
  JurisdictionTile,
  LayoutConfig,
  LabelMode,
  SelectionChangeDetail,
  TileInteractionDetail,
  TileMapDataset,
} from './types.js';

@customElement('tile-map')
export class TileMap extends LitElement {
  static styles = unsafeCSS(styles);

  /** ISO country key — resolves to a bundled dataset. */
  @property({ type: String }) country = 'us';

  /** Pass a fully custom dataset instead of using a bundled one. */
  @property({ attribute: false }) data?: TileMapDataset;

  /** Layer id within the dataset. Defaults to dataset.defaultLayer. */
  @property({ type: String }) layer = '';

  /** Named layout config id within the layer. Defaults to layer.defaultLayout. */
  @property({ type: String }) layout = '';

  /** How tile labels are displayed. */
  @property({ type: String, attribute: 'label-mode' }) labelMode: LabelMode = 'abbrev';

  /** BCP 47 locale used for label resolution. */
  @property({ type: String }) locale = 'en';

  /** Comma-separated selected jurisdiction ids. Reflects as attribute. */
  @property({
    attribute: 'selected',
    converter: {
      fromAttribute: (v: string | null) =>
        v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [],
      toAttribute: (v: string[]) => v.join(','),
    },
  })
  selected: string[] = [];

  /** Allow multiple tiles to be selected at once. */
  @property({ type: Boolean, reflect: true }) multiple = false;

  @state() private selectionState = new Set<string>();

  protected willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('selected')) {
      this.selectionState = new Set(this.selected);
    }
  }

  // ── Data resolution ────────────────────────────────────────────────────────

  private get activeDataset(): TileMapDataset | undefined {
    return this.data ?? bundledDatasets[this.country];
  }

  private get activeLayer(): AdministrativeLayer | undefined {
    const ds = this.activeDataset;
    if (!ds) return undefined;
    return ds.layers[this.layer || ds.defaultLayer];
  }

  private get activeLayout(): LayoutConfig | undefined {
    const lyr = this.activeLayer;
    if (!lyr) return undefined;
    return lyr.layouts[this.layout || lyr.defaultLayout];
  }

  // ── Rendering ──────────────────────────────────────────────────────────────

  protected render() {
    const ds = this.activeDataset;
    const lyr = this.activeLayer;
    const cfg = this.activeLayout;

    if (!ds || !lyr || !cfg) {
      return html`<p part="error">No data found for country="${this.country}" layer="${this.layer || '(default)'}" layout="${this.layout || '(default)'}".</p>`;
    }

    // Build a lookup map so we can find tiles by id in O(1).
    const tileById = new Map<string, JurisdictionTile>(
      lyr.jurisdictions.map((j) => [j.id, j])
    );

    return html`
      <div
        class="grid"
        part="grid"
        role="group"
        aria-label="${ds.name ?? ds.countryId}"
        style=${styleMap({ '--_cols': String(cfg.grid.columns) })}
      >
        ${Object.entries(cfg.positions).map(([id, pos]) => {
          const jurisdiction = tileById.get(id);
          if (!jurisdiction) return nothing;
          return this.renderCell(ds.countryId, lyr.id, cfg.id, jurisdiction, pos);
        })}
      </div>
    `;
  }

  private renderCell(
    countryId: string,
    layerId: string,
    layoutId: string,
    jurisdiction: JurisdictionTile,
    pos: { row: number; column: number }
  ) {
    const label = this.resolveLabel(jurisdiction);
    const selected = this.selectionState.has(jurisdiction.id);
    const ariaLabel = label.secondary
      ? `${label.primary} (${label.secondary})`
      : label.primary;

    return html`
      <div
        class="cell"
        style=${styleMap({ gridColumn: String(pos.column), gridRow: String(pos.row) })}
      >
        <button
          type="button"
          part="tile"
          aria-pressed=${String(selected)}
          aria-label=${ariaLabel}
          title=${ariaLabel}
          @click=${() => this.onTileClick(countryId, layerId, layoutId, jurisdiction)}
          @mouseenter=${() => this.onTileHover('enter', countryId, layerId, layoutId, jurisdiction)}
          @mouseleave=${() => this.onTileHover('leave', countryId, layerId, layoutId, jurisdiction)}
          @focusin=${() => this.onTileHover('enter', countryId, layerId, layoutId, jurisdiction)}
          @focusout=${() => this.onTileHover('leave', countryId, layerId, layoutId, jurisdiction)}
        >
          <span class="label" aria-hidden="true">${label.primary}</span>
        </button>
      </div>
    `;
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private onTileClick(
    countryId: string,
    layerId: string,
    layoutId: string,
    jurisdiction: JurisdictionTile
  ): void {
    const next = new Set(this.selectionState);
    const wasSelected = next.has(jurisdiction.id);

    if (this.multiple) {
      wasSelected ? next.delete(jurisdiction.id) : next.add(jurisdiction.id);
    } else {
      next.clear();
      if (!wasSelected) next.add(jurisdiction.id);
    }

    this.selectionState = next;
    this.selected = [...next];

    const interactionDetail: TileInteractionDetail = {
      countryId,
      layerId,
      layoutId,
      jurisdiction,
      selected: next.has(jurisdiction.id),
    };

    const selectionDetail: SelectionChangeDetail = {
      countryId,
      layerId,
      layoutId,
      selected: [...next],
    };

    this.dispatchEvent(new CustomEvent<TileInteractionDetail>('tile-click', {
      detail: interactionDetail,
      bubbles: true,
      composed: true,
    }));

    this.dispatchEvent(new CustomEvent<SelectionChangeDetail>('selection-change', {
      detail: selectionDetail,
      bubbles: true,
      composed: true,
    }));
  }

  private onTileHover(
    direction: 'enter' | 'leave',
    countryId: string,
    layerId: string,
    layoutId: string,
    jurisdiction: JurisdictionTile
  ): void {
    const detail: TileInteractionDetail = {
      countryId,
      layerId,
      layoutId,
      jurisdiction,
      selected: this.selectionState.has(jurisdiction.id),
    };
    const eventName = direction === 'enter' ? 'tile-hover-enter' : 'tile-hover-leave';
    this.dispatchEvent(new CustomEvent<TileInteractionDetail>(eventName, {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  // ── Label resolution ───────────────────────────────────────────────────────

  private resolveLabel(j: JurisdictionTile): { primary: string; secondary?: string } {
    const abbrev = j.display_abbrev ?? j.id;
    const native = j.name_local ?? j.name ?? j.id;
    const latin = j.name ?? j.id;

    switch (this.labelMode) {
      case 'abbrev':
        return { primary: abbrev, secondary: native !== abbrev ? native : undefined };

      case 'name': {
        const isLatinLocale = !this.locale.startsWith('ja') && !this.locale.startsWith('zh') && !this.locale.startsWith('ko');
        const name = isLatinLocale ? latin : native;
        return { primary: name, secondary: abbrev !== name ? abbrev : undefined };
      }

      case 'native':
        return { primary: native, secondary: latin !== native ? latin : abbrev };

      case 'bilingual':
        return latin === native
          ? { primary: native, secondary: abbrev }
          : { primary: native, secondary: latin };
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'tile-map': TileMap;
  }
}
