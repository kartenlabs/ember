import assert from 'node:assert/strict';
import test from 'node:test';
import { dayStart, shiftDay, week, streak } from './calendar.ts';
import type { Session } from './types.ts';

test('calendar days and streaks survive both daylight-saving transitions', (t) => {
  const previous = process.env.TZ;
  process.env.TZ = 'Europe/Berlin';
  t.after(() => { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; });
  for (const [date, hours] of [['2026-03-30', 23], ['2026-10-26', 25]] as const) {
    const today = dayStart(new Date(`${date}T12:00:00`).getTime());
    assert.equal((today - shiftDay(today, -1)) / 3_600_000, hours);
    const sessions: Session[] = Array.from({ length: 7 }, (_, i) => ({
      id: String(i), startedAt: shiftDay(today, -i) + 12 * 3_600_000,
      mode: 'focus', minutes: 25, task: '',
    }));
    assert.deepEqual(week(sessions, today).map((day) => day.count), [1, 1, 1, 1, 1, 1, 1]);
    assert.equal(streak(sessions, today), 7);
    assert.equal(streak(sessions.slice(1), today), 6);
    assert.equal(streak(sessions.slice(2), today), 0);
  }
});

test('calendar arithmetic crosses month and year boundaries', () => {
  const today = new Date(2026, 0, 1).getTime();
  assert.equal(new Date(shiftDay(today, -1)).getFullYear(), 2025);
  assert.equal(week([], today).length, 7);
  assert.equal(streak([], today), 0);
});
