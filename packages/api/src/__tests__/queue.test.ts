import { describe, it, expect, beforeEach } from 'vitest';
import { getQueue, pushToQueue, clearQueue } from '../queue';
import { writeDehydratedState, readDehydratedState, STORAGE_KEY, StorageAdapter } from '../persistence';
import type { DehydratedState } from '@tanstack/react-query';

// In-memory adapter for tests
function createMemoryAdapter(): StorageAdapter {
  const store: Record<string, string> = {};
  return {
    getItem: async (k: string) => (store[k] === undefined ? null : store[k]),
    setItem: async (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: async (k: string) => {
      delete store[k];
    },
  };
}

describe('queue persistence', () => {
  let adapter: StorageAdapter;

  beforeEach(() => {
    adapter = createMemoryAdapter();
  });

  it('pushes, gets, and clears queue entries', async () => {
  await clearQueue(adapter);
  const initial = await getQueue(adapter);
    expect(initial).toEqual([]);

  await pushToQueue(adapter, { id: 't1', createdAt: new Date().toISOString(), title: 'x' });
  await pushToQueue(adapter, { id: 't2', createdAt: new Date().toISOString(), title: 'y' });

  const q = await getQueue(adapter);
    expect(q.length).toBe(2);
    expect(q[0].id).toBe('t1');
    expect(q[1].id).toBe('t2');

  await clearQueue(adapter);
  const after = await getQueue(adapter);
    expect(after).toEqual([]);
  });

  it('write/read dehydrated state roundtrip', async () => {
  const state = { queries: [{ queryKey: ['reports'], state: { data: [{ id: 'r1' }] } }] } as unknown as DehydratedState;
  await writeDehydratedState(adapter, state);
  const raw = await adapter.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();

  const decoded = await readDehydratedState(adapter);
    expect(decoded).toEqual(state);

  await writeDehydratedState(adapter, null);
  const empty = await readDehydratedState(adapter);
    expect(empty).toBeNull();
  });
});
