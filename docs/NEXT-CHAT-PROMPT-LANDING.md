# Prompt: Landing page design lab (can edit the Pages site)

Paste everything below into a new chat in this repo (`Endgame-app-designs`).

---

## Role and goal

Build a **design lab for the landing page** (`site/index.html`, route `/`), the same way `site/lab/` works for `/character/`. Then, once I pick a look, **apply it to the real site** under `site/`, which GitHub Pages deploys from `main` via `.github/workflows/pages.yml`.

Read first: `docs/LAB.md`, `docs/NEXT-CHAT-PROMPT.md` (original lab brief, same style rules), and the skills in `.claude/skills/` (`site-snapshot-edit`, `site-ui-rules`, `site-verify-ship`, `ui-depth-and-wow`, `ui-design-critique-loop`, `ui-type-and-space`). Follow them.

## Permission (differs from the character lab)

- You **may edit the Pages site**: `site/index.html`, new CSS/JS files under `site/`, and the minified CSS in `site/_next/static/chunks/`, following `site-snapshot-edit`. Prefer new files (`site/landing/landing-lab.css`, `landing-lab.js`, `landing-final.css`) over editing minified chunks.
- Two phases:
  1. **Lab phase**: the Design panel on `/` swaps variants live. Base CSS untouched; variants keyed on `data-*` attributes on `<body>`. `?lab=0` disables it.
  2. **Ship phase** (only after I say which look to keep): bake the chosen options into a small permanent stylesheet linked from `site/index.html`, keep the lab behind `?lab=1` or remove it from `/` as I say, and open a PR to `main`. Do not merge; I merge.
- Still never touch or fetch the external live site (`upgraded-disco-companion`). Nothing outside this repo.

## Hard constraints

1. Keep the core design: dark palette, uppercase EB Garamond headings, Inter body, Geist Mono numbers, gold accent, **square corners only**, tinted-glass panels.
2. Do not change copy, numbers or links. Variants change layout and treatment only.
3. No canvas, stars, constellation or moving figures. Static backgrounds; motion only opacity/transform and only under `prefers-reduced-motion: no-preference`.
4. Vanilla only, no build step, no CDN. Asset paths stay under `/Endgame-app-designs/`.
5. Accessibility per `site-ui-rules`: 4.5:1 text contrast, visible focus, 44px targets, no horizontal overflow at 360 and 1440.
6. Keep the nav, footer and Skip link markup intact so other pages still match.

## What is on the landing page

Hero ("Stay Sane Exile", stats 32 steps / 14 strategies / 8 pinnacles / 42 Atlas nodes, intro line, Dashboard + Farming buttons), the "Up next" card (step 1 of 32, Mark done), Progress (checklist + Atlas bars), then four entry cards: Progression Checklist, Atlas Tree Planner, Farming Dashboard, Character Import.

## Variation groups (min 6 options each, polished and distinct)

- **Hero:** compact; split with stats rail; banner; stat strip as boxed numerals; stats as ruler ticks; minimal.
- **Up-next card:** step card with big numeral; stepper; receipt; sticky bottom strip on phones; framed with corner brackets; one-liner.
- **Progress:** segmented bars; ticks; ring-free square dial; stacked ledger rows; big percent numerals; spark columns.
- **Entry cards:** equal grid; bento with one large tile; rows with leaders; numbered index; tabs; stacked with side labels.
- **Card elevation / frame / fill / header:** reuse the vocabularies from `docs/LAB.md` so the two pages can share a preset.
- **Density, type scale, accent, background, motion, buttons, footer:** same idea.
- Add **presets** (at least 6, one called "Best") and a **Gallery** and **Compare**, as on the character lab.

## Lab behaviour

Same as `site/lab/`: Design button, drawer / bottom sheet, option filter, URL hash beats `localStorage` (use a different key, e.g. `lab:landing:v1`), Reset, Randomize (avoid known-bad pairs), Locate/Follow, preset save/rename/delete. Reuse `site/lab/lab.js` code where it fits instead of copying blindly; if sharing is cleaner, factor the common part into one file and say so.

## Process

- Work in batches, verify once per batch in a real browser at 360 and 1440 (screenshot, `?lab=audit` contrast count, overflow check), per `site-verify-ship`.
- Critique your own screenshots against the rubric in `ui-design-critique-loop` before showing me anything.
- Update `docs/LAB.md` with the landing groups and presets.
- Also output a single-file offline build with `python3 tools/build-standalone.py` (extend it to take the page as an argument) and send me `dist/landing-lab.html`.
- Branch from `main`, commit often, open a **draft PR**. Replies: 1 to 2 sentences, no questions; pick the best option and state it in one line.
