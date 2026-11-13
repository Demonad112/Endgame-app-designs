---
name: site-snapshot-edit
description: How to safely edit the Endgame companion site, which is a minified static Next.js export in site/. Use this whenever the user asks to change, port, restyle or add a section on any page under site/ (character, dashboard, trade, checklist, atlas...), touch the gear markup, or add CSS for the live site, even if they just say "change the real page".
---

# Editing the static snapshot

`site/**/index.html` is build output, minified onto one or two lines, and there is no source repo or build step here. Edit it surgically and keep the page hydrating.

## Workflow
1. Locate the section by id: `grep -o '<section id="gear".\{0,300\}' site/character/index.html`. Never open the whole file; it is huge.
2. Do the change with a small Python script (read, slice between `<section id="x"` and the next `</section>`, replace, write). A script keeps the diff to the intended span and is re-runnable.
3. Put new CSS in a separate file next to the page (e.g. `site/character/gear-ladder.css`), scoped under the section id (`#gear ...`), and link it with `<link rel="stylesheet" href="/Endgame-app-designs/character/<file>.css">` before the lab.css link. Do not touch `_next/static` bundles.
4. Reuse the existing classes/tokens (`card`, `btn btn-secondary btn-sm`, `label-metric`, CSS vars) instead of inventing new ones. See site-ui-rules.

## Hooks you must not break
The design lab (`site/lab/lab.css`, `lab.js`, `?lab=0` disables it) and React hydration read these: `li[data-slot][data-band][data-gap][data-flags]` with `style="--gap:N"`, `ol[data-gear-targets]`, `ul[data-lab=gdelta] > li[data-slot][data-from][data-to]`, `body[data-gear=...]`. Keep attributes, item names, copy and trade links verbatim; only restructure inside.

## Gotchas
- Order is baked into the static HTML (gear is sorted worst gap first). If the real app re-renders, its renderer must sort too; say so in the PR.
- Hydration can discard markup that differs from what React expects. After editing, wait ~2s in a browser and re-count the elements you added.
- Base path is `/Endgame-app-designs/`; absolute asset URLs must include it.
