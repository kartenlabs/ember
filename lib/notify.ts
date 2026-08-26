/* A notification when the block ends, for when the tab is in the background.
   The chime alone is not enough: a hidden tab can have its audio context
   parked, and the user is by definition looking somewhere else. */

export function askToNotify(): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'default') return;
  // Fired from the first Start, which is the user gesture browsers require.
  void Notification.requestPermission().catch(() => {});
}

export function notify(title: string, body: string): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (document.visibilityState === 'visible') return; // The screen already said it.
  try {
    new Notification(title, { body, icon: '/icons/hourglass.svg', silent: true });
  } catch {
    // Some browsers only allow this from a service worker. The chime stands.
  }
}
