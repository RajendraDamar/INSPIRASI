import type { NextApiRequest, NextApiResponse } from 'next'
import { signToken } from '../../../lib/jwt'
import { randomUUID, randomBytes } from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  // Accept any payload for now (mock authentication)
  const { name } = req.body || { name: 'anon' }

  // In a real app you'd verify credentials against a user store and persist/fetch the user.
  // For now generate a cryptographically strong UUID server-side to avoid predictable IDs.
  let id: string;
  if (typeof randomUUID === 'function') {
    id = randomUUID();
  } else {
    // fallback: generate a RFC4122 v4 style UUID using crypto random bytes
    const b = randomBytes(16);
    // Per RFC4122: set version and variant bits
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
  id = [...b].map((n) => (n.toString(16).padStart(2, '0'))).join('').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }
  const token = await signToken({ id, name, role: 'user' })

  const isProd = process.env.NODE_ENV === 'production'
  const maxAge = 60 * 60 * 24 // 24 hours

  const cookieOptions = [
    `auth_token=${token}`,
    `Path=/`,
    `HttpOnly`,
    isProd ? 'Secure; SameSite=Strict' : 'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ]

  res.setHeader('Set-Cookie', cookieOptions.join('; '))

  return res.status(200).json({ ok: true, user: { id, name } })
}
