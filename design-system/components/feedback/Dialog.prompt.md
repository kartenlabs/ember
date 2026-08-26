Modal for the end-of-session hand-off and for settings that need committing.

```jsx
<Dialog overline="Focus complete" title="Take five?" onClose={close}
  footer={<><Button variant="ghost">Skip</Button><Button icon="coffee">Start break</Button></>}>
  <p>Session four of six logged. Twenty five minutes.</p>
</Dialog>
```

- 2px border, 6px hard shadow, and the one place a soft scrim blur is allowed.
- Two actions maximum. The recommended one is the primary Button on the right.
