import { LogScreen } from '@/components/app/LogScreen';

/* Bare title: the root layout's template appends " — Ember". */
export const metadata = { title: 'Session log' };

export default function Page() {
  return <LogScreen />;
}
