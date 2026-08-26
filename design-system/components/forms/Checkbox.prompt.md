Multi-select or standalone opt-in inside settings lists.

```jsx
<Checkbox label="Auto-start breaks" description="Rolls into the break without asking." checked={auto} onChange={…} />
```

- 18px square box, 2px radius, pixel check glyph. Never a circle.
- For an immediate on/off that takes effect now, use `Switch`; for a list of choices, use `Checkbox`.
