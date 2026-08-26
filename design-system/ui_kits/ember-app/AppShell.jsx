function AppShell({ view, onView, theme, onTheme, mode, children }) {
  const { Tabs, IconButton, Tooltip } = window.EmberDesignSystem_e9992d;
  return (
    <div data-theme={theme === 'light' ? 'light' : undefined} data-mode={mode}
      style={{ minHeight: '100%', background: 'var(--surface-app)', display: 'flex', justifyContent: 'center', padding: '32px 20px 48px' }}>
      <div className="em-grid-bg" style={{
        width: '100%', maxWidth: 'var(--width-app)',
        border: 'var(--border-width) solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-app)',
        boxShadow: 'var(--shadow-pixel-lg)',
      }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-6)', padding: '14px 20px',
          borderBottom: 'var(--border-width) solid var(--border-subtle)',
          background: 'var(--surface-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
            {/* No logo supplied: the name set in pixel type is the mark. */}
            <span style={{ fontFamily: 'var(--font-pixel)', fontWeight: 700, fontSize: 'var(--text-lg)', letterSpacing: '.06em', color: 'var(--text-primary)' }}>ember</span>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>a quiet timer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <Tabs variant="underline" value={view} onChange={onView} items={['Timer', 'Log', 'Settings']} />
            <Tooltip label={theme === 'light' ? 'Night' : 'Daylight'} side="left">
              <IconButton icon={theme === 'light' ? 'moon' : 'sun'} label="Toggle theme" size="sm" onClick={onTheme} />
            </Tooltip>
          </div>
        </header>
        <main style={{ padding: 'var(--space-8)' }}>{children}</main>
      </div>
    </div>
  );
}

Object.assign(window, { AppShell });
