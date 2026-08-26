The ambient radio, embedded from YouTube — use this, not a bundled audio file, for any music in Ember.

```jsx
<RadioPlayer layout="strip" track="music for thinking and building" />
<RadioPlayer layout="panel" autoplay />
```

- Ember never hosts or ships music. The stream always plays inside the YouTube
  embed so playback stays on the rights holder's player. `videoId` defaults to
  the station stream (`EMBER_STATION_VIDEO`).
- The player screen stays visible — small in `strip`, full width in `panel`.
  Do not hide the iframe to fake an audio-only widget.
- Autoplay only works muted; the default is paused with a play button.
- Chimes are separate. They are short generated sounds owned by Ember and are
  never routed through this player.
