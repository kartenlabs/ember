The only navigation primitive. Segmented for switching timer mode, underline for switching view.

```jsx
<Tabs variant="segmented" fullWidth value={mode} onChange={setMode}
  items={[{value:'focus',label:'Focus',icon:'hourglass'},{value:'short',label:'Short',icon:'coffee'},{value:'long',label:'Long',icon:'leaf'}]} />
<Tabs variant="underline" value={view} onChange={setView} items={['Timer','Log','Settings']} />
```

- Segmented rows hold two to four cells; more than four goes to `Select`.
- The active segmented cell fills with `--accent-mode`, which is how the app announces which mode is armed.
