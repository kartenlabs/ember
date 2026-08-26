const MIN = 60;
const MODE_TEXT = { focus: 'Focus', short: 'Short break', long: 'Long break' };

function App() {
  const ns = window.EmberDesignSystem_e9992d;
  const { Dialog, Button, Toast } = ns;
  const FullScreenTimer = ns.FullScreenTimer;
  const [view, setView] = React.useState('Timer');
  const [theme, setTheme] = React.useState('dark');
  const [mode, setMode] = React.useState('focus');
  const [settings, setSettings] = React.useState({
    focus: 25, short: 5, long: 15, sets: 4, volume: 60,
    autoBreak: true, autoFocus: false, awake: true, task: 'deep work',
  });
  const [chime, setChime] = React.useState('bell');
  const [running, setRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(25 * MIN);
  const [completed, setCompleted] = React.useState(2);
  const [done, setDone] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [full, setFull] = React.useState(false);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(false);
  const [sessions, setSessions] = React.useState([
    { at: '09:12', task: 'deep work', mode: 'focus', length: '25:00' },
    { at: '09:42', task: 'deep work', mode: 'short', length: '05:00' },
    { at: '10:15', task: 'inbox sweep', mode: 'focus', length: '25:00' },
  ]);

  React.useEffect(() => { window.EMBER_CHIME_ID = chime; }, [chime]);

  const total = settings[mode] * MIN;
  React.useEffect(() => { setSeconds(settings[mode] * MIN); setRunning(false); }, [mode, settings.focus, settings.short, settings.long]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => {
      if (s <= 1) { finish(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(id);
  });

  function finish() {
    setRunning(false);
    if (window.emberChime) window.emberChime(chime, muted ? 0 : settings.volume);
    const at = new Date().toTimeString().slice(0, 5);
    const len = String(settings[mode]).padStart(2, '0') + ':00';
    setSessions((s) => [...s, { at, task: settings.task, mode, length: len }]);
    if (mode === 'focus') setCompleted((c) => Math.min(c + 1, settings.sets));
    setDone(mode);
  }

  function nextAfter(finished) {
    if (finished === 'focus') return (completed + 1) >= settings.sets ? 'long' : 'short';
    return 'focus';
  }

  function acceptNext() {
    const next = nextAfter(done);
    if (next === 'focus' && done === 'long') setCompleted(0);
    setMode(next);
    setDone(null);
    setTimeout(() => setRunning(true), 60);
  }

  function skip() {
    setRunning(false);
    setMode(nextAfter(mode));
    setToast({ tone: 'neutral', title: 'Skipped ahead', message: 'Nothing was logged for that one.' });
  }

  function reset() {
    setSeconds(total); setRunning(false);
    setToast({ tone: 'neutral', title: 'Timer reset', message: `Back to ${settings[mode]} minutes.` });
  }

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') { e.preventDefault(); setRunning((r) => !r); }
      if (e.key === 'r') reset();
      if (e.key === 's') skip();
      if (e.key === 'f') enterFull();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function enterFull() {
    setFull(true);
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  }
  function exitFull() {
    setFull(false);
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }

  const LABEL = { focus: 'Focus complete', short: 'Break over', long: 'Long break over' };
  const NEXT_LABEL = { focus: 'Start break', short: 'Back to focus', long: 'Back to focus' };

  return (
    <window.AppShell view={view} onView={setView} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} mode={mode}>
      {view === 'Timer' && (
        <window.TimerScreen
          mode={mode} onMode={setMode} seconds={seconds} total={total} running={running}
          onToggle={() => setRunning(!running)} onReset={reset} onSkip={skip}
          completed={completed} current={completed} sets={settings.sets}
          task={settings.task} playing={playing} muted={muted}
          onPlaying={setPlaying} onMuted={setMuted}
          chimeName={(window.EMBER_CHIMES || []).find((c) => c.id === chime)?.name || chime}
          onFullScreen={enterFull}
          radioSilent={full}
        />
      )}
      {view === 'Log' && <window.LogScreen sessions={sessions} />}
      {view === 'Settings' && (
        <window.SettingsScreen
          settings={settings} onSet={(k, v) => setSettings((s) => ({ ...s, [k]: v }))}
          chime={chime} onChime={setChime} theme={theme} onTheme={setTheme}
        />
      )}

      <Dialog open={Boolean(done)} overline={done ? LABEL[done] : ''}
        title={done === 'focus' ? 'Take five?' : 'Ready to go again?'}
        onClose={() => setDone(null)}
        footer={<>
          <Button variant="ghost" onClick={() => setDone(null)}>Not yet</Button>
          <Button icon={done === 'focus' ? 'coffee' : 'hourglass'} onClick={acceptNext}>{done ? NEXT_LABEL[done] : ''}</Button>
        </>}>
        {done === 'focus'
          ? `Session ${Math.min(completed, settings.sets)} of ${settings.sets} logged. ${settings.focus} minutes.`
          : 'That break is done. The next focus block is ready when you are.'}
      </Dialog>

      {full && FullScreenTimer && (
        <FullScreenTimer
          seconds={seconds} running={running} mode={mode}
          label={`${MODE_TEXT[mode]} · ${Math.min(completed + 1, settings.sets)} of ${settings.sets}`}
          completed={completed} current={running ? completed : -1} sets={settings.sets}
          task={settings.task} started={seconds !== settings[mode] * MIN}
          onToggle={() => setRunning(!running)} onReset={reset} onSkip={skip} onExit={exitFull}
        />
      )}

      {toast && (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 80 }}>
          <Toast tone={toast.tone} title={toast.title} message={toast.message} onDismiss={() => setToast(null)} />
        </div>
      )}
    </window.AppShell>
  );
}

Object.assign(window, { App });
