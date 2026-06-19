import type { TileMapDataset } from "../types.js";

// Placeholder 5×4 alphabetical grid — replace with a geographic layout.
const positions: Record<string, { row: number; column: number }> = {
	"IT-65": { row: 1, column: 1 }, // Abruzzo
	"IT-23": { row: 1, column: 2 }, // Aosta Valley
	"IT-75": { row: 1, column: 3 }, // Apulia
	"IT-77": { row: 1, column: 4 }, // Basilicata
	"IT-78": { row: 1, column: 5 }, // Calabria
	"IT-72": { row: 2, column: 1 }, // Campania
	"IT-45": { row: 2, column: 2 }, // Emilia-Romagna
	"IT-36": { row: 2, column: 3 }, // Friuli Venezia Giulia
	"IT-62": { row: 2, column: 4 }, // Lazio
	"IT-42": { row: 2, column: 5 }, // Liguria
	"IT-25": { row: 3, column: 1 }, // Lombardy
	"IT-57": { row: 3, column: 2 }, // Marche
	"IT-67": { row: 3, column: 3 }, // Molise
	"IT-21": { row: 3, column: 4 }, // Piedmont
	"IT-88": { row: 3, column: 5 }, // Sardinia
	"IT-82": { row: 4, column: 1 }, // Sicily
	"IT-32": { row: 4, column: 2 }, // Trentino-Alto Adige
	"IT-52": { row: 4, column: 3 }, // Tuscany
	"IT-55": { row: 4, column: 4 }, // Umbria
	"IT-34": { row: 4, column: 5 }, // Veneto
};

export const itDataset: TileMapDataset = {
	countryId: "it",
	name: "Italy",
	defaultLayer: "regions",
	layers: {
		regions: {
			id: "regions",
			name: "Regions",
			defaultLayout: "default",
			layouts: {
				default: {
					id: "default",
					name: "20 Regions",
					grid: { columns: 5, rows: 4 },
					positions,
				},
			},
			jurisdictions: [
				{
					id: "IT-65",
					iso_code: "IT-65",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Abruzzo",
					name_local: "Abruzzo",
					display_abbrev: "ABR",
					region: "Central",
				},
				{
					id: "IT-23",
					iso_code: "IT-23",
					adm_level: 1,
					type: "Region",
					type_local: "Regione autonoma",
					name: "Aosta Valley",
					name_local: "Valle d'Aosta",
					display_abbrev: "AO",
					region: "North-West",
				},
				{
					id: "IT-75",
					iso_code: "IT-75",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Apulia",
					name_local: "Puglia",
					display_abbrev: "PUG",
					region: "South",
				},
				{
					id: "IT-77",
					iso_code: "IT-77",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Basilicata",
					name_local: "Basilicata",
					display_abbrev: "BAS",
					region: "South",
				},
				{
					id: "IT-78",
					iso_code: "IT-78",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Calabria",
					name_local: "Calabria",
					display_abbrev: "CAL",
					region: "South",
				},
				{
					id: "IT-72",
					iso_code: "IT-72",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Campania",
					name_local: "Campania",
					display_abbrev: "CAM",
					region: "South",
				},
				{
					id: "IT-45",
					iso_code: "IT-45",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Emilia-Romagna",
					name_local: "Emilia-Romagna",
					display_abbrev: "EMR",
					region: "North",
				},
				{
					id: "IT-36",
					iso_code: "IT-36",
					adm_level: 1,
					type: "Region",
					type_local: "Regione autonoma",
					name: "Friuli Venezia Giulia",
					name_local: "Friuli Venezia Giulia",
					display_abbrev: "FVG",
					region: "North-East",
				},
				{
					id: "IT-62",
					iso_code: "IT-62",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Lazio",
					name_local: "Lazio",
					display_abbrev: "LAZ",
					region: "Central",
				},
				{
					id: "IT-42",
					iso_code: "IT-42",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Liguria",
					name_local: "Liguria",
					display_abbrev: "LIG",
					region: "North-West",
				},
				{
					id: "IT-25",
					iso_code: "IT-25",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Lombardy",
					name_local: "Lombardia",
					display_abbrev: "LOM",
					region: "North",
				},
				{
					id: "IT-57",
					iso_code: "IT-57",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Marche",
					name_local: "Marche",
					display_abbrev: "MAR",
					region: "Central",
				},
				{
					id: "IT-67",
					iso_code: "IT-67",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Molise",
					name_local: "Molise",
					display_abbrev: "MOL",
					region: "South",
				},
				{
					id: "IT-21",
					iso_code: "IT-21",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Piedmont",
					name_local: "Piemonte",
					display_abbrev: "PIE",
					region: "North-West",
				},
				{
					id: "IT-88",
					iso_code: "IT-88",
					adm_level: 1,
					type: "Region",
					type_local: "Regione autonoma",
					name: "Sardinia",
					name_local: "Sardegna",
					display_abbrev: "SAR",
					region: "Islands",
				},
				{
					id: "IT-82",
					iso_code: "IT-82",
					adm_level: 1,
					type: "Region",
					type_local: "Regione autonoma",
					name: "Sicily",
					name_local: "Sicilia",
					display_abbrev: "SIC",
					region: "Islands",
				},
				{
					id: "IT-32",
					iso_code: "IT-32",
					adm_level: 1,
					type: "Region",
					type_local: "Regione autonoma",
					name: "Trentino-Alto Adige",
					name_local: "Trentino-Alto Adige/Südtirol",
					display_abbrev: "TAA",
					region: "North",
				},
				{
					id: "IT-52",
					iso_code: "IT-52",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Tuscany",
					name_local: "Toscana",
					display_abbrev: "TOS",
					region: "Central",
				},
				{
					id: "IT-55",
					iso_code: "IT-55",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Umbria",
					name_local: "Umbria",
					display_abbrev: "UMB",
					region: "Central",
				},
				{
					id: "IT-34",
					iso_code: "IT-34",
					adm_level: 1,
					type: "Region",
					type_local: "Regione",
					name: "Veneto",
					name_local: "Veneto",
					display_abbrev: "VEN",
					region: "North-East",
				},
			],
		},
	},
};
