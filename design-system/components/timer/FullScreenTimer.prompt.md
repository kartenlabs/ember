Distraction-free session view — the station full-bleed behind a scrim, countdown at 128px, chrome that fades when you stop moving.

```jsx
<FullScreenTimer seconds={1122} running mode="focus" label="Focus · 3 of 6"
  completed={2} current={2} sets={4} task="deep work"
  onToggle={…} onReset={…} onSkip={…} onExit={exitFullScreen} />
```

- Pair it with the browser Fullscreen API: call `requestFullscreen()` when you
  mount it and `exitFullscreen()` in `onExit`. `Escape` already calls `onExit`.
- Chrome (header, transport, footer) fades to 0 after four idle seconds and
  returns on any mouse or key movement. The countdown never fades.
- The background video autoplays muted, which is the only autoplay browsers
  allow; the mute button unmutes it on the user's gesture.
- **Never mount this alongside a playing `RadioPlayer`.** Both would hold their
  own copy of the stream and drift out of sync the moment either is unmuted.
  Pause or unmount the strip player while this is up, or pass
  `showVideo={false}` and let the strip keep ownership of the audio.
- Pass `started={false}` before the first run so the CTA reads "Start"; leaving
  it default on a fresh timer invites the user to resume something that never ran.
- `idleFade={false}` pins the chrome. Use it for any static capture — a card
  thumbnail or screenshot otherwise photographs the faded-out state.
- `dim` below about 60 makes the countdown hard to read. Do not go lower.
- `showVideo={false}` gives the same layout on the bare board, for users who
  want the timer without the station.
