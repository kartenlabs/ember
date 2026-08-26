import React from 'react';

/* --surface-card fill, 1px subtle border, 3px radius, flat by default.
   A card lifts only when it is the one thing in front. No coloured left
   borders, no drop-shadow stacks, no nested cards. */

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Pixel uppercase overline, left of the header. */
  title?: string;
  /** Mono metadata, right of the header. */
  meta?: React.ReactNode;
  tone?: 'default' | 'accent' | 'quiet';
  padding?: 'default' | 'tight' | 'none';
  lifted?: boolean;
  /** Dot-grid texture inside the card. */
  grid?: boolean;
}

export function Card({
  children, title, meta, tone = 'default', padding = 'default',
  lifted = false, grid = false, style, ...rest
}: CardProps) {
  const toneBorder = {
    default: 'var(--border-subtle)',
    accent: 'var(--accent-mode)',
    quiet: 'transparent',
  }[tone] || 'var(--border-subtle)';

  return (
    <section
      style={{
        background: tone === 'quiet' ? 'var(--surface-sunken)' : 'var(--surface-card)',
        border: `var(--border-width) solid ${toneBorder}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: lifted ? 'var(--shadow-pixel)' : 'none',
        padding: padding === 'none' ? 0 : (padding === 'tight' ? 'var(--pad-card-tight)' : 'var(--pad-card)'),
        backgroundImage: grid ? 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' : undefined,
        backgroundSize: grid ? '8px 8px' : undefined,
        transition: 'var(--transition-surface)',
        ...style,
      }}
      {...rest}
    >
      {(title || meta) && (
        <header style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 'var(--space-4)', marginBottom: 'var(--space-5)',
        }}>
          {title && (
            <h3 style={{
              margin: 0, fontFamily: 'var(--font-pixel)', fontWeight: 700,
              fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)',
              textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>{title}</h3>
          )}
          {meta && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums',
            }}>{meta}</span>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
