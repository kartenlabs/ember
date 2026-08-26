'use client';

/* The log, drawn from the real sessions in localStorage. The reference
   prototype seeded three rows and a fixed chart; nothing here is faked.

   The chart is stacked square divs on the 4px grid. No chart library: a bar
   made of cells is three lines of JSX and matches the pixel grid exactly,
   which is more than any library would give us. */

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { Badge } from '@/components/core/Badge';
import { Card } from '@/components/core/Card';
import { Tag } from '@/components/core/Tag';
import { useEmber } from '@/app/providers';
import { formatTime } from '@/lib/timer';
import type { Mode, Session } from '@/lib/types';

const DAY_MS = 86_400_000;
const DAY_NAMES = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function dayStart(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Sessions per day for the seven days ending today, oldest first. */
function week(sessions: Session[], today: number) {
  return Array.from({ length: 7 }, (_, i) => {
    const start = today - (6 - i) * DAY_MS;
    const rows = sessions.filter((s) => dayStart(s.startedAt) === start);
    return { start, label: DAY_NAMES[new Date(start).getDay()], count: rows.length };
  });
}

/** Consecutive days ending today (or yesterday) with at least one session. */
function streak(sessions: Session[], today: number): number {
  if (sessions.length === 0) return 0;
  const days = new Set(sessions.map((s) => dayStart(s.startedAt)));
  // Today not being logged yet should not wipe a run, so start from whichever
  // of today or yesterday actually has something in it.
  let cursor = days.has(today) ? today : today - DAY_MS;
  let n = 0;
  while (days.has(cursor)) { n += 1; cursor -= DAY_MS; }
  return n;
}

function Bars({ data }: { data: ReturnType<typeof week> }) {
  // The scale grows with the data but never shrinks below a normal day, so a
  // single session does not render as a full column.
  const max = Math.max(8, ...data.map((d) => d.count));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-4)', height: 132 }}>
      {data.map((x) => (
        <div key={x.start} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, height: 100, width: '100%' }}>
            {Array.from({ length: max }).map((_, i) => (
              <span key={i} style={{
                flex: 1, minHeight: 2,
                background: (max - i) <= x.count ? 'var(--accent-focus)' : 'var(--surface-sunken)',
              }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{x.label}</span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string | number; unit: string }) {
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

const BADGE: Record<Mode, string> = { focus: 'Focus', short: 'Short', long: 'Long' };

/** One session, two sessions. The product never writes "1 sessions". */
function plural(n: number, word: string): string {
  return n === 1 ? word : `${word}s`;
}

export function LogScreen() {
  const { sessions } = useEmber();

  /* Which day it is now is not something render may ask directly — the clock
     is not a pure input, and the server has no business guessing it. This is
     the sanctioned way to read one: a client snapshot, a server snapshot of 0,
     and no subscription, because the date does not change mid-session. Before
     it resolves every filter below matches nothing, which renders the empty
     state the log would show anyway while its stored rows are still loading. */
  const today = useSyncExternalStore(
    useCallback(() => () => {}, []),
    useCallback(() => dayStart(Date.now()), []),
    useCallback(() => 0, []),
  );

  const view = useMemo(() => {
    const todays = sessions
      .filter((s) => dayStart(s.startedAt) === today)
      .sort((a, b) => a.startedAt - b.startedAt);
    const data = week(sessions, today);
    const best = data.reduce((a, b) => (b.count > a.count ? b : a), data[0]);
    return {
      todays,
      data,
      best,
      weekTotal: data.reduce((n, d) => n + d.count, 0),
      focusedMinutes: todays.filter((s) => s.mode === 'focus').reduce((n, s) => n + s.minutes, 0),
      streak: streak(sessions, today),
    };
  }, [sessions, today]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
        <Stat label="Today" value={view.todays.length} unit={plural(view.todays.length, 'session')} />
        <Stat label="Focused" value={view.focusedMinutes} unit="min" />
        <Stat label="Streak" value={view.streak} unit={plural(view.streak, 'day')} />
        <Stat
          label="Best day"
          value={view.best.count > 0 ? view.best.label : '—'}
          unit={view.best.count > 0 ? `${view.best.count} ${plural(view.best.count, 'session')}` : 'nothing yet'}
        />
      </div>

      <Card title="This week" meta={`${view.weekTotal} ${plural(view.weekTotal, 'session')}`}>
        <Bars data={view.data} />
      </Card>

      <Card title="Today" meta={`${view.todays.length} logged`} padding="none">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {view.todays.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
              padding: 'var(--space-4) var(--space-6)',
              borderTop: i === 0 ? 0 : 'var(--border-width) solid var(--border-subtle)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', width: 52, fontVariantNumeric: 'tabular-nums' }}>
                {new Date(s.startedAt).toTimeString().slice(0, 5)}
              </span>
              {s.task ? <Tag>{s.task}</Tag> : null}
              <span style={{ flex: 1 }} />
              <Badge tone={s.mode}>{BADGE[s.mode]}</Badge>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(s.minutes * 60)}
              </span>
            </div>
          ))}
          {view.todays.length === 0 && (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Nothing logged yet. Start a session and it lands here.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
