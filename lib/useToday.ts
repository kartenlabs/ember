'use client';

import { useSyncExternalStore } from 'react';
import { dayStart, shiftDay } from './calendar';

function subscribe(onChange: () => void) {
  let timeout: ReturnType<typeof setTimeout>;
  const refresh = () => {
    clearTimeout(timeout);
    onChange();
    const now = Date.now();
    timeout = setTimeout(refresh, shiftDay(now, 1) - now + 50);
  };
  refresh();
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('focus', refresh);
  return () => {
    clearTimeout(timeout);
    document.removeEventListener('visibilitychange', refresh);
    window.removeEventListener('focus', refresh);
  };
}

export function useToday() {
  return useSyncExternalStore(subscribe, () => dayStart(Date.now()), () => 0);
}
