# Design lab

Live restyling of `/character/`. A **Design** button opens a panel; each dropdown sets `data-<key>` on `<body>`. All variants live in `site/lab/lab.css` (unlayered, square corners only); behaviour in `site/lab/lab.js` (`GROUPS` is the single source of truth).

- State: URL hash (`#card=raised&grade=seal`) beats `localStorage["lab:v1"]`. Default option = no attribute.
- `?lab=0` disables the lab entirely. `?lab=audit` outlines text under 4.5:1 contrast (dev). `?lab=solo&t=<selector>` is used by the gallery iframes.
- Panel: Reset, Randomize (avoids known-bad pairs), Compare (hold), Gallery, Expand/Collapse all, presets (save, rename, delete in `localStorage["lab:presets"]`).
- Remove the `<link>` and `<script>` for lab.css / lab.js from `site/character/index.html` to restore the original page.

## Presets

- Archive
- Ledger
- Plate
- Quiet
- Dense Ops
- Editorial
- Relic
- Blueprint
- Field Report
- Vault
- Telegraph
- Codex

## Groups

| Hash key | Group | Options (besides `base` = original) |
|---|---|---|
| `card` | Card elevation | `flat`, `raised`, `stepped`, `stack`, `pressed`, `underglow`, `toplit`, `engraved`, `bare`, `cutout`, `shelf` |
| `fill` | Panel fill | `clear`, `frost`, `ink`, `vgrad`, `sheen`, `grain`, `parchment`, `duotone`, `scanline`, `smoke` |
| `frame` | Borders & frames | `double`, `brackets`, `notch`, `barL`, `barT`, `dashed`, `spaced`, `rivets`, `tickframe` |
| `head` | Card header | `tab`, `rule`, `numbered`, `strip`, `side`, `minimal`, `count`, `hanging` |
| `divider` | Section dividers | `rule`, `diamond`, `ornament`, `ticks`, `fade`, `chapter`, `ledger` |
| `density` | Density | `compact`, `snug`, `comfy`, `spacious`, `luxe` |
| `grid` | Layout grid | `1col`, `2col`, `3col`, `masonry`, `bento`, `rail`, `gutter` |
| `grade` | Grade display | `letter`, `framed`, `segbar`, `ticks`, `band`, `ladder`, `badge`, `monogram`, `margin`, `seal`, `stencil` |
| `rows` | Stat rows | `table`, `leaders`, `centered`, `valuefirst`, `chips`, `plinth`, `zebra`, `pairs`, `ruled`, `tabbed` |
| `nums` | Numerals | `oldstyle`, `lining`, `sans`, `keygold`, `quiet`, `bigvalue`, `condensed`, `slashedzero` |
| `meter` | Resist meters | `plain`, `segments`, `underline`, `capmark`, `heat`, `spark`, `dial`, `delta`, `ruler`, `notched` |
| `sev` | Severity & status | `square`, `badge`, `stripe`, `tag`, `glyph`, `rowtint`, `outline`, `filled`, `traffic`, `margin` |
| `dmg` | Damage colour | `tint`, `patterned`, `mono`, `legend`, `swatch` |
| `findings` | Findings list | `timeline`, `accordion`, `split`, `checklist`, `rail`, `oneliners`, `columns`, `index`, `cards` |
| `recs` | Recommendations | `stepcards`, `stepper`, `beforeafter`, `grid`, `lanes`, `sticky`, `receipt` |
| `nav` | Section navigation | `tabs`, `rail`, `chips`, `jump`, `progress`, `none` |
| `disclose` | Disclosure | `open`, `accordion`, `pro`, `hover` |
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
