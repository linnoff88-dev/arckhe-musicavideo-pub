# musicavideo-pub — INEMA MUSICAVIDEO V2.x.x

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

The **showcase** for the [musicavideo](https://github.com/inematds/musicavideo) collection:
the clips, tracks, and covers served from Hugging Face, with the dashboard on Vercel.

## 📖 User guide

Complete guide (landing page + step-by-step instructions): **https://inematds.github.io/musicavideo-pub/guia/en/**

Don’t confuse it with **the dashboard** — that’s the local one (`musicavideo painel`,
`INEMA MUSICAVIDEO V1.x.x`), where you listen, compare, send items to the trash, and
**approve what gets uploaded here**. This is read-only, with one exception: the
public **like**.

## How it works

```
painel local  --aprova-->  publica-hf  -->  dataset no Hugging Face
                                                 |  manifest.json
                                                 v
                                          esta app (Vercel)
                                                 |  like
                                                 v
                                   musicavideo likes  -->  painel local
```

- **Files:** public dataset `Inematds/musicavideo-acervo`. The `<video>` and
  `<audio>` elements fetch directly from there — HF’s `resolve/main` supports range requests
  (verified: HTTP 206 with `Content-Range` on a 101 MB mp4), so you can seek through
  the video without any proxy. This app never serves media.
- **Metadata:** `manifest.json`, written by `musicavideo publica-hf` using
  the SAME collector as the local dashboard. Revalidated every hour.
- **Identity:** each production is an `MVD-000`, and its page URL (`/mvd-014`).

## What is NOT here

- **`fonte.mp4` files from the analyses.** These are third-party videos downloaded from YouTube:
  rehosting them would be redistribution. The analyses tab shows the analysis TEXT
  and the original video through the official embed.
- **`raw/`, test folders, duplicate `clipe.mp4`.** They stay on the machine.
- **Trash and approval.** These are work actions — they live in the local dashboard.

## The like

The public’s only write action, and the reason the app isn’t pure static HTML.
Stored in a Redis REST service (Vercel KV / Upstash), where `INCR` is atomic. Variables:

| variable | what it’s for |
|---|---|
| `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` | KV endpoint |
| `KV_REST_API_TOKEN` / `UPSTASH_REDIS_REST_TOKEN` | token |
| `HF_REPO` | dataset, if not the default |

**The app stays up without these variables** — the counter disappears and clicks
aren’t persisted. A showcase without a counter is still a showcase; a showcase that
won’t open is nothing. That’s how it is today: the like feature was deliberately
left for later.

The short path to enabling it: in the Vercel project, **Storage → Create Database →
Upstash Redis**, connect it to the project, and redeploy. Vercel injects both
variables automatically — nothing needs to be entered. If you create it directly in
Upstash, the values are in the database’s **REST API** tab (the token must allow
writes; read-only won’t work because the like feature writes).

The counts return to the local dashboard with `musicavideo likes`
(`MUSICAVIDEO_PUB_URL` pointing here), and become a ♥ on each card. Without this
return, the only public signal the project has would die here.

## Deploy

Import **this repo** into Vercel with *Root Directory* `./` (the default). After
that, publishing is `git push` — the webhook does the rest.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
