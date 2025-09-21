export function showWebNotification(title: string, body: string) {
  if (typeof window === 'undefined') return;
  try {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((p) => {
          if (p === 'granted') new Notification(title, { body });
        });
      }
    } else {
      // fallback: window alert
      // keep non-blocking; use console and in-page UI instead
      // Notification API not available; nothing to do here in non-supported environment
    }
  } catch (err) {
    // swallow errors to avoid breaking caller
  }
}
