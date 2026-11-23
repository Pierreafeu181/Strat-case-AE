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

## Deploy
Import this repo on vercel.com (Add New → Project). Each push to `main` redeploys.
Write `https://<project>.vercel.app/p/PW-21-048172` on an NTAG213/215 sticker with the "NFC Tools" app.

Dates, serial and history are fictional. $450 and $150 are public AE prices; $75 and $245 are our proposals.
