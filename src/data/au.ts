import type { TileMapDataset } from '../types.js';

const positions: Record<string, { row: number; column: number }> = {
  'AU-WA':  { row: 2, column: 1 },
  'AU-NT':  { row: 1, column: 3 },
  'AU-SA':  { row: 2, column: 3 },
  'AU-QLD': { row: 1, column: 4 },
  'AU-NSW': { row: 2, column: 4 },
  'AU-VIC': { row: 3, column: 4 },
  'AU-ACT': { row: 3, column: 5 },
  'AU-TAS': { row: 4, column: 5 },
};

export const auDataset: TileMapDataset = {
  countryId: 'au',
  name: 'Australia',
  defaultLayer: 'states-territories',
  layers: {
    'states-territories': {
      id: 'states-territories',
      name: 'States and Territories',
      defaultLayout: 'default',
      layouts: {
        default: {
          id: 'default',
          name: 'States and Territories',
          grid: { columns: 6, rows: 4 },
          positions,
        },
      },
      jurisdictions: [
        { id: 'AU-WA',  iso_code: 'AU-WA',  adm_level: 1, type: 'State',     type_local: 'State',     name: 'Western Australia',           name_local: 'Western Australia',           display_abbrev: 'WA',  region: 'West' },
        { id: 'AU-NT',  iso_code: 'AU-NT',  adm_level: 1, type: 'Territory', type_local: 'Territory', name: 'Northern Territory',          name_local: 'Northern Territory',          display_abbrev: 'NT',  region: 'North' },
        { id: 'AU-SA',  iso_code: 'AU-SA',  adm_level: 1, type: 'State',     type_local: 'State',     name: 'South Australia',             name_local: 'South Australia',             display_abbrev: 'SA',  region: 'Central' },
        { id: 'AU-QLD', iso_code: 'AU-QLD', adm_level: 1, type: 'State',     type_local: 'State',     name: 'Queensland',                  name_local: 'Queensland',                  display_abbrev: 'QLD', region: 'North' },
        { id: 'AU-NSW', iso_code: 'AU-NSW', adm_level: 1, type: 'State',     type_local: 'State',     name: 'New South Wales',             name_local: 'New South Wales',             display_abbrev: 'NSW', region: 'East' },
        { id: 'AU-VIC', iso_code: 'AU-VIC', adm_level: 1, type: 'State',     type_local: 'State',     name: 'Victoria',                    name_local: 'Victoria',                    display_abbrev: 'VIC', region: 'South' },
        { id: 'AU-ACT', iso_code: 'AU-ACT', adm_level: 1, type: 'Territory', type_local: 'Territory', name: 'Australian Capital Territory', name_local: 'Australian Capital Territory', display_abbrev: 'ACT', region: 'South' },
        { id: 'AU-TAS', iso_code: 'AU-TAS', adm_level: 1, type: 'State',     type_local: 'State',     name: 'Tasmania',                    name_local: 'Tasmania',                    display_abbrev: 'TAS', region: 'South' },
      ],
    },
  },
};
