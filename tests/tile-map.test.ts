import { beforeEach, describe, expect, it, vi } from 'vitest';

// Prevent Lit from writing to adoptedStyleSheets in jsdom
Object.defineProperty(document, 'adoptedStyleSheets', {
  value: [],
  writable: true,
  configurable: true,
});

import '../src/tile-map.js';
import { bundledDatasets } from '../src/data/index.js';
import type { TileInteractionDetail, SelectionChangeDetail } from '../src/types.js';

function wait(ms = 0) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

async function mountMap(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('tile-map') as HTMLElement;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await wait();
  return el;
}

beforeEach(() => {
  document.body.innerHTML = '';
});

// ── Bundled datasets ──────────────────────────────────────────────────────────

describe('bundledDatasets', () => {
  it('exports all 8 countries', () => {
    expect(Object.keys(bundledDatasets)).toEqual(['us', 'jp', 'ca', 'au', 'uk', 'mx', 'in', 'it']);
  });

  it('US has 3 layout variants', () => {
    const layouts = Object.keys(bundledDatasets['us'].layers['states'].layouts);
    expect(layouts).toContain('states-only');
    expect(layouts).toContain('with-dc');
    expect(layouts).toContain('with-territories');
  });

  it('US states-only has 50 positions', () => {
    const { positions } = bundledDatasets['us'].layers['states'].layouts['states-only'];
    expect(Object.keys(positions)).toHaveLength(50);
    expect(positions['US-DC']).toBeUndefined();
  });

  it('US with-dc has 51 positions including DC', () => {
    const { positions } = bundledDatasets['us'].layers['states'].layouts['with-dc'];
    expect(Object.keys(positions)).toHaveLength(51);
    expect(positions['US-DC']).toBeDefined();
    expect(positions['US-DC']).toEqual({ row: 6, column: 10 });
  });

  it('US with-territories has 56 positions', () => {
    const { positions } = bundledDatasets['us'].layers['states'].layouts['with-territories'];
    const ids = Object.keys(positions);
    expect(ids).toHaveLength(56);
    expect(positions['US-MP']).toBeDefined();
    expect(positions['US-GU']).toBeDefined();
    expect(positions['US-AS']).toBeDefined();
    expect(positions['US-PR']).toBeDefined();
    expect(positions['US-VI']).toBeDefined();
  });

  it('with-territories shifts states right by 2 vs with-dc', () => {
    const withDC = bundledDatasets['us'].layers['states'].layouts['with-dc'].positions;
    const withTerr = bundledDatasets['us'].layers['states'].layouts['with-territories'].positions;
    expect(withTerr['US-AK'].column).toBe(withDC['US-AK'].column + 2);
    expect(withTerr['US-CA'].column).toBe(withDC['US-CA'].column + 2);
  });

  it('JP has 47 prefectures with unique positions', () => {
    const { positions } = bundledDatasets['jp'].layers['prefectures'].layouts['default'];
    const coords = Object.values(positions).map(p => `${p.row}-${p.column}`);
    const unique = new Set(coords);
    expect(unique.size).toBe(47);
  });

  it('CA has 13 jurisdictions', () => {
    const { positions } = bundledDatasets['ca'].layers['provinces-territories'].layouts['default'];
    expect(Object.keys(positions)).toHaveLength(13);
  });

  it('AU has 8 jurisdictions', () => {
    const { positions } = bundledDatasets['au'].layers['states-territories'].layouts['default'];
    expect(Object.keys(positions)).toHaveLength(8);
  });
});

// ── Component rendering ──────────────────────────────────────────────────────

describe('<tile-map> rendering', () => {
  it('renders US states-only by default', async () => {
    const el = await mountMap({ country: 'us' });
    const shadow = el.shadowRoot!;
    const buttons = shadow.querySelectorAll('button[part="tile"]');
    expect(buttons.length).toBe(50);
  });

  it('renders US with-dc (51 tiles)', async () => {
    const el = await mountMap({ country: 'us', layout: 'with-dc' });
    const shadow = el.shadowRoot!;
    expect(shadow.querySelectorAll('button[part="tile"]').length).toBe(51);
  });

  it('renders US with-territories (56 tiles)', async () => {
    const el = await mountMap({ country: 'us', layout: 'with-territories' });
    const shadow = el.shadowRoot!;
    expect(shadow.querySelectorAll('button[part="tile"]').length).toBe(56);
  });

  it('renders Japan prefectures (47 tiles)', async () => {
    const el = await mountMap({ country: 'jp' });
    const shadow = el.shadowRoot!;
    expect(shadow.querySelectorAll('button[part="tile"]').length).toBe(47);
  });

  it('shows error for unknown country', async () => {
    const el = await mountMap({ country: 'xx' });
    expect(el.shadowRoot!.querySelector('[part="error"]')).toBeTruthy();
  });

  it('tiles have aria-pressed=false by default', async () => {
    const el = await mountMap({ country: 'us' });
    const first = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    expect(first.getAttribute('aria-pressed')).toBe('false');
  });

  it('tiles have correct grid placement for AK (col 1, row 1)', async () => {
    const el = await mountMap({ country: 'us' });
    const akCell = el.shadowRoot!.querySelector('.cell') as HTMLElement;
    // AK is first in positions order (row 1, col 1)
    expect(akCell.style.gridColumn).toBe('1');
    expect(akCell.style.gridRow).toBe('1');
  });

  it('label-mode abbrev shows abbreviation', async () => {
    const el = await mountMap({ country: 'us', 'label-mode': 'abbrev' });
    const buttons = el.shadowRoot!.querySelectorAll('button[part="tile"]');
    const labels = Array.from(buttons).map(b => b.querySelector('.label')!.textContent!.trim().slice(0, 2));
    // US state abbreviations are 2 chars — every label should start with 2 upper chars
    expect(labels.every(l => /^[A-Z]{2}/.test(l))).toBe(true);
  });
});

// ── Events ───────────────────────────────────────────────────────────────────

describe('<tile-map> events', () => {
  it('fires tile-click with correct detail', async () => {
    const el = await mountMap({ country: 'us' });
    const clickSpy = vi.fn();
    el.addEventListener('tile-click', clickSpy);

    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.click();

    expect(clickSpy).toHaveBeenCalledOnce();
    const detail: TileInteractionDetail = clickSpy.mock.calls[0][0].detail;
    expect(detail.countryId).toBe('us');
    expect(detail.layerId).toBe('states');
    expect(detail.layoutId).toBe('states-only');
    expect(detail.jurisdiction.iso_code).toMatch(/^US-/);
    expect(typeof detail.selected).toBe('boolean');
  });

  it('fires selection-change after tile-click', async () => {
    const el = await mountMap({ country: 'us' });
    const selectionSpy = vi.fn();
    el.addEventListener('selection-change', selectionSpy);

    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.click();

    expect(selectionSpy).toHaveBeenCalledOnce();
    const detail: SelectionChangeDetail = selectionSpy.mock.calls[0][0].detail;
    expect(detail.selected).toHaveLength(1);
  });

  it('single-select deselects previous on second click of different tile', async () => {
    const el = await mountMap({ country: 'us' });
    const selectionSpy = vi.fn();
    el.addEventListener('selection-change', selectionSpy);

    const buttons = el.shadowRoot!.querySelectorAll('button[part="tile"]');
    (buttons[0] as HTMLButtonElement).click();
    await wait();
    (buttons[1] as HTMLButtonElement).click();
    await wait();

    const lastDetail: SelectionChangeDetail = selectionSpy.mock.lastCall![0].detail;
    expect(lastDetail.selected).toHaveLength(1);
  });

  it('multiple mode accumulates selections', async () => {
    const el = await mountMap({ country: 'us', multiple: '' });
    const selectionSpy = vi.fn();
    el.addEventListener('selection-change', selectionSpy);

    const buttons = el.shadowRoot!.querySelectorAll('button[part="tile"]');
    (buttons[0] as HTMLButtonElement).click();
    await wait();
    (buttons[1] as HTMLButtonElement).click();
    await wait();

    const lastDetail: SelectionChangeDetail = selectionSpy.mock.lastCall![0].detail;
    expect(lastDetail.selected).toHaveLength(2);
  });

  it('clicking selected tile in single mode deselects it', async () => {
    const el = await mountMap({ country: 'us' });
    const selectionSpy = vi.fn();
    el.addEventListener('selection-change', selectionSpy);

    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.click();
    await wait();
    btn.click();
    await wait();

    const lastDetail: SelectionChangeDetail = selectionSpy.mock.lastCall![0].detail;
    expect(lastDetail.selected).toHaveLength(0);
  });

  it('fires tile-hover-enter on mouseenter', async () => {
    const el = await mountMap({ country: 'us' });
    const hoverSpy = vi.fn();
    el.addEventListener('tile-hover-enter', hoverSpy);

    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, composed: true }));

    expect(hoverSpy).toHaveBeenCalledOnce();
    const detail: TileInteractionDetail = hoverSpy.mock.calls[0][0].detail;
    expect(detail.jurisdiction).toBeDefined();
  });

  it('fires tile-hover-leave on mouseleave', async () => {
    const el = await mountMap({ country: 'us' });
    const leaveSpy = vi.fn();
    el.addEventListener('tile-hover-leave', leaveSpy);

    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, composed: true }));

    expect(leaveSpy).toHaveBeenCalledOnce();
  });
});

// ── Layout switching ──────────────────────────────────────────────────────────

describe('<tile-map> layout switching', () => {
  it('switching layout re-renders the grid', async () => {
    const el = await mountMap({ country: 'us', layout: 'states-only' });
    expect(el.shadowRoot!.querySelectorAll('button[part="tile"]').length).toBe(50);

    el.setAttribute('layout', 'with-territories');
    await wait();
    expect(el.shadowRoot!.querySelectorAll('button[part="tile"]').length).toBe(56);
  });

  it('switching country re-renders with new country data', async () => {
    const el = await mountMap({ country: 'us' });
    expect(el.shadowRoot!.querySelectorAll('button[part="tile"]').length).toBe(50);

    el.setAttribute('country', 'ca');
    el.setAttribute('layout', '');
    await wait();
    expect(el.shadowRoot!.querySelectorAll('button[part="tile"]').length).toBe(13);
  });
});

// ── Custom data injection ─────────────────────────────────────────────────────

describe('<tile-map> custom data', () => {
  it('accepts a custom dataset via the data property', async () => {
    const el = document.createElement('tile-map') as HTMLElement & { data: unknown };
    el.setAttribute('country', 'custom');
    el.data = {
      countryId: 'custom',
      name: 'Custom Country',
      defaultLayer: 'regions',
      layers: {
        regions: {
          id: 'regions',
          labels: { en: 'Regions' },
          defaultLayout: 'default',
          layouts: {
            default: {
              id: 'default',
              label: { en: 'Default' },
              grid: { columns: 3, rows: 1 },
              positions: {
                'A': { row: 1, column: 1 },
                'B': { row: 1, column: 2 },
                'C': { row: 1, column: 3 },
              },
            },
          },
          jurisdictions: [
            { id: 'A', iso_code: 'XX-A', adm_level: 1, type: 'Region', name: 'Alpha', display_abbrev: 'A' },
            { id: 'B', iso_code: 'XX-B', adm_level: 1, type: 'Region', name: 'Beta',  display_abbrev: 'B' },
            { id: 'C', iso_code: 'XX-C', adm_level: 1, type: 'Region', name: 'Gamma', display_abbrev: 'C' },
          ],
        },
      },
    };
    document.body.appendChild(el);
    await wait();
    expect(el.shadowRoot!.querySelectorAll('button[part="tile"]').length).toBe(3);
  });

  it('passes metadata through tile-click event detail', async () => {
    const el = document.createElement('tile-map') as HTMLElement & { data: unknown };
    el.data = {
      countryId: 'meta-test',
      name: 'Meta Test',
      defaultLayer: 'regions',
      layers: {
        regions: {
          id: 'regions',
          labels: { en: 'Regions' },
          defaultLayout: 'default',
          layouts: {
            default: {
              id: 'default',
              label: { en: 'Default' },
              grid: { columns: 1, rows: 1 },
              positions: { 'X': { row: 1, column: 1 } },
            },
          },
          jurisdictions: [
            {
              id: 'X',
              iso_code: 'MT-X',
              adm_level: 1,
              type: 'Region',
              name: 'X Region',
              display_abbrev: 'X',
              metadata: { population: 1_000_000, capital: 'Xville' },
            },
          ],
        },
      },
    };
    document.body.appendChild(el);
    await wait();

    const clickSpy = vi.fn();
    el.addEventListener('tile-click', clickSpy);
    const btn = el.shadowRoot!.querySelector('button[part="tile"]') as HTMLButtonElement;
    btn.click();

    const { jurisdiction } = (clickSpy.mock.calls[0][0] as CustomEvent<TileInteractionDetail>).detail;
    expect(jurisdiction.metadata?.['population']).toBe(1_000_000);
    expect(jurisdiction.metadata?.['capital']).toBe('Xville');
  });
});
