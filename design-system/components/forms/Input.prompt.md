Text field for names, labels, and anything typed.

```jsx
<Input label="Session name" placeholder="Untitled" hint="Shows in your log." />
<Input label="Focus length" value="25" suffix="min" />
```

- Value text is always mono; labels are pixel overlines; hints are sans.
- For numbers the user nudges (durations, cycle counts) use `Stepper` instead.
