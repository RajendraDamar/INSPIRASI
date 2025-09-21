import { describe, it, expect, beforeEach } from 'vitest';
import { getQueue, pushToQueue, clearQueue } from '../queue';
import { writeDehydratedState, readDehydratedState, STORAGE_KEY } from '../persistence';

// In-memory adapter for tests
function createMemoryAdapter() {
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
  let adapter: ReturnType<typeof createMemoryAdapter>;

  beforeEach(() => {
    adapter = createMemoryAdapter();
  });

  it('pushes, gets, and clears queue entries', async () => {
    await clearQueue(adapter as any);
    const initial = await getQueue(adapter as any);
    expect(initial).toEqual([]);

    await pushToQueue(adapter as any, { id: 't1', createdAt: new Date().toISOString(), title: 'x' });
    await pushToQueue(adapter as any, { id: 't2', createdAt: new Date().toISOString(), title: 'y' });

    const q = await getQueue(adapter as any);
    expect(q.length).toBe(2);
    expect(q[0].id).toBe('t1');
    expect(q[1].id).toBe('t2');

    await clearQueue(adapter as any);
    const after = await getQueue(adapter as any);
    expect(after).toEqual([]);
  });

  it('write/read dehydrated state roundtrip', async () => {
    const state = { queries: [{ queryKey: ['reports'], state: { data: [{ id: 'r1' }] } }] } as any;
    await writeDehydratedState(adapter as any, state);
    const raw = await adapter.getItem(STORAGE_KEY as string);
    expect(raw).not.toBeNull();

    const decoded = await readDehydratedState(adapter as any);
    expect(decoded).toEqual(state);

    await writeDehydratedState(adapter as any, null);
    const empty = await readDehydratedState(adapter as any);
    expect(empty).toBeNull();
  });
});
