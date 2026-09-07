'use client';

/* The window frame, and the home of everything that floats above a screen:
   the hand-off dialog, the toast, and the full-screen session.

   `data-mode` sits on this wrapper rather than on <html> on purpose. The mode
   scopes in globals.css are [data-mode="..."] selectors, and :root sets the
   default at equal specificity — put the attribute on <html> and the default
   wins the cascade, silently killing every retint. */

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/core/Button';
import { IconButton } from '@/components/core/IconButton';
import { Dialog } from '@/components/feedback/Dialog';
import { Toast } from '@/components/feedback/Toast';
import { Tooltip } from '@/components/feedback/Tooltip';
import { Tabs } from '@/components/navigation/Tabs';
import { FullScreenTimer } from '@/components/timer/FullScreenTimer';
import { useEmber } from '@/app/providers';
import { overlineFor } from '@/lib/timer';
import { MODE_LABEL, MODE_TEXT } from '@/lib/types';

const VIEWS = [
  { value: '/', label: 'Timer' },
  { value: '/log', label: 'Log' },
  { value: '/settings', label: 'Settings' },
];

/** Sentence case, and never a celebration. */
const DONE_OVERLINE = { focus: 'Focus complete', short: 'Break over', long: 'Long break over' };
const DONE_TITLE = { focus: 'Take a break?', short: 'Ready to go again?', long: 'Ready to go again?' };
const NEXT_LABEL = { focus: 'Start break', short: 'Back to focus', long: 'Back to focus' };

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    settings, setSetting, station, timer, full, exitFull,
    toast, dismissToast, sessions,
  } = useEmber();

  const { mode, done, completed, secondsLeft, running, started } = timer;
  const dark = settings.theme !== 'light';
  const credit = `${station.title} · ${station.author}`;

  return (
    <div
      data-mode={mode}
      className="em-shell"
      style={{
        minHeight: '100%', background: 'var(--surface-app)',
        display: 'flex', justifyContent: 'center',
      }}
    >
      <div className="em-grid-bg" inert={full} style={{
        width: '100%', maxWidth: 'var(--width-app)',
        border: 'var(--border-width) solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-app)',
        boxShadow: 'var(--shadow-pixel-lg)',
      }}>
        <header className="em-header" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-6)', padding: '14px 20px',
          borderBottom: 'var(--border-width) solid var(--border-subtle)',
          background: 'var(--surface-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
            {/* No logo was ever supplied. The name set in pixel type is the mark. */}
            <span style={{ fontFamily: 'var(--font-pixel)', fontWeight: 700, fontSize: 'var(--text-lg)', letterSpacing: '.06em', color: 'var(--text-primary)' }}>ember</span>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>a quiet timer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <Tabs
              variant="underline"
              value={VIEWS.find((v) => v.value === pathname)?.value ?? '/'}
              onChange={(v) => router.push(v)}
              items={VIEWS}
            />
            <Tooltip label={dark ? 'Daylight' : 'Night'} side="left">
              <IconButton
                icon={dark ? 'sun' : 'moon'}
                label="Toggle theme"
                size="sm"
                onClick={() => setSetting('theme', dark ? 'light' : 'dark')}
              />
            </Tooltip>
          </div>
        </header>
        <main className="em-main">{children}</main>
      </div>

      {/* The hand-off. Skipped entirely when auto-start is on. */}
      <Dialog
        open={Boolean(done)}
        overline={done ? DONE_OVERLINE[done.finished] : ''}
        title={done ? DONE_TITLE[done.finished] : ''}
        onClose={timer.dismissDone}
        footer={done ? (
          <>
            <Button variant="ghost" onClick={timer.dismissDone}>Not yet</Button>
            <Button
              icon={done.next === 'focus' ? 'hourglass' : done.next === 'short' ? 'coffee' : 'leaf'}
              onClick={timer.acceptNext}
            >
              {NEXT_LABEL[done.finished]}
            </Button>
          </>
        ) : null}
      >
        {done?.finished === 'focus'
          ? `Session ${Math.min(completed, settings.sets)} of ${settings.sets} logged. ${done.minutes} minutes.`
          : 'That break is done. The next focus block is ready when you are.'}
      </Dialog>

      {full && (
        <FullScreenTimer
          seconds={secondsLeft}
          running={running}
          mode={mode}
          label={overlineFor(mode, completed, settings.sets, MODE_LABEL[mode])}
          completed={completed}
          current={running ? completed : -1}
          sets={settings.sets}
          task={settings.task}
          videoId={station.videoId}
          track={credit}
          started={started}
          onToggle={timer.toggle}
          onReset={timer.reset}
          onSkip={timer.skip}
          onExit={exitFull}
        />
      )}

      {toast && (
        <div className="em-toast-position" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 100 }}>
          <Toast
            tone={toast.tone}
            title={toast.title}
            message={toast.message}
            onDismiss={dismissToast}
          />
        </div>
      )}

      {/* Screen-reader-only running commentary. The countdown itself is a
          role="timer", but a mode change is silent without this. */}
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {`${MODE_TEXT[mode]}, ${running ? 'running' : 'paused'}. ${sessions.length} logged.`}
      </span>
    </div>
  );
}
