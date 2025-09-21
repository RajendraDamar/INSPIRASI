import type { NextApiRequest, NextApiResponse } from 'next'
import { signToken } from '../../../lib/jwt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  // Accept any payload for now (mock authentication)
  const { name } = req.body || { name: 'anon' }

  // In a real app you'd verify credentials and generate a signed token.
  // Here we mock a user id, include it in the token payload, and set it as an httpOnly cookie.
  const id = String(Date.now());
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
