Quiet confirmation in the corner — session logged, settings saved, chime muted.

```jsx
<Toast tone="success" title="Session logged" message="25 minutes added to today." actionLabel="Undo" action={undo} onDismiss={close} />
```

- Bottom-right, one at a time, gone in about four seconds.
- Never used to announce the end of a timer — that is the chime plus `Dialog`.
