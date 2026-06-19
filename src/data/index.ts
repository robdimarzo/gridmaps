import type { TileMapDataset } from '../types.js';
import { usDataset } from './us.js';
import { jpDataset } from './jp.js';
import { caDataset } from './ca.js';
import { auDataset } from './au.js';
import { ukDataset } from './uk.js';
import { mxDataset } from './mx.js';
import { inDataset } from './in.js';
import { itDataset } from './it.js';

export const bundledDatasets: Record<string, TileMapDataset> = {
  us: usDataset,
  jp: jpDataset,
  ca: caDataset,
  au: auDataset,
  uk: ukDataset,
  mx: mxDataset,
  in: inDataset,
  it: itDataset,
};
