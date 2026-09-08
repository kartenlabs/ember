# Ember · brand and case-study kit

Prepared 8 September 2026. Product: **ember**. Company: **kartenlabs**.

- Product: https://ember.kartenlabs.com
- Company: https://kartenlabs.com
- Social username supplied by the owner: **@kartenlabs** on most platforms. Check the account before tagging; platform-specific profile URLs have not been assumed.

Open **[the visual gallery](../index.html)** to preview and download the graphics. All image dimensions, file sizes, and suggested alt text are recorded in [asset-manifest.json](../asset-manifest.json).

## The folders

| Folder | What is inside | Use it for |
| --- | --- | --- |
| `00-guide` | This guide, brand rules, platform guidance | Sharing the kit with a teammate |
| `01-identity` | Outlined SVG wordmarks, transparent PNGs, e monograms, square avatars, a lockup and brand board | Logos, profile imagery, presentations |
| `02-social/instagram` | Square and portrait posts, Story, ambient-station feature, numbered carousel PNGs | Posting from company channels |
| `02-social/linkedin` | Landscape launch graphic, company campaign covers, PDF document carousel | Company feed, Page cover, document post |
| `03-web-seo` | Open Graph PNG/WebP, favicons, metadata and structured-data examples | Website integration and social previews |
| `04-product-screenshots` | Actual desktop/mobile app captures in both themes | Product pages and case studies |
| `05-case-study` | Written case study, nine-slide PDF/HTML deck, individual slide PNGs, covers | Portfolio, client presentation, project showcase |
| `06-copy` | Captions, bios, elevator pitches, press facts, carousel transcript | Publishing and editing |
| `07-source` | Export script, editable HTML artboards, typography outlines script, local fonts | Changing text and regenerating assets |
| `08-licenses` | Font licenses, icon license, attribution and media notes | Passing the files on correctly |

## Fastest publishing routes

**Instagram launch:** `02-social/instagram/launch-1080x1350.png` + the launch caption in `06-copy/social-copy.md`.

**Instagram carousel:** upload numbered images in `02-social/instagram/carousel` in order. All seven slides are 1080 × 1350. Add per-slide alt text from the manifest or transcript.

**LinkedIn:** use `02-social/linkedin/launch-1200x627.png` with the company launch copy, or upload `ember-document-carousel.pdf` as a document post. The PDF has seven portrait pages and selectable text.

**Case study:** send `05-case-study/ember-case-study.pdf`, or open [the responsive case-study page](../05-case-study/case-study.html). The Markdown version is ready to adapt for a portfolio. `presentation.html` is an offline slide presentation with embedded fonts and images.

**Website:** follow `03-web-seo/INTEGRATION.md`. The kit supplies assets and examples; it does not change the running app's metadata or publish anything.

## What is ready, and what needs context

- Graphics contain the supplied product/company URLs and company credit. No placeholder people, dates of launch, or invented account URLs are printed on them.
- Wordmarks are the existing Silkscreen lettering converted to paths. The e avatar is a typographic extension for small placements, not a replacement corporate logo.
- Transparent cream logos are for dark surfaces. Ink logos are for light surfaces. The checkerboard in the gallery is a preview background, not part of the PNG.
- Company cover graphics promote **Ember on kartenlabs channels**. They do not redefine kartenlabs' corporate identity. Keep the existing company account avatar unless a product campaign deliberately calls for Ember branding.
- Screenshots were captured from the local app on 8 September 2026 in isolated browser storage. Session entries are staged examples, not user or business results. Third-party video imagery is omitted in the captures; its text credit remains.
- Marketing timer panels and sound bars are illustrative artwork, not screenshots or audio measurements. “START” on a promotional timer is a visual motif, not an interactive button.
- The project case study describes the repository's implementation and checks. It does not claim interviews, user testing, adoption, retention, or concentration improvements.
- Current ambient station: Claude FM, published by Claude and embedded through YouTube. Availability and selection can change. See the attribution notes.

## Editing and regeneration

Edit text/layout in `07-source/render.mjs` and rerun it. Each PNG also has an HTML artboard in `07-source/artboards` for inspection or one-off edits. Rerunning the generator overwrites generated files, including those artboards: make lasting changes in the script.

From the repository root:

```sh
npm install
npm run build
npm run start -- --hostname 127.0.0.1 --port 3110
# In another terminal:
node brand-kit/07-source/render.mjs
node brand-kit/07-source/validate.mjs
```

Requirements: Node.js, the repository's Playwright and Sharp dependencies, Chromium, and Python 3 with `fonttools` and `brotli`. The generator defaults to `/usr/bin/google-chrome`; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for another installation. Set `EMBER_CAPTURE_URL` if the local app uses a different port. Font source data comes from `.next`; run the production build first. Existing bundled licenses are reused, so regenerating an intact kit does not need to fetch licenses.

The exported kit works offline. Keep its folder structure intact. The zip is a convenient sharing copy; after making edits, regenerate that archive from the kit folder.
