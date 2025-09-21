import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { showWebNotification } from '../notifications'

// Ensure a window global exists for the helper which checks for `typeof window`.
if (typeof (globalThis as any).window === 'undefined') {
  ;(globalThis as any).window = globalThis
}

beforeEach(() => {
  // cleanup
  ;(globalThis as any).__lastNotification = undefined
  ;(globalThis as any).Notification = undefined
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('showWebNotification (web helper)', () => {
  it('creates a Notification immediately when permission is granted', () => {
    // @ts-ignore
    ;(globalThis as any).Notification = function (title: string, opts: any) {
      ;(globalThis as any).__lastNotification = { title, opts }
    }
    ;(globalThis as any).Notification.permission = 'granted'

    showWebNotification('Hi', 'Body')

    expect((globalThis as any).__lastNotification).toEqual({
      title: 'Hi',
      opts: { body: 'Body' },
    })
  })

  it('requests permission when not denied and shows notification on grant', async () => {
    const req = vi.fn(() => Promise.resolve('granted'))
    // @ts-ignore
    ;(globalThis as any).Notification = function (title: string, opts: any) {
      ;(globalThis as any).__lastNotification = { title, opts }
    }
    ;(globalThis as any).Notification.permission = 'default'
    ;(globalThis as any).Notification.requestPermission = req

    showWebNotification('Later', 'LaterBody')

    // wait for microtasks and promise handlers
    await new Promise((r) => setTimeout(r, 0))

    expect(req).toHaveBeenCalled()
    expect((globalThis as any).__lastNotification).toEqual({
      title: 'Later',
      opts: { body: 'LaterBody' },
    })
  })
})
