/* Tiny WebAudio chime bank so the picker can actually be auditioned.
   Real Ember ships sampled sounds; these are stand-ins with the same shape. */
(function () {
  var ctx;
  function audio() { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); return ctx; }
  var RECIPES = {
    bell:    { partials: [880, 1320, 1760], decay: 2.4, type: 'sine', strikes: 2, gap: 0.55 },
    wood:    { partials: [420, 900], decay: 0.22, type: 'triangle', strikes: 1, gap: 0 },
    marimba: { partials: [523, 1046], decay: 0.9, type: 'sine', strikes: 3, gap: 0.16 },
    glass:   { partials: [1320, 1980, 2640], decay: 1.6, type: 'sine', strikes: 1, gap: 0 },
    hum:     { partials: [196, 294], decay: 3.2, type: 'sine', strikes: 1, gap: 0 }
  };
  function strike(r, at, vol) {
    var a = audio();
    r.partials.forEach(function (f, i) {
      var o = a.createOscillator(), g = a.createGain();
      o.type = r.type; o.frequency.value = f;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime((vol / 100) * (0.22 / (i + 1)), at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, at + r.decay);
      o.connect(g); g.connect(a.destination);
      o.start(at); o.stop(at + r.decay + 0.05);
    });
  }
  window.emberChime = function (kind, volume) {
    var r = RECIPES[kind] || RECIPES.bell, a = audio(), t = a.currentTime + 0.02;
    for (var i = 0; i < r.strikes; i++) strike(r, t + i * r.gap, volume == null ? 60 : volume);
    return r.decay + r.strikes * r.gap;
  };
  window.EMBER_CHIMES = [
    { id: 'bell', name: 'temple bell', description: 'Two soft strikes, long tail.', bars: [2, 8, 5, 9, 3, 6, 2] },
    { id: 'wood', name: 'wood block', description: 'One dry knock. Nothing lingers.', bars: [9, 3, 1, 1, 1, 1, 1] },
    { id: 'marimba', name: 'soft marimba', description: 'Three rising notes.', bars: [3, 5, 7, 5, 3, 2, 1] },
    { id: 'glass', name: 'glass', description: 'Bright and short, like a rim tap.', bars: [7, 9, 4, 2, 1, 1, 1] },
    { id: 'hum', name: 'low hum', description: 'Barely there. For shared rooms.', bars: [4, 4, 5, 4, 4, 3, 3] }
  ];
})();
