# Icon packs

Three packs of the same 16 site icons (trade, item-level cap, resist over cap, open affix, corrupted, expand, weapon, fine, warning, external link, search, settings, info, highlight, checklist, atlas), as one `sprite.svg` each, all `currentColor`.

- `lucide/`: Lucide 1.72 (ISC), 2px outline. Closest to the icons already on the site. Recommended.
- `phosphor/`: Phosphor Regular 2.1 (MIT), filled glyphs, softer. Heavier at 16px.
- `tabler/`: Tabler Outline 3.51 (MIT), 2px outline, the most icons if the set needs to grow.

Preview: serve the repo root (`python3 -m http.server`) and open `mockups/icons/index.html`.
Use one: copy a `<symbol>` into the page, then `<svg class="size-4" aria-hidden="true"><use href="#i-trade"/></svg>`, and keep a text label next to it. Stroke sets round their caps; the preview toggle shows the square variant to match the site's square-corner rule.
