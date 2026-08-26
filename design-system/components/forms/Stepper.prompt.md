Bounded numeric nudger — the primary way durations are set in Ember.

```jsx
<Stepper label="Focus" value={25} step={5} min={5} max={90} unit="min" onChange={setFocus} />
```

- The number is pixel type so it reads as a sibling of the countdown.
- Use for anything under ~20 discrete values. Beyond that use `Slider`.
- Buttons disable at the bounds rather than clamping silently.
