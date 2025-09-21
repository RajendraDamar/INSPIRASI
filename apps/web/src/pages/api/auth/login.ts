import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  // Accept any payload for now (mock authentication)
  const { name } = req.body || { name: 'anon' }

  // In a real app you'd verify credentials and generate a signed token.
  // Here we set a mock token value and mark it httpOnly and Secure.
  const token = 'mock-server-token'

  // cookie attributes
  const cookieOptions = [
    `auth_token=${token}`,
    `Path=/`,
    `HttpOnly`,
    // In production, set Secure and SameSite appropriately. For local dev
    // on http, Secure may prevent the cookie from being set; detect NODE_ENV.
    process.env.NODE_ENV === 'production' ? 'Secure' : 'SameSite=Lax',
    `Max-Age=${60 * 60 * 24}`,
  ]

  res.setHeader('Set-Cookie', cookieOptions.join('; '))

  return res.status(200).json({ ok: true, name })
}
