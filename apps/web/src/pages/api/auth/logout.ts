import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const isProd = process.env.NODE_ENV === 'production'
  // Clear cookie by setting Max-Age=0 and an expired Expires date. Keep SameSite consistent with login.
  const cookie = `auth_token=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isProd ? '; Secure' : ''}`
  res.setHeader('Set-Cookie', cookie)
  return res.status(200).json({ ok: true })
}
