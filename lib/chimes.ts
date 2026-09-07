/* Ember's own chimes: five short sounds synthesised from oscillators at play
   time. Nothing is sampled, bundled or downloaded, and none of this ever
   touches the radio embed — the two audio paths are deliberately separate.
   Recipes carried over from design-system/ui_kits/ember-app/chime.js. */

export interface ChimeMeta {
  id: string;
  /** lowercase mono: the world authored these names, not the product. */
  name: string;
  description: string;
  /** Decorative waveform bars for the picker. Heights 1-10. */
  bars: number[];
}

interface Recipe {
  partials: number[];
  decay: number;
  type: OscillatorType;
  strikes: number;
  gap: number;
}

const RECIPES: Record<string, Recipe> = {
  bell: { partials: [880, 1320, 1760], decay: 2.4, type: 'sine', strikes: 2, gap: 0.55 },
  wood: { partials: [420, 900], decay: 0.22, type: 'triangle', strikes: 1, gap: 0 },
  marimba: { partials: [523, 1046], decay: 0.9, type: 'sine', strikes: 3, gap: 0.16 },
  glass: { partials: [1320, 1980, 2640], decay: 1.6, type: 'sine', strikes: 1, gap: 0 },
  hum: { partials: [196, 294], decay: 3.2, type: 'sine', strikes: 1, gap: 0 },
};

export const CHIMES: ChimeMeta[] = [
  { id: 'bell', name: 'temple bell', description: 'Two soft strikes, long tail.', bars: [2, 8, 5, 9, 3, 6, 2] },
  { id: 'wood', name: 'wood block', description: 'One dry knock. Nothing lingers.', bars: [9, 3, 1, 1, 1, 1, 1] },
  { id: 'marimba', name: 'soft marimba', description: 'Three rising notes.', bars: [3, 5, 7, 5, 3, 2, 1] },
  { id: 'glass', name: 'glass', description: 'Bright and short, like a rim tap.', bars: [7, 9, 4, 2, 1, 1, 1] },
  { id: 'hum', name: 'low hum', description: 'Barely there. For shared rooms.', bars: [4, 4, 5, 4, 4, 3, 3] },
];

export function chimeName(id: string): string {
  return CHIMES.find((c) => c.id === id)?.name ?? id;
}

let ctx: AudioContext | null = null;

/** One context for the app, created on the first play — which is always a user
 *  gesture, so it starts unsuspended. */
function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // A context created before a gesture, or parked by a backgrounded tab, comes
  // back suspended. Resuming is a no-op when it is already running.
  if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
  return ctx;
}

/** Unlock from Start, before the timer's later non-gesture completion. */
export function unlockAudio(): void {
  try { audio(); } catch { /* Audio is optional; the timer still runs. */ }
}

function strike(a: AudioContext, r: Recipe, at: number, vol: number): void {
  r.partials.forEach((f, i) => {
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = r.type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime((vol / 100) * (0.22 / (i + 1)), at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + r.decay);
    o.connect(g);
    g.connect(a.destination);
    o.start(at);
    o.stop(at + r.decay + 0.05);
  });
}

/** Plays a chime. Returns its length in seconds, or 0 if there is no audio. */
export function playChime(kind: string, volume = 60): number {
  try {
    const a = audio();
    if (!a || volume <= 0) return 0;
    const r = RECIPES[kind] ?? RECIPES.bell;
    const t = a.currentTime + 0.02;
    for (let i = 0; i < r.strikes; i++) strike(a, r, t + i * r.gap, volume);
    return r.decay + r.strikes * r.gap;
  } catch {
    return 0;
  }
}
