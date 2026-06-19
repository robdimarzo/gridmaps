export interface TilePosition {
  row: number;
  column: number;
}

export interface LayoutConfig {
  id: string;
  name: string;
  grid: { columns: number; rows: number };
  /** Maps jurisdiction id → grid position. Only listed IDs are rendered. */
  positions: Record<string, TilePosition>;
}

export interface JurisdictionTile {
  id: string;
  iso_code: string;
  adm_level: number;
  type: string;
  type_local?: string;
  name: string;
  name_local?: string;
  /** Primary label shown on the tile face (e.g. "AL"). Falls back to id. */
  display_abbrev?: string;
  region?: string;
  aliases?: string[];
  /** Slot for developer-injected custom data; passed through in event detail. */
  metadata?: Record<string, unknown>;
}

export interface AdministrativeLayer {
  id: string;
  name: string;
  defaultLayout: string;
  layouts: Record<string, LayoutConfig>;
  jurisdictions: JurisdictionTile[];
}

export interface TileMapDataset {
  countryId: string;
  name: string;
  defaultLayer: string;
  layers: Record<string, AdministrativeLayer>;
}

export interface TileInteractionDetail {
  countryId: string;
  layerId: string;
  layoutId: string;
  jurisdiction: JurisdictionTile;
  selected: boolean;
}

export interface SelectionChangeDetail {
  countryId: string;
  layerId: string;
  layoutId: string;
  selected: string[];
}

export type LabelMode = 'abbrev' | 'name' | 'native' | 'bilingual';
