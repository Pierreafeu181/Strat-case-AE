# Shoe Passport — concept prototype (ESSEC Strategy, Team 4)

A mobile-first "digital shoe passport" for the **AE Certified Pre-Owned** pitch.
It is a concept prototype: **not an Allen Edmonds service, no backend, no data collected**.

## Routes
- `/` → redirects to the demo pair, `/p/PW-21-048172`
- `/p/[serial]` is the URL written on the NFC sticker. Three seeded pairs live in `data/pairs.json`.
- Tabs can be linked directly: `#story`, `#trade`, `#buyer`

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit the content
- **Pairs, timeline and prices:** `data/pairs.json`
- **Grading rule:** `lib/grade.ts`. Any worst answer gives C; all best answers give A; everything else gives B.
- **Real photo:** put a JPG in `public/shoes/` and set `"photo": "/shoes/<file>.jpg"` on the pair.
  - Use landscape, at least 2000 px wide, with no logo visible.
  - The frame is 16:10.

## Deploy on GitHub Pages
`.github/workflows/pages.yml` builds a static export (`GITHUB_PAGES=true`) and deploys it on every push to `main`.
- **One-time setup:** in Settings → Pages, set Source to **GitHub Actions**. The repo must be public.
- **Live URL:** https://pierreafeu181.github.io/Strat-case-AE/
- **NFC sticker URL:** https://pierreafeu181.github.io/Strat-case-AE/p/PW-21-048172/ (NTAG213/215, written with the "NFC Tools" app)

The same code also deploys on Vercel unchanged: without `GITHUB_PAGES`, it is a normal Next.js build at the domain root.

Dates, serial and history are fictional. $450 and $150 are public AE prices; $75, $245 and $265 are our proposals.
