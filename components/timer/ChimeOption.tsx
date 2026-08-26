'use client';

import React from 'react';
import { IconButton } from '../core/IconButton';

/* A pickable sound. The bar pattern is a fixed decorative signature per
   chime, not a real waveform — it just gives each option a silhouette. */
export interface ChimeOptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** lowercase mono: "temple bell". */
  name: string;
  description?: string;
  /** 5-9 heights between 1 and 10. Decorative, not a real waveform. */
  bars?: number[];
  selected?: boolean;
  onSelect?: () => void;
  onPlay?: () => void;
  playing?: boolean;
}

export function ChimeOption({
  name, description, bars = [3, 7, 5, 9, 4, 6, 2],
  selected = false, onSelect, onPlay, playing = false, style, ...rest
}: ChimeOptionProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      role="radio" aria-checked={selected} tabIndex={0}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
        padding: 'var(--space-4) var(--space-5)',
        background: selected ? 'var(--surface-raised)' : (hover ? 'var(--surface-raised)' : 'var(--surface-sunken)'),
        border: `var(--border-width) solid ${selected ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-xs)',
        cursor: 'pointer', transition: 'var(--transition-control)',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, flex: '0 0 auto',
        border: `var(--border-width) solid ${selected ? 'var(--border-accent)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-xs)',
      }}>
        <span style={{ width: 8, height: 8, background: selected ? 'var(--accent-mode)' : 'transparent' }} />
      </span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
        {description && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</span>}
      </div>
      <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }} aria-hidden="true">
        {bars.map((b, i) => (
          <span key={i} style={{
            width: 3, height: b * 2,
            background: selected || playing ? 'var(--accent-mode)' : 'var(--border-default)',
            transition: 'background-color var(--duration-fast) var(--ease-step)',
          }} />
        ))}
      </span>
      <IconButton
        icon={playing ? 'pause' : 'play'} label={playing ? 'Stop preview' : `Preview ${name}`}
        size="sm" variant="secondary"
        onClick={(e) => { e.stopPropagation(); onPlay?.(); }}
      />
    </div>
  );
}
