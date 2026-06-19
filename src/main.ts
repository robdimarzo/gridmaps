import './tile-map.js';
import { bundledDatasets } from './data/index.js';
import type { TileInteractionDetail, SelectionChangeDetail } from './types.js';

const map = document.getElementById('tile-map') as HTMLElement & {
  country: string;
  layer: string;
  layout: string;
  labelMode: string;
  locale: string;
  multiple: boolean;
};

const countrySelect = document.getElementById('country-select') as HTMLSelectElement;
const layerSelect = document.getElementById('layer-select') as HTMLSelectElement;
const layoutSelect = document.getElementById('layout-select') as HTMLSelectElement;
const labelModeSelect = document.getElementById('label-mode-select') as HTMLSelectElement;
const localeSelect = document.getElementById('locale-select') as HTMLSelectElement;
const multipleCheckbox = document.getElementById('multiple-checkbox') as HTMLInputElement;
const selectionOutput = document.getElementById('selection-output') as HTMLElement;
const hoverOutput = document.getElementById('hover-output') as HTMLElement;

function updateLayerOptions(country: string) {
  const ds = bundledDatasets[country];
  layerSelect.innerHTML = '';
  if (!ds) return;
  for (const [id, layer] of Object.entries(ds.layers)) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = layer.name ?? id;
    if (id === ds.defaultLayer) opt.selected = true;
    layerSelect.appendChild(opt);
  }
  updateLayoutOptions(country, layerSelect.value);
}

function updateLayoutOptions(country: string, layerId: string) {
  const ds = bundledDatasets[country];
  layoutSelect.innerHTML = '';
  if (!ds) return;
  const layer = ds.layers[layerId];
  if (!layer) return;
  for (const [id, cfg] of Object.entries(layer.layouts)) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = cfg.name ?? id;
    if (id === layer.defaultLayout) opt.selected = true;
    layoutSelect.appendChild(opt);
  }
}

function syncMap() {
  map.country = countrySelect.value;
  map.layer = layerSelect.value;
  map.layout = layoutSelect.value;
  map.labelMode = labelModeSelect.value;
  map.locale = localeSelect.value;
  map.multiple = multipleCheckbox.checked;
}

countrySelect.addEventListener('change', () => {
  updateLayerOptions(countrySelect.value);
  syncMap();
});

layerSelect.addEventListener('change', () => {
  updateLayoutOptions(countrySelect.value, layerSelect.value);
  syncMap();
});

layoutSelect.addEventListener('change', syncMap);
labelModeSelect.addEventListener('change', syncMap);
localeSelect.addEventListener('change', syncMap);
multipleCheckbox.addEventListener('change', syncMap);

map.addEventListener('selection-change', (e: Event) => {
  const detail = (e as CustomEvent<SelectionChangeDetail>).detail;
  selectionOutput.textContent = JSON.stringify(detail, null, 2);
});

map.addEventListener('tile-hover-enter', (e: Event) => {
  const { jurisdiction } = (e as CustomEvent<TileInteractionDetail>).detail;
  hoverOutput.textContent = `${jurisdiction.display_abbrev ?? jurisdiction.id} — ${jurisdiction.name ?? ''}`;
});

map.addEventListener('tile-hover-leave', () => {
  hoverOutput.textContent = '—';
});

// Init
updateLayerOptions(countrySelect.value);
syncMap();
