import type { TileMapDataset } from '../types.js';

// Grid derived from the user's 8×3 Canada tile map.
// West-to-east: territories across top, then provinces L→R, Atlantic bottom-right.
const positions: Record<string, { row: number; column: number }> = {
  'CA-YT': { row: 1, column: 2 },
  'CA-NT': { row: 1, column: 3 },
  'CA-NU': { row: 1, column: 4 },
  'CA-BC': { row: 2, column: 1 },
  'CA-AB': { row: 2, column: 2 },
  'CA-SK': { row: 2, column: 3 },
  'CA-MB': { row: 2, column: 4 },
  'CA-PE': { row: 2, column: 7 },
  'CA-ON': { row: 3, column: 4 },
  'CA-QC': { row: 3, column: 5 },
  'CA-NL': { row: 3, column: 6 },
  'CA-NB': { row: 3, column: 7 },
  'CA-NS': { row: 3, column: 8 },
};

export const caDataset: TileMapDataset = {
  countryId: 'ca',
  name: 'Canada',
  defaultLayer: 'provinces-territories',
  layers: {
    'provinces-territories': {
      id: 'provinces-territories',
      name: 'Provinces and Territories',
      defaultLayout: 'default',
      layouts: {
        default: {
          id: 'default',
          name: 'Provinces and Territories',
          grid: { columns: 8, rows: 3 },
          positions,
        },
      },
      jurisdictions: [
        { id: 'CA-YT', iso_code: 'CA-YT', adm_level: 1, type: 'Territory', type_local: 'Territory', name: 'Yukon',                      name_local: 'Yukon',                        display_abbrev: 'YT', region: 'North' },
        { id: 'CA-NT', iso_code: 'CA-NT', adm_level: 1, type: 'Territory', type_local: 'Territory', name: 'Northwest Territories',       name_local: 'Territoires du Nord-Ouest',    display_abbrev: 'NT', region: 'North' },
        { id: 'CA-NU', iso_code: 'CA-NU', adm_level: 1, type: 'Territory', type_local: 'Territory', name: 'Nunavut',                     name_local: 'Nunavut',                      display_abbrev: 'NU', region: 'North' },
        { id: 'CA-BC', iso_code: 'CA-BC', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'British Columbia',            name_local: 'Colombie-Britannique',         display_abbrev: 'BC', region: 'West' },
        { id: 'CA-AB', iso_code: 'CA-AB', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Alberta',                     name_local: 'Alberta',                      display_abbrev: 'AB', region: 'West' },
        { id: 'CA-SK', iso_code: 'CA-SK', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Saskatchewan',                name_local: 'Saskatchewan',                 display_abbrev: 'SK', region: 'West' },
        { id: 'CA-MB', iso_code: 'CA-MB', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Manitoba',                    name_local: 'Manitoba',                     display_abbrev: 'MB', region: 'West' },
        { id: 'CA-ON', iso_code: 'CA-ON', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Ontario',                     name_local: 'Ontario',                      display_abbrev: 'ON', region: 'East' },
        { id: 'CA-QC', iso_code: 'CA-QC', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Quebec',                      name_local: 'Québec',                       display_abbrev: 'QC', region: 'East' },
        { id: 'CA-NL', iso_code: 'CA-NL', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Newfoundland and Labrador',   name_local: 'Terre-Neuve-et-Labrador',      display_abbrev: 'NL', region: 'East' },
        { id: 'CA-NB', iso_code: 'CA-NB', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'New Brunswick',               name_local: 'Nouveau-Brunswick',            display_abbrev: 'NB', region: 'East' },
        { id: 'CA-NS', iso_code: 'CA-NS', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Nova Scotia',                 name_local: 'Nouvelle-Écosse',              display_abbrev: 'NS', region: 'East' },
        { id: 'CA-PE', iso_code: 'CA-PE', adm_level: 1, type: 'Province',  type_local: 'Province',  name: 'Prince Edward Island',        name_local: 'Île-du-Prince-Édouard',        display_abbrev: 'PE', region: 'East' },
      ],
    },
  },
};
