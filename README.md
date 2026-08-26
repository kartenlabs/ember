# ember

A pomodoro timer with a chime at the end and an ambient radio strip underneath.
Set a focus length, a short break and a long break; the countdown runs; at zero
a chime you chose plays and the session is logged.

Pixel-first and calm: bitmap type, square corners, hard one-pixel shadows, a
warm near-black board, and three low-chroma accents that each stand for one
timer mode.

```
npm install
npm run dev      # http://localhost:3000
npm test         # the state machine and the clock format
npm run build
```

No account, no server, no database. Settings and the session log live in
`localStorage`.

## The three views

- **Timer** (`/`) — mode tabs, the countdown, transport, set progress, and the
  station. `Space` toggles, `R` resets, `S` skips, `F` goes full screen.
- **Log** (`/log`) — today's sessions, a weekly chart, four headline stats.
- **Settings** (`/settings`) — block lengths, auto-start, the chime picker with
  an audition button, theme, and the session label.

Plus a **full-screen session** that plays the station full-bleed behind the
countdown and fades its own chrome after four idle seconds. `Escape` leaves.

## Layout

```
app/          layout (fonts, theme, provider), the three routes, globals.css
components/   core · forms · feedback · navigation · timer · app
lib/          useTimer · timer · chimes · storage · station · notify · types
public/icons/ 40 Pixelarticons SVGs + their licence
design-system/ the design handover this was built from
```

`design-system/` is the source of truth for every visual value. Where this code
and that folder disagree on a colour, size, radius, shadow or duration, the
token files in `design-system/tokens/` win. To see the intended behaviour
running, serve that folder and open `ui_kits/ember-app/index.html`.

## Two things worth knowing before you change them

**The countdown is driven by a deadline, not by counting.** `lib/useTimer.ts`
stores `endsAt` as an epoch timestamp and every tick simply subtracts it from
`Date.now()`. That is the only reason the timer survives a backgrounded tab —
browsers throttle timers in hidden tabs hard — a reload, or a sleeping laptop.
Do not replace it with a decrementing counter.

**The station is an embed and must stay one.** Ember hosts no music. The player
stays visible, the audio is never bundled, and the credit line is the video's
real title and channel. See [THIRD-PARTY.md](./THIRD-PARTY.md) — it explains
what the constraints are and why.

## Styling

Plain CSS custom properties, no preprocessor and no utility framework. The 139
design tokens sit in `app/globals.css`, copied verbatim from
`design-system/tokens/`. Components are styled with inline `style` objects whose
values are `var(--token)` references, exactly as the reference authored them.

`--accent-mode` is the indirection that makes mode retinting work: set
`data-mode="focus|short|long"` on a container and every primary button, filled
tab, progress cell and selected row inside it changes colour. Components must
never reference `--amber-400` and friends directly.

`data-mode` goes on the app shell, not on `<html>` — the mode scopes and the
`:root` default have equal specificity, so putting it on `<html>` would let the
default win and silently kill every retint.

## Open questions

1. **Silkscreen is a stand-in** for a pixel face that could not be licensed.
   Swapping it is a one-line change.
2. **"Ember" is a placeholder name**, chosen to fit the brief.
3. **The station is fixed** to one video. `RadioPlayer` already takes a
   `videoId`, so making it user-settable is a Settings field away.
4. **The log does not sync** across devices. Everything assumes localStorage.

## Licences

See [THIRD-PARTY.md](./THIRD-PARTY.md).
