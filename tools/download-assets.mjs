import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'assets', 'figma-assets.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
let ok = 0, failed = 0;
for (const asset of manifest.assets) {
  const destination = path.join(root, asset.path);
  try {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    const response = await fetch(asset.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    await fs.writeFile(destination, bytes);
    console.log(`saved ${asset.name} (${Math.round(bytes.length / 1024)} KB)`);
    ok++;
  } catch (error) {
    console.error(`failed ${asset.name}: ${error.message}`);
    failed++;
  }
}
console.log(`\nAsset download complete: ${ok} saved, ${failed} failed.`);
if (failed) process.exitCode = 1;
