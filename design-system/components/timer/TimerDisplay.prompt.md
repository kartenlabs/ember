The single loudest element in the product. One per screen, dead centre.

```jsx
<TimerDisplay seconds={1500} running mode="focus" label="Focus · 3 of 6" size="lg" />
```

- Minutes and seconds only. Never hours, never milliseconds, never a decimal.
- Paused state drops the numerals to `--text-secondary` and stops the colon — that dimming is the whole pause affordance.
- Do not put a border, card, or ring around it. It sits on the bare board.
