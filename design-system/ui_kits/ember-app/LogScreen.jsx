const WEEK = [{ d: 'mon', n: 6 }, { d: 'tue', n: 4 }, { d: 'wed', n: 8 }, { d: 'thu', n: 5 }, { d: 'fri', n: 7 }, { d: 'sat', n: 2 }, { d: 'sun', n: 0 }];

function Bars() {
  const max = 8;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-4)', height: 132 }}>
      {WEEK.map((x) => (
        <div key={x.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Pixel column: one cell per session, stacked. */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, height: 100, width: '100%' }}>
            {Array.from({ length: max }).map((_, i) => (
              <span key={i} style={{
                height: 10,
                background: (max - i) <= x.n ? 'var(--accent-focus)' : 'var(--surface-sunken)',
              }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{x.d}</span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{unit}</span>
      </span>
    </div>
  );
}

function LogScreen({ sessions }) {
  const { Card, Badge, Tag, Tabs } = window.EmberDesignSystem_e9992d;
  const [range, setRange] = React.useState('Week');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
        <Stat label="Today" value={sessions.length} unit="sessions" />
        <Stat label="Focused" value={sessions.length * 25} unit="min" />
        <Stat label="Streak" value="9" unit="days" />
        <Stat label="Best day" value="wed" unit="8 sessions" />
      </div>

      <Card title="This week" meta="32 sessions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Tabs variant="segmented" value={range} onChange={setRange} items={['Week', 'Month']} />
          <Bars />
        </div>
      </Card>

      <Card title="Today" meta={`${sessions.length} logged`} padding="none">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sessions.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
              padding: 'var(--space-4) var(--space-6)',
              borderTop: i === 0 ? 0 : 'var(--border-width) solid var(--border-subtle)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', width: 52 }}>{s.at}</span>
              <Tag>{s.task}</Tag>
              <span style={{ flex: 1 }} />
              <Badge tone={s.mode}>{s.mode === 'focus' ? 'Focus' : s.mode === 'short' ? 'Short' : 'Long'}</Badge>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{s.length}</span>
            </div>
          ))}
          {sessions.length === 0 && (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Nothing logged yet. Start a session and it lands here.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { LogScreen });
