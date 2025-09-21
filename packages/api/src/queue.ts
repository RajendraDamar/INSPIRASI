import { StorageAdapter, createAsyncStorageAdapter, createLocalForageAdapter } from './persistence';
import { Report } from './mocks/reports';

const QUEUE_KEY = 'inspirasi:pending-reports';

export async function getQueue(adapter: StorageAdapter | null): Promise<Report[]> {
  if (!adapter) return [];
  try {
    const raw = await adapter.getItem(QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Report[];
  } catch (e) {
    return [];
  }
}

export async function pushToQueue(adapter: StorageAdapter | null, r: Report): Promise<void> {
  if (!adapter) return;
  try {
    const q = await getQueue(adapter);
    q.push(r);
    await adapter.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch (e) {
    // swallow
  }
}

export async function clearQueue(adapter: StorageAdapter | null): Promise<void> {
  if (!adapter) return;
  try {
    await adapter.removeItem(QUEUE_KEY);
  } catch (e) {
    // swallow
  }
}

// Convenience: pick a platform adapter (prefers AsyncStorage, falls back to localForage)
export async function pickAdapter(): Promise<StorageAdapter | null> {
  const a = await createAsyncStorageAdapter();
  if (a) return a;
  const lf = await createLocalForageAdapter();
  if (lf) return lf;
  return null;
}
