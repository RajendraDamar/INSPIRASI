import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { showWebNotification } from '../notifications'

if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis
}

beforeEach(() => {
  globalThis.__lastNotification = undefined
  globalThis.Notification = undefined
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('showWebNotification (web helper)', () => {
  it('creates a Notification immediately when permission is granted', () => {
    globalThis.Notification = function (title, opts) {
      globalThis.__lastNotification = { title, opts }
    }
    globalThis.Notification.permission = 'granted'

    showWebNotification('Hi', 'Body')

    expect(globalThis.__lastNotification).toEqual({
      title: 'Hi',
      opts: { body: 'Body' },
    })
  })

  it('requests permission when not denied and shows notification on grant', async () => {
    const req = vi.fn(() => Promise.resolve('granted'))
    globalThis.Notification = function (title, opts) {
      globalThis.__lastNotification = { title, opts }
    }
    globalThis.Notification.permission = 'default'
    globalThis.Notification.requestPermission = req

    showWebNotification('Later', 'LaterBody')

    await new Promise((r) => setTimeout(r, 0))

    expect(req).toHaveBeenCalled()
    expect(globalThis.__lastNotification).toEqual({
      title: 'Later',
      opts: { body: 'LaterBody' },
    })
  })
})
