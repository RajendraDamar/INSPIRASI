export async function showLocalNotification(title: string, body?: string) {
  if (typeof window === 'undefined') return;
  try {
    // runtime guard for expo-notifications; import with computed specifier to avoid bundler resolution
    const spec = 'expo-notifications';
    // import the module dynamically; narrow to the methods we use
    type ExpoNotifications = {
      presentNotificationAsync?: (payload: { title: string; body?: string }) => Promise<void>;
      scheduleNotificationAsync?: (payload: unknown) => Promise<void>;
    };
    const mod = (await import(spec)) as ExpoNotifications | undefined;
    if (mod && mod.presentNotificationAsync) {
      await mod.presentNotificationAsync({ title, body });
    }
  } catch (err) {
    // no-op if expo-notifications is unavailable
  }
}
