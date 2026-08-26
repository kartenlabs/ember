# Handoff: Ember — pomodoro timer with ambient radio

## Overview

Ember is a pomodoro timer. The user sets a focus length, a short break and a long
break; the timer counts down; at zero a chosen chime plays and the session is
logged. Settings change the durations and the sound. Under the countdown sits an
ambient radio strip, and a full-screen mode plays that station full-bleed behind
the countdown.

Three views, one window, no onboarding: **Timer**, **Log**, **Settings** — plus a
**full-screen session** that overlays everything.

Target stack for this build: **Next.js (App Router) + React**.

## About the design files

Everything in this bundle is a **design reference authored in HTML/JSX** — a
prototype showing intended look and behaviour. It is *not* production code to
paste in. The `.jsx` files are plain browser-Babel React with inline styles and
no build step, deliberately: they encode exact visual values, not architecture.

Your job is to **recreate these designs in a Next.js app** using its own
conventions (App Router, TypeScript, CSS Modules or Tailwind, your own state
layer). Lift the numbers; discard the plumbing.

## Fidelity

**High fidelity.** Colours, type, spacing, radii, shadows, motion durations and
easings are all final and tokenised. Recreate pixel-for-pixel. Where a value in
this README and a value in the reference JSX disagree, the CSS token files in
`tokens/` win.

---

## Recommended Next.js structure

```
app/
  layout.tsx            # <html data-theme> ; imports globals.css ; font <link>
  page.tsx              # Timer view (default)
  log/page.tsx
  settings/page.tsx
  globals.css           # paste the six token files + base, in order
components/
  core/                 # Icon, Button, IconButton, Card, Badge, Tag
  forms/                # Input, Stepper, Select, Checkbox, Radio, Switch, Slider
  feedback/             # ProgressBar, Toast, Tooltip, Dialog
  navigation/           # Tabs
  timer/                # TimerDisplay, SessionDots, ChimeOption, RadioPlayer, FullScreenTimer
lib/
  useTimer.ts           # countdown + session state machine
  chimes.ts             # WebAudio chime synthesis
  storage.ts            # localStorage settings + session log
public/icons/           # the 40 SVGs from assets/icons/
```

### Client vs server components

Almost every interactive piece needs `"use client"`. Specifically:

- `useTimer`, all three views, `Dialog`, `Toast`, `Tooltip`, `Switch`,
  `Stepper`, `Slider`, `Tabs`, `ChimeOption`, `RadioPlayer`,
  `FullScreenTimer` — all client. They use `useState`, `useEffect`,
  `postMessage`, WebAudio, or the Fullscreen API.
- `layout.tsx`, `Card`, `Badge`, `Tag`, `Icon` can stay server components.
- `RadioPlayer` and `FullScreenTimer` touch `window` and `iframe.contentWindow`;
  guard all of it inside `useEffect`, never at module scope, or the build fails
  during prerender.

### Hydration traps specific to this app

1. **The countdown must not render a live value on the server.** Initialise
   state from settings only, start the interval in `useEffect`. Rendering
   `Date.now()`-derived time during SSR produces a hydration mismatch on every
   load.
2. **Theme and mode live on `<html>`** as `data-theme` and `data-mode`. If you
   persist theme to `localStorage`, set it in an inline script in `<head>`
   before paint (the standard no-flash snippet), not in a `useEffect` — otherwise
   the app flashes night theme before switching to daylight.
3. **`localStorage` is undefined on the server.** All reads go through a
   `useEffect` or a `typeof window !== 'undefined'` guard.

### Fonts

The reference loads Silkscreen, IBM Plex Mono and Instrument Sans from the Google
Fonts CDN. In Next.js use `next/font/google` instead — it self-hosts and kills
the layout shift:

```ts
import { Silkscreen, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';
const pixel = Silkscreen({ weight: ['400','700'], subsets: ['latin'], variable: '--font-pixel-src' });
```

Then point `--font-pixel` at `var(--font-pixel-src)` in `globals.css`.

**Silkscreen is a substitution.** The brief asked for Vercel's pixel typeface,
which is not publicly licensed for redistribution. Silkscreen (OFL) is the
nearest open bitmap-pixel match. If a licensed pixel face is acquired, swap
`--font-pixel` and nothing else changes.

---

## Screens

### 1. Timer (default view)

**Purpose.** Start, pause, reset or skip the current block; see how far into the
set you are; see and control what is playing.

**Layout.** Single centred window, `--width-app` 960px, `--pad-screen` 32px.
Board background is `--surface-app` with an 8px dot-grid texture. Vertical
stack, `--space-5` (16px) between blocks:

1. **Shell header** — wordmark `ember` (pixel, 16px, lowercase) left; view tabs
   (segmented: TIMER / LOG / SETTINGS) centre; theme toggle icon button right.
   Bottom border `1px --border-subtle`.
2. **Mode tabs** — three segmented tabs: FOCUS (`hourglass`), SHORT BREAK
   (`coffee`), LONG BREAK (`leaf`). The active one is filled `--accent-mode`.
3. **Countdown card** — `--surface-card`, 1px `--border-subtle`, 3px radius,
   24px padding. Contains: overline `FOCUS · 3 OF 6` (pixel 10px, 0.18em, muted);
   the countdown `mm:ss` at `--display-md` 96px pixel bold, tabular, colon
   blinking at 1s while running; a `ProgressBar` (8px tall, stepped cells);
   the transport row.
4. **Transport row** — flex, `--space-5` gap, centred: reset icon button
   (`reload`, 40px), primary Start/Pause button (`lg`, 52px tall, min-width
   176px, pixel uppercase label), skip icon button (`chevron-right`).
5. **Footer row** — `SessionDots` left (square cells, one per set in the cycle;
   completed filled, current breathing at 4s, remaining outlined), full-screen
   expand icon button right.
6. **Radio strip** — `RadioPlayer`, full width. 96px 16:9 YouTube player on the
   left, then play/pause, a waveform glyph, the station overline `ember fm` with
   the track name in lowercase mono under it, and a mute toggle right. Scanline
   overlay at 4% cream over the video — this texture means "sound" and appears
   nowhere else.

**Keyboard.** `Space` toggle, `R` reset, `S` skip, `F` full screen.

### 2. Full-screen session

**Purpose.** Distraction-free work. The station fills the viewport; the countdown
is the only permanent element.

**Layout.** Fixed, inset 0, z-index 90. Three rows:

- **Background** — the YouTube embed sized to *cover*: `width:178vh;
  height:100.5vh; min-width:100.5vw; min-height:56.25vw`, centred with
  `translate(-50%,-50%)`, `pointer-events:none`, `tabIndex={-1}`. Over it: a
  `--surface-app` scrim at **72% opacity** (the `dim` prop, floor 40 — below
  ~60 the countdown stops being readable), then the scanline layer.
- **Header** — wordmark + session label left; station/track line, mute toggle,
  collapse button right. 20px/32px padding.
- **Centre** — `TimerDisplay` at `--display-lg` **128px**, then the transport row
  (reset / Start·Resume·Pause / skip).
- **Footer** — SessionDots left, `ESC TO EXIT` overline right.

**Chrome fade.** Header, transport and footer fade to `opacity:0` with
`pointer-events:none` after **4000ms** of no `mousemove`/`keydown`, transition
`--duration-slow` 480ms `--ease-in-out`. Any movement restores them. **The
countdown never fades.** Expose an `idleFade={false}` escape hatch for
screenshots.

**Two hard constraints, both learned the hard way:**

1. **Never mount two players of the same stream.** When full screen opens, the
   timer-view radio strip must unmount (or `showVideo={false}` on the overlay).
   Two embeds drift apart the instant either is unmuted.
2. **The CTA label must reflect reality.** `started={false}` on a session that
   has never run so it reads `START`, not `RESUME`.

**Fullscreen API.** `document.documentElement.requestFullscreen()` on enter,
`document.exitFullscreen()` on exit; both `.catch(() => {})` — they reject
without a user gesture. `Escape` exits natively *and* fires the browser's own
fullscreenchange, so also listen for `fullscreenchange` and sync state, or the
overlay will be left up after a native escape.

### 3. Log

Today's sessions as mono rows (time, mode, duration), a weekly bar chart drawn as
stacked square cells (no chart library — divs on the 4px grid), and four headline
stats in a 2×2 or 1×4 grid of cards. Empty state: "Nothing logged yet. Start a
session and it lands here."

### 4. Settings

Single 420px column (`--width-panel`), cards stacked 16px apart:

- **Durations** — three `Stepper` rows (focus / short / long) in minutes, plus
  sets-per-long-break.
- **Flow** — `Switch` rows: auto-start breaks, auto-start next focus. Hint text
  states the consequence: "Rolls into the break without asking."
- **Sound** — chime picker: a list of `ChimeOption` radio rows, each with a play
  button that auditions the sound in place, plus a volume `Slider`.
- **Appearance** — theme toggle (Night / Daylight).
- **Session label** — a text `Input`; hint "Shows on the timer and in your log."

---

## Interactions & behaviour

**Session state machine.** focus → (short break × N-1, long break on the Nth) →
focus. At zero: play the chime, log the session, open the hand-off dialog
("Take five?" / body "Session four of six logged. Twenty five minutes.") with
`Start break` primary and `Not yet` secondary. If auto-start is on, skip the
dialog and roll straight through.

**Mode retint.** Setting `data-mode="focus|short|long"` on the shell swaps
`--accent-mode`, which every primary button, filled tab, progress cell and
selected row reads. Cross-fade over `--duration-slow` 480ms. Components must
never reference `--amber-400` directly.

**Motion — two speeds, no exceptions.**
- Interface feedback: 80–240ms, `steps(3,end)`. Hovers and toggles read as
  frames, not smooth CSS.
- Ambient: 4s breathing pulse on the running session cell, 1s colon blink,
  480ms mode cross-fade, all linear.
- No bounce, no spring, no overshoot, anywhere.
- `prefers-reduced-motion` collapses every duration token to 1ms.

**States.**
- Hover: surface lightens one step to `--surface-raised`; filled controls get
  `filter: brightness(1.08)`; borders step `--border-default` → `--border-strong`.
  Never a hue change on hover, only a value change.
- **Press: the signature interaction.** The hard shadow collapses to nothing and
  the element moves `translate(2px, 2px)` — it sits down on the board. Every
  button, icon button and tab does this.
- Focus: 2px `--focus-ring` outline at 2px offset. Always visible, never removed.
- Disabled: 40% opacity, `cursor: not-allowed`, no shadow. No desaturation.

**Notifications.** Not in the prototype but needed in production: request
`Notification.permission` on first start, fire on completion for when the tab is
backgrounded. The chime alone is not enough — browsers throttle timers in hidden
tabs, so also **reconcile the countdown from a stored end-timestamp** on
`visibilitychange` rather than trusting accumulated `setInterval` ticks.

## State management

Local state is sufficient; no server, no auth, no database in this design.

| State | Shape | Persist |
| --- | --- | --- |
| `settings` | `{focus, short, long, sets, autoBreak, autoFocus, chime, volume, theme, label}` | localStorage |
| `sessions` | `{id, startedAt, mode, minutes}[]` | localStorage |
| `mode` | `'focus' \| 'short' \| 'long'` | no |
| `endsAt` | epoch ms, or null when paused | localStorage (survives reload) |
| `secondsLeft` | derived from `endsAt`, or held when paused | no |
| `running`, `completed`, `full`, `dialog`, `toast` | booleans / counters | no |

Drive the countdown from `endsAt` minus `Date.now()`, not from decrementing a
counter — it is the only way the timer survives a backgrounded tab or a reload.

## Design tokens

Paste `tokens/*.css` into `globals.css` in this order: fonts, colors,
typography, spacing, edges, motion, base. They are plain custom properties, no
preprocessor. Selected values:

**Colour — night (default).** Board `--ink-900 #100E0C`, card `--ink-800 #17130F`,
raised `--ink-700 #1F1A15`, sunken `#0B0908`. Text `--cream-100 #F3ECE0` /
secondary `--cream-300 #CFC3B0` / muted `--cream-500 #7E7263`. Borders
`--ink-600 #282118` subtle, `--ink-500 #332B22` default, `--cream-600 #5A5044`
strong.

**Accents (mode-mapped).** Amber = focus `#E8A64C`; sage = short break `#86A87F`;
clay = long break + destructive `#C97558`; haze `#9295B4` informational only.

**Light theme** (`[data-theme="light"]`, "Daylight"): board `#F6F1E7`, card
`#FFFBF2`, raised `#FFFFFF`, text `--ink-800`, accents step one shade darker.

**Type.** `--font-pixel` Silkscreen; `--font-mono` IBM Plex Mono; `--font-sans`
Instrument Sans. Sizes 10 / 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64 / 96 / 128.
Tracking: 0.04em pixel, **0.18em overlines**, 0.02em mono, 0 sans. Tabular
figures always on for anything that changes in place.

**Space.** 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128 — no half-steps.
Card padding 24, stack gap 16, inline gap 8, screen padding 32. Control heights
30 / 40 / 52. Tap target minimum 44. App width 960, panel width 420.

**Edges.** Radii 0 / 2 (controls) / 3 (cards) / 4 (panels). Nothing is a pill;
**there is no circle anywhere in the system** — the radio button is a square with
a square dot, the switch knob is a rectangle, session dots are cells.

**Shadows — hard offsets, zero blur.** `2px 2px 0` buttons, `4px 4px 0` lifted
card, `6px 6px 0` dialog, `3px 3px 0 var(--accent-mode)` accented. The only soft
shadow in the system is the modal overlay; the only blur is the scrim's
`blur(2px)`. Scrim `rgba(11,9,8,.72)`.

**Textures.** `.em-grid-bg` 8px dot grid on the board. `.em-scanlines` 1px lines
every 3px at 4% cream — **audio surfaces only**. No gradients, no photography, no
illustration.

## Content rules

Short, factual, unhurried; never celebrates, never nags. **No exclamation marks
anywhere. No emoji, ever.** Three strict casing registers:

- **PIXEL UPPERCASE**, 0.18em tracked — overlines, button labels, badges, tabs.
  Two or three words max.
- **Sentence case** — headings, hints, dialog copy, empty states.
- **lowercase mono** — anything the user or the world authored: task labels
  (`deep work`), chime names (`temple bell`), track titles, the wordmark itself.

Durations are always `mm:ss` digits (`25:00`, never "25 minutes"). Counts read
"4 of 6", not "4/6". Setting hints state the consequence, not the mechanism.
Full detail in the root `readme.md` → Content fundamentals.

## Assets

- **`assets/icons/`** — 40 Pixelarticons SVGs (MIT, licence included), 24px
  bitmap grid. Copy to `public/icons/`. **A substitution**: no icon set was
  supplied with the brief.
- Every icon is `fill="currentColor"` and is painted via a CSS `mask` plus
  `background-color: currentColor`, so it inherits text colour and retints with
  `--accent-mode` for free. **Do not render icons with `<img>`** — it loses the
  tint. In Next.js either keep the mask approach against `/icons/name.svg`, or run
  SVGR and inline them.
- **No logo exists.** None was supplied and none was invented. The wordmark is
  the literal word `ember` in pixel type.
- **No imagery of any kind** — no photos, no illustrations, no generated art.

## Audio and licensing — read before implementing

**Ember hosts no music.** The ambient station is always a **YouTube embed**
(`youtube-nocookie.com/embed/tRsQsTMvPNg`), controlled over the YouTube
postMessage API (`{"event":"command","func":"playVideo","args":[]}` with
`enablejsapi=1`). Playback stays on the rights holder's player and nothing is
redistributed. Do not swap this for a bundled audio file, and do not hide the
iframe to fake an audio-only widget — the visible player is what keeps this
within YouTube's terms.

Autoplay only works **muted**; the strip player starts paused, the full-screen
background starts muted-autoplay and unmutes on the user's click.

**Chimes are separate and are Ember's own** — five short WebAudio-synthesised
sounds (`chime.js`), never routed through the embed. In production, either keep
the synthesis or commission real samples.

## Files to work from

This document lives at `design_handoff_ember_pomodoro/README.md` inside the Ember
design system. Everything it refers to sits **one level up, at the project root** —
the design system is not duplicated in here, so there is exactly one copy of every
component and token and no chance of the two drifting apart.

| Path (from the project root) | What |
| --- | --- |
| `readme.md` | The full design system guide — content fundamentals, visual foundations, iconography |
| `styles.css` | Global entry point; the `@import` order matters |
| `tokens/` | The seven token files — the source of truth for every value in this document |
| `components/` | 26 reference primitives, each with a `.d.ts` props contract and a `.prompt.md` usage note |
| `ui_kits/ember-app/` | The click-through prototype: `App.jsx` (state machine), the four screens, `chime.js`, `index.html`, `fullscreen.html` |
| `templates/` | Two copyable starting points: windowed timer, full-screen session |
| `assets/icons/` | 40 Pixelarticons SVGs + licence |
| `_ds_bundle.js` | Compiled bundle — open `ui_kits/ember-app/index.html` in a browser and the prototype runs offline |

**To see the design running before you build it:** open
`ui_kits/ember-app/index.html`. It ticks, chimes, logs and goes full screen.
That is the target.

Read each component's `.d.ts` for the exact props contract and its
`.prompt.md` for when to use it and what the variants mean — they carry the
constraints that are easy to get wrong (the two-player rule, the `started` label,
`dim` floors, icon sizing on the bitmap grid).

## Open questions for the product owner

1. **Pixel font licence** — Silkscreen is a stand-in. Is a licensed pixel face
   being acquired?
2. **"Ember" is a placeholder name**, chosen to fit the brief. Renaming is a
   find-and-replace.
3. **Is the station fixed** to that one video, or should users paste their own
   YouTube URL? The component already takes a `videoId`.
4. **Does the log need to sync across devices?** Everything above assumes
   localStorage and no account.
