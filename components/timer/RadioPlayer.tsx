'use client';

import React from 'react';
import { Icon } from '../core/Icon';
import { IconButton } from '../core/IconButton';

/* The radio, for real.
 *
 * Ember hosts no music. The station is a YouTube embed and nothing else, so
 * playback stays on the rights holder's own player and no audio is copied,
 * proxied or redistributed. Controls talk to the iframe over YouTube's
 * postMessage API.
 *
 * Two things here are load-bearing and must not be "tidied up":
 *   - The player stays visible. Hiding the iframe to fake an audio-only
 *     widget is what would put this outside YouTube's terms.
 *   - `station` and `track` are printed as given. They carry the real title
 *     and channel, resolved in lib/station.ts, because the honest credit over
 *     someone else's stream is their name, not one we invented.
 *
 * The iframe is mounted on first play rather than on page load. Merely opening
 * the timer would otherwise hand a visitor's IP and user agent to Google before
 * they asked for any music, and /privacy promises it does not. This is not the
 * hiding described above: once mounted the player is the full, visible, ordinary
 * YouTube player, and nothing is disguised as an audio-only widget. Do not
 * "restore" the eager iframe — it would make the privacy page a lie.
 */

export const EMBER_STATION_VIDEO = 'tRsQsTMvPNg';

export interface RadioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  videoId?: string;
  /** Pixel uppercase overline. Ours to write, so it describes rather than claims. */
  station?: string;
  /** Mono credit line, world-authored: the video's own title and channel. */
  track?: string;
  /** strip is the 96px thumbnail in the timer view; panel is a full 16:9. */
  layout?: 'strip' | 'panel';
  /** Autoplay only ever works muted, so this starts muted too. */
  autoplay?: boolean;
}

export function RadioPlayer({
  videoId = EMBER_STATION_VIDEO, station = 'now playing', track,
  layout = 'strip', autoplay = false, style, ...rest
}: RadioPlayerProps) {
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  /* Nothing from YouTube is requested until this turns true. */
  const [loaded, setLoaded] = React.useState(autoplay);
  const [playing, setPlaying] = React.useState(autoplay);
  const [muted, setMuted] = React.useState(autoplay);

  const send = (func: string) => {
    const el = frameRef.current;
    if (!el || !el.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: [] }), 'https://www.youtube-nocookie.com');
  };
  const toggle = () => {
    // First press mounts the player; the press itself is the gesture that lets
    // it start unmuted. After that the postMessage API drives it as before.
    if (!loaded) { setLoaded(true); setPlaying(true); return; }
    send(playing ? 'pauseVideo' : 'playVideo');
    setPlaying(!playing);
  };
  const mute = () => { send(muted ? 'unMute' : 'mute'); setMuted(!muted); };

  /* The iframe only ever mounts because playback was asked for, so autoplay is
     always on; muting is only forced on the prop-driven path, which has no
     user gesture behind it and would otherwise be blocked. */
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&autoplay=1${autoplay ? '&mute=1' : ''}`;
  const panel = layout === 'panel';

  const screen = (
    <div style={{
      position: 'relative', flex: '0 0 auto',
      width: panel ? '100%' : 96, aspectRatio: '16 / 9',
      background: 'var(--surface-sunken)',
      border: 'var(--border-width) solid var(--border-default)',
      overflow: 'hidden',
    }}>
      {loaded ? (
        <iframe
          ref={frameRef} src={src} title={track || station}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        /* Holds the player's exact footprint so nothing shifts when it mounts,
           and says plainly what pressing play will load. */
        <span style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--space-2)', textAlign: 'center',
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
          color: 'var(--text-muted)', lineHeight: 'var(--leading-snug)',
        }}>
          {panel ? 'Press play to load the YouTube player' : 'Press play'}
        </span>
      )}
      {/* Scanline veil ties the video into the board. Pointer-events off so the
          player's own controls still work. */}
      <span aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)',
      }} />
    </div>
  );

  return (
    <div
      style={{
        minWidth: 0,
        display: 'flex', flexDirection: panel ? 'column' : 'row',
        alignItems: panel ? 'stretch' : 'center', gap: 'var(--space-5)',
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--surface-card)',
        border: 'var(--border-width) solid var(--border-subtle)',
        borderRadius: 'var(--radius-xs)',
        ...style,
      }}
      {...rest}
    >
      {screen}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 1, minWidth: 0 }}>
        <IconButton icon={playing ? 'pause' : 'play'} label={playing ? 'Pause radio' : 'Play radio'} size="sm" variant="secondary" onClick={toggle} />
        <span style={{ display: 'flex', color: playing ? 'var(--accent-mode)' : 'var(--text-muted)' }}>
          <Icon name="audio-waveform" size={16} style={{ animation: playing ? 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite' : 'none' }} />
        </span>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{station}</span>
          {/* Left in the casing its author gave it. The system would set a track
              title lowercase, but a credit is not ours to restyle. */}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{track || 'youtube stream'}</span>
        </div>
        <IconButton icon={muted ? 'volume-x' : 'volume-3'} label={muted ? 'Unmute' : 'Mute'} size="sm" variant="ghost" active={muted} onClick={mute} />
      </div>
    </div>
  );
}
