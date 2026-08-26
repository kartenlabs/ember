# Ember — design system

**Ember** is a pomodoro timer. You set a focus length, a short break and a long
break, start it, and a chime you chose plays when the block runs out. Settings
change the lengths and the sound. Underneath the countdown sits a small ambient
radio strip, because the product is as much "sit down and stay" as it is
"measure time".

The look is pixel-first and calm: bitmap type, square corners, hard one-pixel
shadows, a warm near-black board, and three low-chroma accents that each stand
for one timer mode.

## Where this came from

This system was built from a written brief, not from an existing codebase or
Figma file. Recorded here so a future reader can go back to the source:

- **Brief (verbatim intent):** a pomodoro timer with focus / short break / long
  break, settings to change the timers, and "a nice chim with options to change
  the chim".
- **Reference given:** `https://www.youtube.com/watch?v=tRsQsTMvPNg` — described
  by the requester as "Claude FM 🎵 music for thinking and building", cited for
  its pixel style, colour and flow.
- **Type direction given:** "the vercel pixel font", minimalistic modern, calm
  tone, modern flow.

Nothing else was attached: **no codebase, no Figma file, no logo, no decks, no
screenshots.** Every value in this system was authored here, so treat it as a
proposal to react to rather than a record of something that already shipped.
The reference video was not viewable from this environment; the palette and
motifs are an original interpretation of the brief, not a recreation of anything
in that video or of any other company's brand.

**Name.** "Ember" is a placeholder chosen to fit the brief (a warm thing that
burns down, like a timer). Renaming it is one find-and-replace away — say the
word.

## Substitutions to resolve

| What | Why | What we used instead |
| --- | --- | --- |
| Vercel's pixel typeface | Not publicly licensed for redistribution, so it cannot ship inside a design system | **Silkscreen** (Google Fonts, OFL) — the nearest open bitmap-pixel face |
| A brand mark | None was supplied, and inventing one would be worse than none | The word `ember` set in pixel type. See `guidelines/brand-wordmark.html` |
| An in-house icon set | None was supplied | **Pixelarticons** (MIT), copied into `assets/icons/` — a 24px bitmap-grid set that matches the type |

All three families load from the Google Fonts CDN via the `@import` at the top
of `styles.css`, so no font binaries ship in this project yet.
`tokens/fonts.css` carries a commented-out self-hosting block: drop `.woff2`
files into `assets/fonts/`, uncomment it, and point `--font-pixel` at the local
family. **If you have licensed pixel-font files, send them and this swaps
cleanly.**

---

## Content fundamentals

The product talks like a considerate room-mate: short, factual, unhurried. It
never celebrates and never nags.

**Voice.** Plain and quiet. State what happened, then stop. No exclamation
marks anywhere in the product. No "Great job!", no "Let's crush it", no streak
guilt. The tone target is a well-made kitchen timer, not a coach.

**Person.** Second person for anything the user does or owns ("What you are
working on", "Rolls into the break without asking"). First person only when the
user is speaking back to the app, in button labels of their own voice
("Not yet"). The app never says "I".

**Casing.** Three registers, and they are strict:

- **PIXEL UPPERCASE** for overlines, button labels, badges, tab labels, and card
  titles. Tracked out `0.18em`. Two or three words maximum: `FOCUS`,
  `SESSION LOG`, `START BREAK`.
- **Sentence case** for headings, hints, descriptions, dialog copy, empty
  states: "Take five?", "Rolls into the break without asking."
- **lowercase mono** for anything the user or the world authored: task tags
  (`deep work`), chime names (`temple bell`), track titles
  (`rain on the window — side b`), and the wordmark itself (`ember`).

**Length.** Dialog body: one or two sentences. Toast message: one sentence.
Setting description: one clause explaining the consequence, not the mechanism —
"Rolls into the break without asking", never "Enables automatic break
transition".

**Numbers.** Always digits, always tabular, always `mm:ss` for durations
(`25:00`, never "25 minutes 0 seconds" and never `0:25:00`). Minutes are `min`
when abbreviated. Counts read "4 of 6", not "4/6".

**Words we use.** session, set, focus, short break, long break, chime, log,
skip, reset. **Words we avoid:** task (too much project-management), productivity,
streak-as-pressure, "sprint", "grind", "deep work" as a product term (it is fine
as an example of something the *user* typed).

**Examples, verbatim from the kit:**

- Overline: `FOCUS · 3 OF 6`
- Dialog: **Take five?** — "Session four of six logged. Twenty five minutes."
- Toast: **SESSION LOGGED** — "25 minutes added to today." with an `Undo` link.
- Skip toast: **SKIPPED AHEAD** — "Nothing was logged for that one."
- Empty state: "Nothing logged yet. Start a session and it lands here."
- Chime description: "Two soft strikes, long tail." / "One dry knock. Nothing
  lingers." / "Barely there. For shared rooms."
- Setting hint: "Shows on the timer and in your log."

**Emoji: never.** Not in the product, not in the marketing, not in the docs. The
icon set carries every job an emoji would take.

---

## Visual foundations

### Colour

A warm near-black board (`--ink-900 #100E0C`) with a cream text stack
(`--cream-100 #F3ECE0`). Nothing is pure black or pure white; everything is bent
a few degrees toward orange so the screen reads as lamplight rather than
terminal.

Three accents, and each one *means* something — mode, not decoration:

| Accent | Mode | Base |
| --- | --- | --- |
| Amber | focus | `--amber-400 #E8A64C` |
| Sage | short break | `--sage-400 #86A87F` |
| Clay | long break, destructive | `--clay-400 #C97558` |

`--accent-mode` is the indirection that makes this work: set `data-mode="short"`
on any container and every primary button, filled tab, progress cell and
selected row inside it turns sage. Components never reference `--amber-400`
directly; they reference `--accent-mode`. Haze (`#9295B4`) is the fourth accent
and is informational only.

Two themes: night (default) and `data-theme="light"` ("Daylight", a `#F6F1E7`
paper). At most two background colours are on screen at once — board and card.

### Type

Three families, zoned so hard it is close to a rule:

- **Silkscreen (pixel)** — wordmark, countdown, all-caps overlines, button and
  tab labels. Never a sentence. Sizes come from the even ladder only
  (10 / 12 / 16 / 20 / 24 / 48 / 96 / 128) so the bitmap stays crisp.
- **IBM Plex Mono** — numbers, data, labels, user tags, chime and track names.
  Tabular figures always on for anything that changes in place.
- **Instrument Sans** — anything longer than four words: hints, descriptions,
  dialog copy, empty states, prose.

The countdown at 96–128px is the loudest thing in the product by a wide margin;
the next largest text is 24px. That gap is the composition.

### Space and layout

4px grid, no half-steps: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128. Card
padding 24, stack gap 16, inline gap 8, screen padding 32. The app is a single
centred 960px window; the settings column is 420px. Control heights are 30 / 40
/ 52px and touch targets never go under 44px. Nothing is fixed or sticky except
the toast (bottom-right, 24px in) and the modal scrim.

### Edges, shadows, depth

Radii are 0–4px: `2px` on controls, `3px` on cards, `4px` on panels. Nothing is
a pill; there is no circle anywhere in the system — the radio button is a square
with a square dot, the switch knob is a rectangle, the "session dots" are cells.

Borders are real 1px lines in a real colour (`--border-subtle` inside cards,
`--border-default` on controls, 2px `--border-strong` on dialogs). Shadows are
**hard offsets with zero blur** — `2px 2px 0` on buttons, `4px 4px 0` on a
lifted card, `6px 6px 0` on a dialog — as if the sprite were lifted one pixel
off the board. The single soft shadow in the system is the modal scrim, and the
only blur is that scrim's `blur(2px)`.

### Backgrounds and texture

No photography, no illustration, no gradients as decoration. Two textures only:

- **`.em-grid-bg`** — an 8px dot grid, `--border-subtle` on the board. This is
  the default surface of the app window.
- **`.em-scanlines`** — 1px lines every 3px at 4% cream. Used *only* on audio
  surfaces (the now-playing strip), which is what makes it mean "sound".

Transparency is used sparingly: the scrim (`rgba(11,9,8,.72)`), the scanline
tint, and disabled states at 40% opacity. Nothing else is translucent.

### Motion

Two speeds. **Interface feedback is stepped** — `steps(3,end)` over 80–240ms —
so hovers, toggles and presses read as frames of animation rather than smooth
CSS. **Ambient motion is long and linear** — a 4s breathing pulse on the running
session cell, a 1s per-second colon blink, a 480ms cross-fade when the mode
retints. No bounce, no spring, no overshoot, ever. `prefers-reduced-motion`
collapses everything to 1ms.

### Interaction states

- **Hover:** surfaces lighten one step (`--surface-raised`); filled controls
  gain `brightness(1.08)`; borders step from `--border-default` to
  `--border-strong`. Never a colour change on hover, only a value change.
- **Press:** the hard shadow collapses to nothing and the element moves
  `translate(2px, 2px)` — it physically sits down on the board. This is the
  signature interaction of the system.
- **Focus:** 2px `--focus-ring` amber outline at 2px offset. Always visible,
  never removed.
- **Disabled:** 40% opacity, `not-allowed`, no shadow. No greying-out of colour.
- **Selected / active:** accent border plus accent fill on the indicator square.
  For toggles, `active` means a persistent state (muted, looping), not hover.

### Cards

`--surface-card` fill, 1px `--border-subtle`, 3px radius, flat by default. A
card gets a 4px hard shadow only when it is the one thing in front. Header is a
pixel uppercase overline on the left and mono metadata on the right. No coloured
left borders, no drop-shadow stacks, no nested cards.

---

## Iconography

**Set:** [Pixelarticons](https://pixelarticons.com) (MIT), copied into
`assets/icons/` as 40 individual SVGs — the licence travels with them in
`assets/icons/LICENSE.txt`. They are drawn on a 24px bitmap grid with square
terminals, which is why they sit correctly next to Silkscreen. This is a
**substitution**: no icon set was supplied. If Ember has its own glyphs, drop
them in this folder at 24×24 and nothing else changes.

**How they are used.** Every icon is `fill="currentColor"`, so the `Icon`
component paints them with a CSS mask and a `background-color` of
`currentColor`. That means an icon inherits its parent's text colour and retints
with `--accent-mode` for free. Do not use `<img>` for icons — it loses the tint.

```jsx
<Icon name="coffee" size={16} />
```

**Sizes:** 16px inline and in controls, 24px in `lg` controls and transport,
32px+ for a feature glyph. Never an odd size — the bitmap grid smears.

**Vocabulary.** The set is deliberately small and each glyph has one job:

| Glyph | Means |
| --- | --- |
| `hourglass` | focus mode |
| `coffee` | short break |
| `leaf` | long break |
| `play` `pause` `reload` `chevron-right` | transport: start, pause, reset, skip |
| `bell` `bell-ring` `bell-off` | the chime and its mute |
| `volume-3` `volume-x` `music` `audio-waveform` | ambient audio, radio transport |
| `sliders` `chart-bar-big` `list-box` `home` | navigation |
| `check` `close` `plus` `minus` `chevron-*` | control affordances |
| `moon` `sun` | night / daylight theme |
| `expand` `collapse` | enter / leave full screen |
| `trash` | destructive |

**No emoji, ever.** No unicode characters standing in as icons either — the one
exception is the typographic middle dot `·` used as a separator in overlines
(`FOCUS · 3 OF 6`) and em dash in track names. No icon font. No hand-drawn SVG:
if a glyph is missing, ask for it rather than drawing one.

---

## Index

Root manifest:

| File | What |
| --- | --- |
| `styles.css` | The one file consumers link. `@import` lines only. |
| `readme.md` | This document. |
| `SKILL.md` | Agent-skill front matter for use outside this project. |
| `thumbnail.html` | Homepage tile. |
| `tokens/` | `fonts` · `colors` · `typography` · `spacing` · `edges` · `motion` · `base` |
| `guidelines/` | 20 specimen cards: Colors, Type, Spacing, Brand |
| `assets/icons/` | 40 Pixelarticons SVGs + licence |
| `components/` | React primitives, grouped by concern |
| `ui_kits/ember-app/` | The product, click-through |
| `templates/` | Two copyable starting templates: windowed timer, full-screen session |

### Components

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when).
Import from the compiled namespace; see any `*.card.html` for the pattern.

**`components/core/`** — `Icon`, `Button`, `IconButton`, `Card`, `Badge`, `Tag`
**`components/forms/`** — `Input`, `Stepper`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`
**`components/feedback/`** — `ProgressBar`, `Toast`, `Tooltip`, `Dialog`
**`components/navigation/`** — `Tabs` (segmented + underline)
**`components/timer/`** — `TimerDisplay`, `SessionDots`, `ChimeOption`, `RadioPlayer`, `NowPlaying`, `FullScreenTimer`

### Intentional additions

No source defined a component inventory, so this is a from-scratch standard set
(Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag,
Tabs, Dialog, Toast, Tooltip). Five components go beyond it, each because the
product cannot be built without it:

- **`Icon`** — wrapper for the glyph set, so tinting and sizing stay consistent.
- **`Stepper`** — durations are set by nudging minutes; a text input is the wrong
  control for it.
- **`TimerDisplay`** — the countdown is the product; it needs one canonical form.
- **`SessionDots`** — the pomodoro *set* is a concept no standard primitive covers.
- **`ChimeOption`** — a sound must be auditionable where it is chosen. Chimes are
  short generated sounds Ember owns; they never route through the radio embed.
- **`RadioPlayer`** — the ambient-radio half of the brief. Ember hosts no music:
  the stream is always a YouTube embed (`youtube-nocookie.com`, default video
  `tRsQsTMvPNg`), so playback stays on the rights holder's player and no audio is
  redistributed. Controls drive the iframe over YouTube's postMessage API, and
  the player screen stays visible — small in `strip`, 16:9 in `panel`.
- **`NowPlaying`** — the same strip chrome without an embed, for designs that
  need the layout with no player attached.
- **`FullScreenTimer`** — the distraction-free session view: station full-bleed
  behind a 72% scrim and scanlines, countdown at 128px, and chrome that fades to
  zero after four idle seconds and returns on movement. Driven by the browser
  Fullscreen API; `Escape` exits.

### UI kit

`ui_kits/ember-app/` — the whole app in one runnable page: timer with a real
ticking countdown and working chime, session log with a pixel bar chart,
settings with an auditionable chime picker, and the end-of-session hand-off
dialog, plus the full-screen session. `Space` / `R` / `S` / `F` are wired,
`Escape` leaves full screen. See its own `README.md` for what is real
and what is faked.

### Templates

Templates are how consuming projects seed a design from Ember — copy the folder
and edit one file.

`templates/fullscreen-timer/` — **Full screen session**, the distraction-free
view. Tweaks cover mode, lengths, set progress, and the station (video on/off,
scrim strength).

`templates/focus-timer/` — **Focus timer**, the timer screen as a copyable
starting point. It loads this system through `ds-base.js` (one line to repoint
in a consuming project) and exposes mode, lengths, elapsed time, set progress,
task label and the radio strip as tweakable props.

No slide template was supplied, so there are no sample slides.
