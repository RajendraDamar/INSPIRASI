import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nominatimSearch } from '../index'

const sampleResponse = [
  {
    place_id: 12345,
    display_name: 'Test Place, Test City, Test Country',
    lat: '12.34',
    lon: '56.78',
  },
]

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  // cleanup global fetch mock
  // @ts-ignore
  if ((globalThis as any).fetch && (globalThis as any).fetch.restore) {
    // noop
  }
})

describe('nominatimSearch', () => {
  it('returns parsed places when fetch returns results', async () => {
    const mockRes = {
      json: vi.fn(async () => sampleResponse),
    }
    // @ts-ignore global fetch mock
    vi.stubGlobal('fetch', vi.fn(async () => mockRes))

    const results = await nominatimSearch('test')

    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({
      id: '12345',
      display_name: 'Test Place, Test City, Test Country',
      lat: 12.34,
      lon: 56.78,
    })
  })

  it('returns empty array when query is empty', async () => {
    const results = await nominatimSearch('')
    expect(results).toEqual([])
  })
})
