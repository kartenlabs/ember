Continuous value drawn as lit cells — volume, chime softness, ambient level.

```jsx
<Slider label="Chime volume" value={vol} valueLabel={vol + '%'} onChange={e => setVol(+e.target.value)} />
```

- Cells, never a rail-and-thumb. There is no round knob anywhere in Ember.
- Always pair with a mono readout so the value is legible without dragging.
