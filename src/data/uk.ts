import type { TileMapDataset } from '../types.js';

export const ukDataset: TileMapDataset = {
  countryId: 'uk',
  name: 'United Kingdom',
  defaultLayer: 'countries',
  layers: {
    countries: {
      id: 'countries',
      name: 'Countries',
      defaultLayout: 'default',
      layouts: {
        default: {
          id: 'default',
          name: 'Countries',
          grid: { columns: 2, rows: 2 },
          positions: {
            'UK-ENG': { row: 1, column: 1 },
            'UK-SCT': { row: 1, column: 2 },
            'UK-WLS': { row: 2, column: 1 },
            'UK-NIR': { row: 2, column: 2 },
          },
        },
      },
      jurisdictions: [
        { id: 'UK-ENG', iso_code: 'GB-ENG', adm_level: 1, type: 'Country', type_local: 'Country', name: 'England',          name_local: 'England',          display_abbrev: 'ENG', region: 'South', metadata: { devolved: false } },
        { id: 'UK-SCT', iso_code: 'GB-SCT', adm_level: 1, type: 'Country', type_local: 'Country', name: 'Scotland',         name_local: 'Scotland',         display_abbrev: 'SCT', region: 'North', metadata: { devolved: true  } },
        { id: 'UK-WLS', iso_code: 'GB-WLS', adm_level: 1, type: 'Country', type_local: 'Country', name: 'Wales',            name_local: 'Wales',            display_abbrev: 'WLS', region: 'West', metadata: { devolved: true  } },
        { id: 'UK-NIR', iso_code: 'GB-NIR', adm_level: 1, type: 'Country', type_local: 'Country', name: 'Northern Ireland', name_local: 'Northern Ireland', display_abbrev: 'NIR', region: 'West', metadata: { devolved: true  } },
      ],
    },
    regions: {
      id: 'regions',
      name: 'Regions',
      defaultLayout: 'default',
      layouts: {
        default: {
          id: 'default',
          name: 'Regions',
          grid: { columns: 4, rows: 3 },
          positions: {
            'UK-NE':  { row: 1, column: 1 },
            'UK-NW':  { row: 1, column: 2 },
            'UK-YH':  { row: 1, column: 3 },
            'UK-EM':  { row: 1, column: 4 },
            'UK-WM':  { row: 2, column: 1 },
            'UK-EE':  { row: 2, column: 2 },
            'UK-LON': { row: 2, column: 3 },
            'UK-SE':  { row: 2, column: 4 },
            'UK-SW':  { row: 3, column: 1 },
            'UK-SCT': { row: 3, column: 2 },
            'UK-WLS': { row: 3, column: 3 },
            'UK-NIR': { row: 3, column: 4 },
          },
        },
      },
      jurisdictions: [
        { id: 'UK-NE',  iso_code: 'GB-NE',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'North East',                   name_local: 'North East',                   display_abbrev: 'NE',  region: 'North' },
        { id: 'UK-NW',  iso_code: 'GB-NW',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'North West',                   name_local: 'North West',                   display_abbrev: 'NW',  region: 'North' },
        { id: 'UK-YH',  iso_code: 'GB-YH',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'Yorkshire and the Humber',     name_local: 'Yorkshire and the Humber',     display_abbrev: 'YH',  region: 'North' },
        { id: 'UK-EM',  iso_code: 'GB-EM',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'East Midlands',                name_local: 'East Midlands',                display_abbrev: 'EM',  region: 'Central' },
        { id: 'UK-WM',  iso_code: 'GB-WM',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'West Midlands',                name_local: 'West Midlands',                display_abbrev: 'WM',  region: 'Central' },
        { id: 'UK-EE',  iso_code: 'GB-EE',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'East of England',              name_local: 'East of England',              display_abbrev: 'EE',  region: 'East' },
        { id: 'UK-LON', iso_code: 'GB-LON', adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'London',                       name_local: 'London',                       display_abbrev: 'LON', region: 'South' },
        { id: 'UK-SE',  iso_code: 'GB-SE',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'South East',                   name_local: 'South East',                   display_abbrev: 'SE',  region: 'South' },
        { id: 'UK-SW',  iso_code: 'GB-SW',  adm_level: 2, type: 'Region',  type_local: 'Region',  name: 'South West',                   name_local: 'South West',                   display_abbrev: 'SW',  region: 'South' },
        { id: 'UK-SCT', iso_code: 'GB-SCT', adm_level: 2, type: 'Country', type_local: 'Country', name: 'Scotland',                     name_local: 'Scotland',                     display_abbrev: 'SCT', region: 'North' },
        { id: 'UK-WLS', iso_code: 'GB-WLS', adm_level: 2, type: 'Country', type_local: 'Country', name: 'Wales',                        name_local: 'Wales',                        display_abbrev: 'WLS', region: 'West' },
        { id: 'UK-NIR', iso_code: 'GB-NIR', adm_level: 2, type: 'Country', type_local: 'Country', name: 'Northern Ireland',             name_local: 'Northern Ireland',             display_abbrev: 'NIR', region: 'West' },
      ],
    },
    constituencies: {
      id: 'constituencies',
      name: 'Constituencies',
      defaultLayout: 'default',
      layouts: {
        default: {
          id: 'default',
          name: 'Westminster Constituencies by Nation',
          grid: { columns: 4, rows: 1 },
          positions: {
            'UK-ENG-PC': { row: 1, column: 1 },
            'UK-SCT-PC': { row: 1, column: 2 },
            'UK-WLS-PC': { row: 1, column: 3 },
            'UK-NIR-PC': { row: 1, column: 4 },
          },
        },
      },
      jurisdictions: [
        { id: 'UK-ENG-PC', iso_code: 'GB-ENG', adm_level: 2, type: 'Electoral', type_local: 'Electoral', name: 'England Constituencies',          name_local: 'England Constituencies',          display_abbrev: 'ENG', region: 'South', metadata: { seatCount: 543 } },
        { id: 'UK-SCT-PC', iso_code: 'GB-SCT', adm_level: 2, type: 'Electoral', type_local: 'Electoral', name: 'Scotland Constituencies',         name_local: 'Scotland Constituencies',         display_abbrev: 'SCT', region: 'North', metadata: { seatCount: 57  } },
        { id: 'UK-WLS-PC', iso_code: 'GB-WLS', adm_level: 2, type: 'Electoral', type_local: 'Electoral', name: 'Wales Constituencies',            name_local: 'Wales Constituencies',            display_abbrev: 'WLS', region: 'West', metadata: { seatCount: 32  } },
        { id: 'UK-NIR-PC', iso_code: 'GB-NIR', adm_level: 2, type: 'Electoral', type_local: 'Electoral', name: 'Northern Ireland Constituencies',  name_local: 'Northern Ireland Constituencies',  display_abbrev: 'NIR', region: 'West', metadata: { seatCount: 18  } },
      ],
    },
  },
};
