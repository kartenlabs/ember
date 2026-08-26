# Ember app — UI kit

The product itself: a pomodoro timer with a chime at the end and an ambient
radio strip underneath. One window, three views, no onboarding.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Runnable click-through. Loads the design-system bundle, then the screens. |
| `App.jsx` | State and the session state machine (focus → short/long → focus). |
| `AppShell.jsx` | Window frame: wordmark, view tabs, theme toggle, dot-grid board. |
| `TimerScreen.jsx` | Mode switch, countdown, transport, progress, YouTube radio, chime readout. |
| `fullscreen.html` | The full-screen session on its own, ticking. |
| `LogScreen.jsx` | Today's sessions, weekly pixel bar chart, four headline stats. |
| `SettingsScreen.jsx` | Lengths, flow switches, theme, chime picker with audition, session label. |
| `chime.js` | Five WebAudio stand-in chimes so the picker can actually be heard. |

## What is interactive

- Start / pause / resume, reset, skip. Space, `R`, `S` and `F` are wired.
- `F` or the expand button enters the full-screen session: the station plays
  full-bleed behind the countdown and the chrome fades after four idle seconds.
  `Escape` or the collapse button leaves.
- The countdown really ticks. At zero it plays the selected chime, logs the
  session, and opens the hand-off dialog.
- Mode switch retints the whole shell through `data-mode` — amber, sage, clay.
- Chime rows audition on the spot; volume feeds the preview.
- Theme toggle flips `data-theme="light"`.

## What is faked

Session history is seeded with three rows, the weekly chart is fixed data, and
"Clear today" does nothing.

The radio strip is real: it embeds the Ember station from YouTube
(`youtube-nocookie.com/embed/tRsQsTMvPNg`) and drives it over the postMessage
API, so no music is bundled or redistributed. It starts paused — browsers only
allow autoplay when muted.
