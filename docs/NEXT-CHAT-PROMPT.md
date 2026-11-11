# Prompt: Character analysis design lab

Paste everything below into the new chat (in this repo, `Endgame-app-designs`). Attach `Character_Analysis_Glass_1.html` if you want it as the interaction reference.

---

## Role and goal

You are building a **design lab** inside this repo. The repo is a static, script-free snapshot of a Path of Exile 2 companion site (`site/`, deployed to GitHub Pages by `.github/workflows/pages.yml` on merge to `main`). Work only on the **character analysis snapshot** at `site/character/index.html` and its CSS (`site/_next/static/chunks/*.css`). It shows a real analysis of the character *Yykiuy*.

The lab is a page you use to restyle the analysis live: a control panel of dropdowns and toggles where each control swaps one visual aspect, you see the result at once, and you keep refining. It is **not** an exporter. The finished site is this site, hosted on GitHub Pages.

## Hard constraints (do not break)

1. **Do not change the core design.** Keep the dark palette, uppercase EB Garamond for headings and labels (finding/step titles sentence case), Inter for body, Geist Mono for numbers, gold accent, **square corners everywhere (no `border-radius`, no pills, no circles)**, no script fonts, tinted-glass data panels. Variants change *how things are displayed*, never the identity.
2. **Do not change content or numbers.** The analysis text, stats, grades and findings stay as they are. Variants only change layout, treatment and presentation.
3. **No stars, constellation, canvas or moving figures.** Static backgrounds only (gradients, grain, vignettes are fine).
4. **Nothing outside this repo.** The live site (`upgraded-disco-companion`) is never touched or fetched from.
5. **Vanilla only.** One small `lab.js` plus `lab.css`. No frameworks, no build step, no CDN. Asset paths stay under `/Endgame-app-designs/`.
6. **Keep replies to 1 to 2 sentences.** Don't ask questions; pick the best option and say which in one line. Verify once at the end (a single Playwright or curl pass), not after every change.

## How the lab works

- A **Design** button opens a collapsible panel (square, glass, same type as the site; right-side drawer on desktop, bottom sheet on phones). Sections of dropdowns, one per variation group below. Include **Reset**, **Randomize** (one option per group), **Compare** (hold to show the default), and **Presets** (named bundles; save/rename/delete in `localStorage`).
- Each dropdown sets a named `data-*` attribute on `<body>` (e.g. `data-card="raised"`). All variants are plain CSS in `lab.css` keyed on those attributes, so the base CSS is untouched and removing the lab restores the original look.
- Persist the selection in `localStorage` and in the URL hash (`#card=raised&grade=ring`) so any combination is linkable. The hash wins over storage. `?lab=0` hides the panel.
- Keyboard accessible with visible focus. Label each option with a short name and a one-line `title`.

## Variation groups

Build in batches. Each group needs **at least the option count listed**; more is better. Every option must look deliberate, polished and distinct, and hold up at 360px and 1440px. Invent options beyond the examples; none of these lists is final.

### Batch 1: Surfaces and structure (min 8 options each)

- **Card elevation:** flat hairline; soft raised; hard offset shadow (stepped); layered stack (two ghost cards behind); inset/pressed; floating with ambient gold underglow; top-lit edge (1px highlight on top, shade below); engraved double border; none (content on the page).
- **Panel fill:** clear glass; frosted tint; solid ink; vertical gradient; diagonal sheen; noise grain; dark parchment texture; duotone gold wash.
- **Borders and frames:** hairline; double rule; gold corner brackets; notched corners via `clip-path` (still straight-edged); left accent bar; top accent bar; dashed technical; none with spacing only.
- **Card header:** label above; label in a tab on the border; label with rule extending right; numbered section marker; small-caps strip with filled bar; rotated 90° side label; minimal; header with count badge.
- **Section dividers:** thin rule; gold diamond mid-rule; ornamental gap; tick-mark ruler; gradient fade; none.
- **Layout density and grid:** compact; comfortable; spacious; single column; two column; masonry; bento with one hero tile.

### Batch 2: Verdict, grades and numbers (min 8 options each)

- **Build score / grade display:** large letter; letter in a square frame; segmented bar; linear tick gauge; stacked range band for a range like D–B; stepped ladder with current rung lit; badge plus caption; monogram plate; ledger line (grade in the margin).
- **Stat rows:** table; ledger with dotted leaders; stacked label/value; value-first big numerals; inline chips; mini bar behind the row; zebra; two-up pairs.
- **Numerals:** Geist Mono tabular; EB Garamond old-style figures; lining figures; gold highlight on key values; muted unit suffixes; large value with small unit; condensed stretch.
- **Defence and resist visuals:** plain numbers; segmented meters; thin underlined meters; capped-vs-current markers; heat strip; mini column spark; dial made from square ticks; delta chips versus target.
- **Severity and status:** colour dot; square badge; left stripe; text tag; glyph; full-row tint; outlined vs filled; traffic strip. Pair every colour with a shape or word (colour-blind safe).

### Batch 3: Findings, recommendations and reading flow (min 6 options each)

- **Findings list:** cards; numbered timeline with thread connectors; accordion rows; two-column problem/fix; checklist with square boxes; priority-sorted rail; compact one-liners with expand; columns split by severity.
- **Recommendations:** step cards; stepper with progress; before/after pairs; effort-impact matrix of squares; tiered tabs (Now / Soon / Later); kanban lanes; sticky "next action" strip.
- **Section navigation:** sticky top tabs; left rail with scroll-spy; anchor chips; jump menu; progress rule along the top; none.
- **Disclosure:** all open; accordions; "Pro detail" toggles; tabs inside cards; hover-reveal on desktop with tap-reveal on phones; plus Expand all / Collapse all.
- **Page header / hero:** compact line; character plate with class and level; wide banner; split title with meta on the right; breadcrumb plus title; minimal.

### Batch 4: Type, colour, background, finish (min 6 options each)

- **Heading style:** tracked uppercase; large with gold underline; numbered prefix; outlined; split weight; centred with side rules; small-caps plain.
- **Type scale and rhythm:** tight; standard; airy; fluid; editorial (wider measure, larger leading).
- **Accent palette (gold family only):** antique gold; pale champagne; amber; brass; rose gold; bronze, each with a readable positive/negative pair.
- **Background (static):** flat ink; top vignette; corner glows; fine grain; diagonal hatch; faint grid; gradient band behind the hero only; layered fog.
- **Motion (CSS only, respect `prefers-reduced-motion`):** none; gentle card lift on hover; border draw-in on load; staggered fade-up; underline sweep; focus pulse.
- **Interaction states:** hover/focus/pressed treatments (underline, glow edge, offset shift, fill sweep, bracket expand).
- **Footer and meta:** minimal; sourced-from line with timestamp plate; badge row; none.

### Batch 5: Polish (last)

- Make combinations robust: no overlap, clipping or contrast failures in any combination (WCAG AA for text against each fill).
- Add 8 to 12 **named presets** pairing options into coherent, clearly different themes (e.g. Archive, Ledger, Plate, Quiet, Dense ops, Editorial, Relic, Blueprint), each looking like a finished product.
- Add a **Gallery** view: the same card rendered in every option of the selected group, side by side, click to apply.
- Tidy: spacing tokens, `:root` custom properties for variant values, no dead CSS, and a short `docs/LAB.md` listing groups, options, hash keys and presets.

## Process

1. Grep `site/character/index.html` for section and class names (don't dump the file). Add stable `data-lab="..."` hooks where classes are too generic, without changing visible output.
2. Build panel, hash/localStorage plumbing and **Batch 1** end to end first, then Batches 2 to 5 one at a time, committing after each.
3. Open a draft PR to `main`; do not watch it, I will merge. After merge, check `https://demonad112.github.io/Endgame-app-designs/character/` once.
4. Quality bar: it should read as a product designed over months. More, better-crafted options beat fewer; if a group can support more, add them in a follow-up batch rather than skipping.

## About the reference (`Character_Analysis_Glass_1.html`)

Use it only for the interaction idea; do not read it in full or copy its variants. It has a "Variations" button opening a panel with a few numeric axes (`data-s`, `data-m`, `data-h`, `data-d`, `data-b`, `data-z`, `data-x`, `data-t`, `data-c`), Reset and "Copy code". Differences here:

- Named `data-*` attributes and a URL hash instead of "Copy code"; no export. This site is the product.
- Every option must be **new** versus that file. Skip what it already does (basic glass/solid fills, simple spacing steps) unless pushed clearly further.

## Done means

- Character page loads with the panel; every group has its minimum options, all working and combinable.
- Selections persist, are shareable via URL hash, and reset cleanly; Reset or `?lab=0` restores the original look.
- No `border-radius` in the lab CSS; no scripts besides `lab.js`; no requests beyond the site's own files.
