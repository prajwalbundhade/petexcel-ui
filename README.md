# Pet Excel Marketing — Figma-to-HTML implementation

A responsive HTML/CSS/JavaScript implementation of the **Pet Excel** landing-page frame in the connected Figma file (`sh8P3FqcZz6ecK6vKBgCr8`, node `1:2`).

## Run locally

Open `index.html` directly, or serve this folder with any static server. For example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Original Figma assets

The project includes a manifest of the image and SVG asset URLs returned by Figma, plus a downloader:

```bash
node tools/download-assets.mjs
```

Run this as soon as possible. Figma MCP asset URLs are temporary, so the archive includes the source references and filenames but not binary copies of every image. After successful download, the page automatically uses the local copies under `assets/images/`; before that, it falls back to the original Figma-hosted URL for the primary page images.

## What's included

- `index.html` — page structure and content
- `css/style.css` — layout, typography, styling and responsive rules
- `js/script.js` — mobile navigation, asset fallback, subscription-form feedback and footer year
- `assets/figma-assets.json` — exported asset manifest (original images, section renders and SVGs)
- `tools/download-assets.mjs` — saves the source assets locally

## Notes on fidelity

The implementation reproduces the frame's sections, copy, black/yellow art direction, major spacing and section imagery. Exported Figma composite frames are used for the client-logo strip, service section, founder panels and team strip to preserve those detailed visuals. Other sections are recreated with HTML and CSS. Fine browser-vs-Figma rendering differences may remain. The newsletter form currently validates and displays a connection note; connect it to your email marketing provider to collect subscriptions. The video tiles are visual placeholders because playable video URLs were not present in the inspected layer metadata.
