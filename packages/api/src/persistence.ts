import { DehydratedState } from '@tanstack/react-query';

export type StorageAdapter = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

const KEY = 'inspirasi:rq-cache';

export async function createLocalForageAdapter(): Promise<StorageAdapter | null> {
  try {
    const lf = await import('localforage');
    const instance = lf.default ?? lf;
    return {
      getItem: async (k: string) => {
        const v = await instance.getItem(k);
        return v == null ? null : String(v);
      },
      setItem: async (k: string, value: string) => { await instance.setItem(k, value); },
      removeItem: async (k: string) => { await instance.removeItem(k); },
    };
  } catch (e) {
    return null;
  }
}

export async function createAsyncStorageAdapter(): Promise<StorageAdapter | null> {
  try {
    const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
    const AsyncStorage = AsyncStorageModule.default ?? AsyncStorageModule;
    return {
      getItem: async (k: string) => {
        const v = await AsyncStorage.getItem(k);
        return v;
      },
      setItem: async (k: string, value: string) => AsyncStorage.setItem(k, value),
      removeItem: async (k: string) => AsyncStorage.removeItem(k),
    };
  } catch (e) {
    return null;
  }
}

export function createLocalStorageAdapter(): StorageAdapter | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return {
      getItem: async (k: string) => Promise.resolve(window.localStorage.getItem(k)),
      setItem: async (k: string, value: string) => Promise.resolve(window.localStorage.setItem(k, value)),
      removeItem: async (k: string) => Promise.resolve(window.localStorage.removeItem(k)),
    };
  } catch (e) {
    return null;
  }
}

export const STORAGE_KEY = KEY;

export async function readDehydratedState(adapter: StorageAdapter | null): Promise<DehydratedState | null> {
  if (!adapter) return null;
  try {
    const raw = await adapter.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DehydratedState;
  } catch (e) {
    return null;
  }
}

export async function writeDehydratedState(adapter: StorageAdapter | null, state: DehydratedState | null) {
  if (!adapter) return;
  try {
    if (!state) {
      await adapter.removeItem(STORAGE_KEY);
      return;
    }
    await adapter.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // swallow; persistence is best-effort
  }
}
