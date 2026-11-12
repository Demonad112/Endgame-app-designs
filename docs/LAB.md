# Design lab

Live restyling of `/character/`. A **Design** button opens a panel; each dropdown sets `data-<key>` on `<body>`. All variants live in `site/lab/lab.css` (unlayered, square corners only); behaviour in `site/lab/lab.js` (`GROUPS` is the single source of truth).

- State: URL hash (`#card=raised&grade=seal`) beats `localStorage["lab:v1"]`. Default option = no attribute.
- `?lab=0` disables the lab entirely. `?lab=audit` outlines text under 4.5:1 contrast (dev). `?lab=solo&t=<selector>` is used by the gallery iframes.
- Panel: option filter, status line (`Preset: X` / `Custom - N changed` / `Original design`), changed-from-default dot with per-group reset, focus trap with focus restore in the drawer and gallery, Reset, Randomize (avoids known-bad pairs), Compare (hold), Gallery, Expand/Collapse all, presets (save, rename, delete in `localStorage["lab:presets"]`).
- Remove the `<link>` and `<script>` for lab.css / lab.js from `site/character/index.html` to restore the original page.

## Presets

Defined in `PRESETS`; one-line titles in `PRESET_META` (used as the `<option title>`). Both are exposed as `window.__labPresets` / `window.__labPresetMeta`.

- **Archive**: Dark parchment, engraved double frames, old-style figures, antique gold.
- **Ledger**: Flat ink ledger: tick frames, overline heads, boxed numerals, bands.
- **Plate**: Raised riveted plates with strip headers and slab grades.
- **Quiet**: Bare, airy and muted: minimal heads, mono figures, narrow measure.
- **Dense Ops**: Compact operations view: three columns, notched meters, one-liners.
- **Editorial**: Magazine layout: hanging labels, luxe spacing, large leading.
- **Relic**: Top-lit notched cards, foil headings, bronze accent.
- **Blueprint**: Dashed cutouts on a faint grid, scanlines, bracketed chips.
- **Field Report**: Shelf cards, grain fill, zebra rows, stepper recommendations.
- **Vault**: Underglow cards, gold wash, brackets, patterned damage colours.
- **Telegraph**: Hard stepped shadows, side labels, receipt recommendations.
- **Codex**: Stacked parchment cards, chapter numerals, indexed findings.

## Groups

| Hash key | Group | Options (besides `base` = original) |
|---|---|---|
| `card` | Card elevation | `flat`, `raised`, `stepped`, `stack`, `pressed`, `underglow`, `toplit`, `engraved`, `bare`, `cutout`, `shelf` |
| `fill` | Panel fill | `clear`, `frost`, `ink`, `vgrad`, `sheen`, `grain`, `parchment`, `duotone`, `scanline`, `smoke` |
| `frame` | Borders & frames | `double`, `brackets`, `notch`, `barL`, `barT`, `dashed`, `spaced`, `rivets`, `tickframe` |
| `head` | Card header | `tab`, `rule`, `overline`, `strip`, `side`, `minimal`, `marker`, `hanging` |
| `divider` | Section dividers | `rule`, `diamond`, `ornament`, `ticks`, `fade`, `chapter`, `ledger` |
| `density` | Density | `compact`, `snug`, `comfy`, `spacious`, `luxe` |
| `grid` | Layout grid | `1col`, `2col`, `3col`, `masonry`, `bento`, `rail`, `gutter` |
| `grade` | Grade display | `letter`, `slab`, `segbar`, `ticks`, `band`, `ladder`, `badge`, `underbar`, `margin`, `seal`, `stencil` |
| `rows` | Stat rows | `table`, `leaders`, `centered`, `valuefirst`, `chips`, `plinth`, `zebra`, `pairs`, `ruled`, `tabbed` |
| `nums` | Numerals | `oldstyle`, `lining`, `sans`, `keygold`, `mono`, `bigvalue`, `condensed`, `slashedzero` |
| `meter` | Resist meters | `plain`, `segments`, `underline`, `capmark`, `heat`, `spark`, `dial`, `delta`, `ruler`, `notched` |
| `sev` | Severity & status | `square`, `badge`, `stripe`, `tag`, `glyph`, `rowtint`, `outline`, `filled`, `traffic`, `margin` |
| `dmg` | Damage colour | `tint`, `patterned`, `mono`, `legend`, `swatch` |
| `findings` | Findings list | `timeline`, `accordion`, `split`, `bands`, `rail`, `oneliners`, `columns`, `index`, `cards` |
| `recs` | Recommendations | `stepcards`, `stepper`, `beforeafter`, `grid` (3-up bordered tiles, big number), `lanes` (full-width rows, left lane header), `sticky`, `receipt` |
| `gear` | Gear layout | `ladder` (worst gap first, gap meter, band stripe), `slots` (paperdoll grid), `compact` (aligned one-row-per-slot), `bars` (one full-width gap bar per slot, worst first, band word + gap number), `tiers` (Far / Mid / Near groups, heading on the first card of each band) |
| `gdelta` | Skill gear changes | `delta` (tier-range pips), `tags` (slot tag, hover/focus/click lights the gear card), `compact` (one-liners), `grouped` (rows ordered by slot, one slot heading per slot, CSS only) |
| `nav` | Section navigation | `tabs`, `rail`, `chips`, `jump`, `progress`, `none` |
| `disclose` | Disclosure | `tabs`, `open`, `accordion`, `pro`, `hover` |
| `hero` | Page hero | `compact`, `plate`, `banner`, `split`, `crumb`, `minimal`, `ledgerhead` |
| `htype` | Headings | `tracked`, `underline`, `numbered`, `outlined`, `split`, `centred`, `smallcaps`, `foil` |
| `scale` | Type scale | `tight`, `airy`, `fluid`, `editorial`, `standard` |
| `accent` | Accent palette | `champagne`, `amber`, `brass`, `rose`, `bronze`, `antique` |
| `bg` | Background | `flat`, `vignette`, `corners`, `grain`, `hatch`, `grid`, `heroband`, `fog`, `hidefx` |
| `motion` | Motion | `lift`, `drawin`, `stagger`, `sweep`, `focuspulse` |
| `states` | Interaction states | `underline`, `glow`, `offset`, `fillsweep`, `bracket` |
| `footer` | Footer | `minimal`, `plate`, `badges`, `none` |
| `chip` | Chips | `outline`, `filled`, `bracketed`, `underlined`, `monocaps` |
| `focus` | Reading aid | `dim`, `spot` |

## Notes

- `disclose=tabs`: `lab.js` builds a `role=tablist` for each run of 2+ sibling `main details.card`; roving tabindex, Arrow/Home/End, panels get `role=tabpanel` + `aria-labelledby`; inactive panels use `[data-lab-off]{display:none!important}`. Switching away restores each card's original open state.
- Narrow fallbacks: `head=side` below 768px is a spine strip; `head=hanging` below 1380px is a small-caps label with a left hairline; `nav=rail` below 1280px is a sticky scroll-snap rail with scroll-spy underline.

## Gear hooks

Attributes only, no content edits (added to `site/character/index.html`; `?lab=0` and the no-lab page render identically). A re-export of the snapshot drops them and they must be re-applied.

- `#gear [data-gear-targets] > li`: `data-slot` (`main-hand|off-hand|helmet|body|gloves|boots|amulet|ring-1|ring-2|belt`), `data-band` (`far` = 7+ tiers below top, `mid` = 4-6, `near` = 0-3; heuristic), `data-gap` + `style="--gap:N"` (the number printed on the card), `data-flags` (`ilvl-cap over-res open-affix corrupted`, from the card text).
- Skill gear list: `ul[data-lab=gdelta]` with `li[data-slot][data-from][data-to]` and `style="--from:N;--to:N"` (tier numbers from the `T3→T1` text).
- The gap meter is relative and capped at 10 tiers; it is not a percentage. Absent slots mean "no findings", so `slots` leaves gaps instead of drawing empty slots.
- Gear visuals never use pseudo-elements on `.card` (the `card` and `frame` groups own them); they draw on `p.label-metric::after` and the flag list's `::before`.
- `ladder` reorders visually with `order` only; DOM and reading order are unchanged.
- `gdelta=tags` is the one gear option with JS (`gtagsOn/gtagsOff` in `lab.js`): rows get `tabindex=0`, and hover/focus/click sets `data-lab-hot` on the matching gear card (click scrolls to it, instant). Turning the option off removes all of it.
- `bars`/`tiers` are single-column flex lists (BAD pairs with `grid:2col|3col`; `bars` also with `card:stack`). `bars` hides the flag list items and draws the bar on `ul::before`, the gap number via `counter-reset:g var(--gap)` on `ul::after`. `tiers` headings are on `p.label-metric::before` of the first card per band (no `.card` pseudo), so they sit inside that card, not above the group.
- `gdelta=grouped` is CSS only: `order` by slot, heading from `data-slot` on the first row of each slot.
- `solo()` now opens ancestor `<details>` so gallery tiles whose target is inside a closed disclosure are not blank.
