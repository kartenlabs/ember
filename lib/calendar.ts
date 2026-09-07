import type { Session } from './types.ts';

export function dayStart(time: number): number {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/** Calendar arithmetic preserves midnight across 23- and 25-hour days. */
export function shiftDay(time: number, days: number): number {
  const date = new Date(time);
  date.setDate(date.getDate() + days);
  return dayStart(date.getTime());
}

export function week(sessions: Session[], today: number) {
  const counts = new Map<number, number>();
  for (const session of sessions) {
    const day = dayStart(session.startedAt);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return Array.from({ length: 7 }, (_, i) => {
    const start = shiftDay(today, i - 6);
    return { start, label: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(start).getDay()], count: counts.get(start) ?? 0 };
  });
}

export function streak(sessions: Session[], today: number): number {
  const days = new Set(sessions.map((session) => dayStart(session.startedAt)));
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  let count = 0;
  while (days.has(cursor)) {
    count += 1;
    cursor = shiftDay(cursor, -1);
  }
  return count;
}
