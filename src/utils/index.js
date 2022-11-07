export default function getAsset(path) {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
}
