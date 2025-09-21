import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '../../../lib/jwt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const token = req.cookies['auth_token']
  if (!token) return res.status(401).json({ ok: false })

  try {
    const payload = await verifyToken(token)
    return res.status(200).json({ ok: true, user: payload })
  } catch (err) {
    return res.status(401).json({ ok: false })
  }
}
