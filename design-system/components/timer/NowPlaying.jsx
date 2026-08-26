import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';

/* The radio strip. Ambient audio running under a session: a scanline
   field, a marquee title, and the smallest possible transport. */
export function NowPlaying({
  track, station = 'ember fm', playing = false, muted = false,
  onToggle, onMute, style, ...rest
}) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--surface-card)',
        backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)',
        border: 'var(--border-width) solid var(--border-subtle)',
        borderRadius: 'var(--radius-xs)',
        ...style,
      }}
      {...rest}
    >
      <IconButton icon={playing ? 'pause' : 'play'} label={playing ? 'Pause audio' : 'Play audio'} size="sm" variant="secondary" onClick={onToggle} />
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: playing ? 'var(--accent-mode)' : 'var(--text-muted)' }}>
        <Icon name="audio-waveform" size={16} style={{ animation: playing ? 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite' : 'none' }} />
      </span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{station}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{track}</span>
      </div>
      <IconButton icon={muted ? 'volume-x' : 'volume-3'} label={muted ? 'Unmute' : 'Mute'} size="sm" variant="ghost" active={muted} onClick={onMute} />
    </div>
  );
}
