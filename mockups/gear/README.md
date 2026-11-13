# Gear section: 5 static directions
Open `index.html` (fonts load from `../../site/_next/static/media/`). Tabs switch direction; three selects change gap encoding, detail and order.
- **Priority ladder**: worst gap first, big number, verdict (Replace / Upgrade / Fine from the far / mid / near band). Best for "what do I fix first?"
- **Paperdoll**: slots laid out as an equipment screen, fill level per tile, details on selection (CSS-only, radio inputs).
- **Tier bars**: one bar per slot on a 0-9 scale (9 = worst slot here), grouped Far / Mid / Near.
- **Action board**: Fix now / Fix soon / Fine lanes, one key reason per slot. Key line order: corrupted, item-level cap, resist over cap, open affix, tiers.
- **Gear diff**: the skill's T3→T1 style changes per slot; only slots with a listed change appear.
**Recommended: Priority ladder.** It answers the section's one question (worst gap, fix order) with the least new UI, and it degrades to the live page's row structure on mobile.
**Porting:** keep the page's existing `li[data-slot][data-band][data-gap][data-flags]` markup and `--gap` var; add `--rank` and the `.enc` block (number/bar/pips) in the gear renderer, move the CSS into the site stylesheet using its tokens, and leave the lab hooks (`data-lab`, `gdelta`) untouched.
