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

const countryLinks = document.querySelectorAll<HTMLAnchorElement>('.country-nav a');
const layerSelect = document.getElementById('layer-select') as HTMLSelectElement;
const layoutSelect = document.getElementById('layout-select') as HTMLSelectElement;
const labelModeSelect = document.getElementById('label-mode-select') as HTMLSelectElement;
const localeSelect = document.getElementById('locale-select') as HTMLSelectElement;
const multipleCheckbox = document.getElementById('multiple-checkbox') as HTMLInputElement;
const selectionOutput = document.getElementById('selection-output') as HTMLElement;
const hoverOutput = document.getElementById('hover-output') as HTMLElement;

let currentCountry = 'us';

function getCountryFromPath(): string {
  const key = window.location.pathname.replace(/^\//, '').split('/')[0];
  return key in bundledDatasets ? key : 'us';
}

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
  map.country = currentCountry;
  map.layer = layerSelect.value;
  map.layout = layoutSelect.value;
  map.labelMode = labelModeSelect.value;
  map.locale = localeSelect.value;
  map.multiple = multipleCheckbox.checked;
}

function setActiveLink(country: string) {
  countryLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.country === country);
  });
}

function navigate(country: string, push = true) {
  currentCountry = country;
  if (push) history.pushState({}, '', `/${country}`);
  setActiveLink(country);
  updateLayerOptions(country);
  syncMap();
}

// Country link clicks
countryLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navigate(a.dataset.country!);
  });
});

// Browser back / forward
window.addEventListener('popstate', () => {
  navigate(getCountryFromPath(), false);
});

// Layer / layout / options changes
layerSelect.addEventListener('change', () => {
  updateLayoutOptions(currentCountry, layerSelect.value);
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

// Init from URL
navigate(getCountryFromPath(), false);
