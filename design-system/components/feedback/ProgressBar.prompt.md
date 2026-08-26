Elapsed-time and fill meter, drawn as discrete cells.

```jsx
<ProgressBar value={62} cells={40} label="Session" showValue />
```

- Cell count controls the perceived precision — fewer cells for calmer, coarser readouts.
- Fills with `--accent-mode`, so it matches whichever mode is running.
- Not for indeterminate loading; Ember has no spinner.
