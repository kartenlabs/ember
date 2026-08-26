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
  const [playing, setPlaying] = React.useState(autoplay);
  const [muted, setMuted] = React.useState(autoplay);

  const send = (func: string) => {
    const el = frameRef.current;
    if (!el || !el.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
  };
  const toggle = () => { send(playing ? 'pauseVideo' : 'playVideo'); setPlaying(!playing); };
  const mute = () => { send(muted ? 'unMute' : 'mute'); setMuted(!muted); };

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1${autoplay ? '&autoplay=1&mute=1' : ''}`;
  const panel = layout === 'panel';

  const screen = (
    <div style={{
      position: 'relative', flex: '0 0 auto',
      width: panel ? '100%' : 96, aspectRatio: '16 / 9',
      background: 'var(--surface-sunken)',
      border: 'var(--border-width) solid var(--border-default)',
      overflow: 'hidden',
    }}>
      <iframe
        ref={frameRef} src={src} title={track || station}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
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
