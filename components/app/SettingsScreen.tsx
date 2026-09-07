'use client';

import { Button } from '@/components/core/Button';
import { Card } from '@/components/core/Card';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { Slider } from '@/components/forms/Slider';
import { Stepper } from '@/components/forms/Stepper';
import { Switch } from '@/components/forms/Switch';
import { ChimeOption } from '@/components/timer/ChimeOption';
import { useEmber } from '@/app/providers';
import { CHIMES } from '@/lib/chimes';
import type { Theme } from '@/lib/types';
import { dayStart } from '@/lib/calendar';
import { useToday } from '@/lib/useToday';

export function SettingsScreen() {
  const { settings, setSetting, preview, previewing, clearToday, sessions } = useEmber();
  const today = useToday();
  const hasToday = sessions.some((session) => dayStart(session.startedAt) === today);

  return (
    <div className="em-settings-grid" style={{ display: 'grid', gap: 'var(--space-6)', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Card title="Lengths" meta="minutes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <Stepper label="Focus" value={settings.focus} step={5} min={5} max={90} unit="min" onChange={(v) => setSetting('focus', v)} />
            <Stepper label="Short break" value={settings.short} step={1} min={1} max={15} unit="min" onChange={(v) => setSetting('short', v)} />
            <Stepper label="Long break" value={settings.long} step={5} min={10} max={45} unit="min" onChange={(v) => setSetting('long', v)} />
            <Stepper label="Sessions before a long break" value={settings.sets} min={2} max={8} onChange={(v) => setSetting('sets', v)} />
          </div>
        </Card>

        <Card title="Flow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Hints state the consequence, not the mechanism. */}
            <Switch
              label="Auto-start breaks"
              description="Rolls into the break without asking."
              checked={settings.autoBreak}
              onChange={() => setSetting('autoBreak', !settings.autoBreak)}
            />
            <Switch
              label="Auto-start next focus"
              description="Keeps the set moving after a break."
              checked={settings.autoFocus}
              onChange={() => setSetting('autoFocus', !settings.autoFocus)}
            />
            <Select
              label="Theme"
              value={settings.theme}
              onChange={(e) => setSetting('theme', e.target.value as Theme)}
              options={[{ value: 'dark', label: 'Night' }, { value: 'light', label: 'Daylight' }]}
            />
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Card title="Chime" meta="plays at zero">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {CHIMES.map((c) => (
              <ChimeOption
                key={c.id}
                name={c.name}
                description={c.description}
                bars={c.bars}
                selected={settings.chime === c.id}
                playing={previewing === c.id}
                onSelect={() => setSetting('chime', c.id)}
                onPlay={() => preview(c.id)}
              />
            ))}
            <div style={{ paddingTop: 'var(--space-3)' }}>
              <Slider
                label="Volume"
                value={settings.volume}
                valueLabel={`${settings.volume}%`}
                onChange={(e) => setSetting('volume', Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        <Card title="Session label">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Input
              label="What you are working on"
              value={settings.task}
              onChange={(e) => setSetting('task', e.target.value)}
              hint="Shows on the timer and in your log."
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <Button variant="danger" size="sm" icon="trash" disabled={!hasToday} onClick={clearToday}>
                Clear today
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
