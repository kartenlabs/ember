# Third-party notices

Ember bundles or depends on the work below. Every item here is either
open-licensed or used through its rights holder's own player. **No music,
audio file or video from the ambient stream is redistributed by this project.**
The `brand-kit/` folder includes product screenshots and licensed font subsets
for offline presentations, with the corresponding licenses in
`brand-kit/08-licenses/`.

---

## Typefaces

All three families are loaded through `next/font/google`, which downloads them
at build time and serves them from this application's own origin. All three are
released under the **SIL Open Font License 1.1**, which permits bundling and
redistribution as part of a larger work.

| Family | Used for | Licence |
| --- | --- | --- |
| [Silkscreen](https://fonts.google.com/specimen/Silkscreen) | Wordmark, countdown, overlines, button and tab labels | OFL 1.1 — © Jason Kottke |
| [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Numbers, metadata, labels, user tags | OFL 1.1 — © IBM Corp. |
| [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) | Hints, descriptions, dialog copy, prose | OFL 1.1 — © Instrument |

### A substitution worth recording

The original brief asked for **Vercel's pixel typeface**. It is not publicly
licensed for redistribution, so it is not used here and no copy of it exists in
this repository. **Silkscreen** is the nearest open bitmap-pixel face and stands
in for it throughout.

If a licensed pixel face is acquired later, point `--font-pixel` at it in
`app/globals.css` and load it in `app/layout.tsx`. Nothing else in the system
changes.

---

## Icons

**[Pixelarticons](https://pixelarticons.com)** — 40 SVGs in `public/icons/`,
drawn on a 24px bitmap grid.

> MIT License. Copyright (c) 2019 Gerrit Halfmann.

The MIT licence requires that its copyright notice travel with the files, so the
full text ships beside them at **`public/icons/LICENSE.txt`** and must stay
there. No icon has been redrawn or modified; they are used as published.

---

## The ambient station

The radio strip and the full-screen background are a **YouTube embed** —
`https://www.youtube-nocookie.com/embed/tRsQsTMvPNg`, driven over YouTube's
public postMessage API.

The default station is **"Claude FM 🎵 music for thinking and building"**,
published by the **Claude** channel (`https://www.youtube.com/@claude`). Its
oEmbed endpoint returns a player, which is how the platform signals that the
uploader has left embedding enabled.

Ember does not host, copy, cache, proxy, download, or re-encode any of that
audio. Playback happens inside YouTube's own player, served by YouTube, subject
to YouTube's terms, with its advertising and analytics intact.

**Three rules the code depends on. Do not change these without re-checking the
terms:**

1. **The player stays visible.** Hiding the iframe to fake an audio-only widget
   would put this outside YouTube's Terms of Service. The strip shows a 96px
   16:9 player; the full-screen view shows it at full bleed.
2. **No local audio substitute.** Never swap the embed for a bundled file.
3. **The credit is the real one.** `lib/station.ts` resolves the video's actual
   title and channel from YouTube's oEmbed endpoint and the player prints them.
   Ember does not put its own station name over someone else's stream.

**"Claude" and "Anthropic" are trademarks of Anthropic PBC.** They appear in
this app only as the factual attribution of the embedded video. This project is
not affiliated with, sponsored by, or endorsed by Anthropic, and does not use
those marks as its own branding.

To point the app at a different station, change `STATION_VIDEO_ID` in
`lib/station.ts`. `RadioPlayer` and `FullScreenTimer` both take a `videoId`.

---

## Chimes

The five end-of-session chimes are **Ember's own**. They are not samples and not
files: each is synthesised at play time from oscillators and gain envelopes in
`lib/chimes.ts`. Nothing is downloaded and nothing is bundled.

They never route through the YouTube embed. The two audio paths are deliberately
separate.

---

## What is not here

- **The wordmark** is the literal word `ember` set in pixel type. The brand kit
  adds outlined exports and an `e` avatar derived from that same letterform.
- **No third-party photography or stream imagery.** The brand kit contains
  product captures and original code-rendered layouts; external video visuals
  are omitted from the captures.
- **No audio files** — no `.mp3`, `.wav`, `.ogg`, or any other.
- **Licensed font subsets** are included in the brand kit for offline use.
  Their OFL license files travel with them.

---

## The design system

`design-system/` is the Claude design handover this application was built from,
committed as reference. It contains the token files, the reference components,
and the click-through prototype. The Pixelarticons licence is duplicated inside
it at `design-system/assets/icons/LICENSE.txt`, where it also belongs.

## Software dependencies

Next.js, React, and the build toolchain are MIT-licensed. Run `npm ls` for the
resolved tree, or `npx license-checker` for a full report.
