---
name: site-verify-ship
description: Verify a change to the Endgame companion site in a real browser and ship it as a draft PR. Use this after any edit under site/ or mockups/, when the user says check it, test it, screenshot it, ship it, push it or open a PR, and before saying a UI change works.
---

# Verify and ship

## Serve at the real base path
The site expects `/Endgame-app-designs/`. Make a scratch dir containing a symlink `Endgame-app-designs -> <repo>/site` and run `python3 -m http.server 8766` there (a server rooted at `site/` breaks asset URLs). For `mockups/`, serve from the repo root instead, since they reference `../../site/` fonts.

## Check once, at both widths
Playwright is global: `NODE_PATH=$(npm root -g) node check.js`. For `/Endgame-app-designs/character/#gear` (and the lab off with `?lab=0`) at 1440 and 390 wide:
- `document.documentElement.scrollWidth <= innerWidth` (no horizontal scroll)
- no console or page errors
- wait 2s, then count the elements you added (hydration may drop them)
- screenshot, and look at it
Report what you did not check.

## Ship
Branch from latest `main`, commit with a one-line message, push, open a **draft** PR to `main` and fill the repo's PR headings if a template exists. Merging deploys to GitHub Pages (`.github/workflows/pages.yml` publishes `site/` on push to main), so merge only when the user asks.
