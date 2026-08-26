'use client';

import { Badge } from '@/components/core/Badge';
import { Button } from '@/components/core/Button';
import { IconButton } from '@/components/core/IconButton';
import { Tag } from '@/components/core/Tag';
import { ProgressBar } from '@/components/feedback/ProgressBar';
import { Tooltip } from '@/components/feedback/Tooltip';
import { Tabs } from '@/components/navigation/Tabs';
import { RadioPlayer } from '@/components/timer/RadioPlayer';
import { SessionDots } from '@/components/timer/SessionDots';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { useEmber } from '@/app/providers';
import { chimeName } from '@/lib/chimes';
import { overlineFor } from '@/lib/timer';
import { MODE_LABEL, type Mode } from '@/lib/types';

const MODE_TABS = [
  { value: 'focus', label: 'Focus', icon: 'hourglass' },
  { value: 'short', label: 'Short', icon: 'coffee' },
  { value: 'long', label: 'Long', icon: 'leaf' },
];

export function TimerScreen() {
  const {
    settings, station, timer, total, full, enterFull, preview,
  } = useEmber();
  const { mode, secondsLeft, running, started, completed } = timer;

  const elapsed = total ? ((total - secondsLeft) / total) * 100 : 0;
  const credit = `${station.title} · ${station.author}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-6)' }}>
        <Tabs
          variant="segmented"
          value={mode}
          onChange={(v) => timer.chooseMode(v as Mode)}
          items={MODE_TABS}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <SessionDots total={settings.sets} completed={completed} current={running ? completed : -1} />
          <Tooltip label="Full screen" shortcut="F">
            <IconButton icon="expand" label="Full screen" onClick={enterFull} />
          </Tooltip>
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--space-7)', padding: 'var(--space-9) 0 var(--space-8)',
      }}>
        <TimerDisplay
          seconds={secondsLeft}
          running={running}
          mode={mode}
          size="lg"
          label={overlineFor(mode, completed, settings.sets, MODE_LABEL[mode])}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Tooltip label="Reset" shortcut="R">
            <IconButton icon="reload" label="Reset" onClick={timer.reset} />
          </Tooltip>
          <Button size="lg" icon={running ? 'pause' : 'play'} onClick={timer.toggle} style={{ minWidth: 176 }}>
            {running ? 'Pause' : started ? 'Resume' : 'Start'}
          </Button>
          <Tooltip label="Skip ahead" shortcut="S">
            <IconButton icon="chevron-right" label="Skip" onClick={timer.skip} />
          </Tooltip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {settings.task && <Tag>{settings.task}</Tag>}
          <Badge tone={mode} solid={running}>{running ? 'Running' : 'Paused'}</Badge>
        </div>
      </div>

      <ProgressBar value={elapsed} cells={48} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 'var(--space-5)', alignItems: 'stretch' }}>
        {/* Unmounted while the full-screen session is up. Two embeds of one
            stream drift apart the moment either is unmuted. */}
        {!full && (
          <RadioPlayer videoId={station.videoId} track={credit} />
        )}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
          padding: 'var(--space-4) var(--space-5)',
          border: 'var(--border-width) solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)', background: 'var(--surface-card)',
          gridColumn: full ? '1 / -1' : undefined,
        }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>chime</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', flex: 1 }}>{chimeName(settings.chime)}</span>
          <IconButton
            icon="bell-ring" label="Preview chime" size="sm" variant="ghost"
            onClick={() => preview(settings.chime)}
          />
        </div>
      </div>
    </div>
  );
}
