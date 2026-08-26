function SettingsScreen({ settings, onSet, chime, onChime, theme, onTheme }) {
  const { Card, Stepper, Switch, Slider, Select, ChimeOption, Button, Input } = window.EmberDesignSystem_e9992d;
  const [previewing, setPreviewing] = React.useState(null);
  const play = (id) => {
    setPreviewing(id);
    const dur = window.emberChime ? window.emberChime(id, settings.volume) : 1;
    setTimeout(() => setPreviewing(null), dur * 1000);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Card title="Lengths" meta="minutes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Stepper label="Focus" value={settings.focus} step={5} min={5} max={90} unit="min" onChange={(v) => onSet('focus', v)} />
            <Stepper label="Short break" value={settings.short} step={1} min={1} max={15} unit="min" onChange={(v) => onSet('short', v)} />
            <Stepper label="Long break" value={settings.long} step={5} min={10} max={45} unit="min" onChange={(v) => onSet('long', v)} />
            <Stepper label="Sessions before a long break" value={settings.sets} min={2} max={8} onChange={(v) => onSet('sets', v)} />
          </div>
        </Card>

        <Card title="Flow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Switch label="Auto-start breaks" description="Rolls into the break without asking." checked={settings.autoBreak} onChange={() => onSet('autoBreak', !settings.autoBreak)} />
            <Switch label="Auto-start next focus" description="Keeps the set moving after a break." checked={settings.autoFocus} onChange={() => onSet('autoFocus', !settings.autoFocus)} />
            <Switch label="Keep the screen awake" checked={settings.awake} onChange={() => onSet('awake', !settings.awake)} />
            <Select label="Theme" value={theme} onChange={(e) => onTheme(e.target.value)}
              options={[{ value: 'dark', label: 'Night' }, { value: 'light', label: 'Daylight' }]} />
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Card title="Chime" meta="plays at zero">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {(window.EMBER_CHIMES || []).map((c) => (
              <ChimeOption key={c.id} name={c.name} description={c.description} bars={c.bars}
                selected={chime === c.id} playing={previewing === c.id}
                onSelect={() => onChime(c.id)} onPlay={() => play(c.id)} />
            ))}
            <div style={{ paddingTop: 'var(--space-3)' }}>
              <Slider label="Volume" value={settings.volume} valueLabel={settings.volume + '%'}
                onChange={(e) => onSet('volume', +e.target.value)} />
            </div>
          </div>
        </Card>

        <Card title="Session label">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Input label="What you are working on" value={settings.task} onChange={(e) => onSet('task', e.target.value)} hint="Shows on the timer and in your log." />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <Button variant="danger" size="sm" icon="trash">Clear today</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen });
