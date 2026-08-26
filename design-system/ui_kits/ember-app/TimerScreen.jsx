const MODE_LABEL = { focus: 'Focus', short: 'Short break', long: 'Long break' };

function TimerScreen({
  mode, onMode, seconds, total, running, onToggle, onReset, onSkip,
  completed, current, sets, task, playing, muted, onPlaying, onMuted, chimeName, onFullScreen, radioSilent,
}) {
  const ns = window.EmberDesignSystem_e9992d;
  const { TimerDisplay, SessionDots, ProgressBar, Tabs, Button, IconButton, Tooltip, Badge, Tag } = ns;
  // Falls back to the player-less strip if the bundle predates RadioPlayer.
  const RadioPlayer = ns.RadioPlayer || ns.NowPlaying;
  const pct = total ? ((total - seconds) / total) * 100 : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-6)' }}>
        <Tabs variant="segmented" value={mode} onChange={onMode}
          items={[{ value: 'focus', label: 'Focus', icon: 'hourglass' }, { value: 'short', label: 'Short', icon: 'coffee' }, { value: 'long', label: 'Long', icon: 'leaf' }]} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <SessionDots total={sets} completed={completed} current={running ? current : -1} />
          <Tooltip label="Full screen" shortcut="F"><IconButton icon="expand" label="Full screen" onClick={onFullScreen} /></Tooltip>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-7)', padding: 'var(--space-9) 0 var(--space-8)' }}>
        <TimerDisplay seconds={seconds} running={running} mode={mode} size="lg"
          label={`${MODE_LABEL[mode]} · ${Math.min(completed + 1, sets)} of ${sets}`} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Tooltip label="Reset" shortcut="R"><IconButton icon="reload" label="Reset" onClick={onReset} /></Tooltip>
          <Button size="lg" icon={running ? 'pause' : 'play'} onClick={onToggle} style={{ minWidth: 176 }}>
            {running ? 'Pause' : (seconds === total ? 'Start' : 'Resume')}
          </Button>
          <Tooltip label="Skip ahead" shortcut="S"><IconButton icon="chevron-right" label="Skip" onClick={onSkip} /></Tooltip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Tag>{task}</Tag>
          <Badge tone={mode} solid={running}>{running ? 'Running' : 'Paused'}</Badge>
        </div>
      </div>

      <ProgressBar value={pct} cells={48} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {/* Unmounted while the full-screen view is up — two embeds of one
            stream would drift apart the moment either is unmuted. */}
        {!radioSilent && <RadioPlayer track="music for thinking and building" />}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
          padding: 'var(--space-4) var(--space-5)',
          border: 'var(--border-width) solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)', background: 'var(--surface-card)',
        }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>chime</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', flex: 1 }}>{chimeName}</span>
          <IconButton icon="bell-ring" label="Preview chime" size="sm" variant="ghost"
            onClick={() => window.emberChime && window.emberChime(window.EMBER_CHIME_ID || 'bell', 60)} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TimerScreen });
