import { SignJWT, jwtVerify } from 'jose'

const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

// jose expects a KeyLike. For symmetric keys, use a Uint8Array from secret.
function getKey() {
  return new TextEncoder().encode(SECRET)
}

export async function signToken(payload: Record<string, unknown>, ttlSeconds = 60 * 60 * 24) {
  const alg = 'HS256'
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + ttlSeconds

  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(getKey())

  return jwt
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getKey(), {
    // allow default options; jose will validate exp/iat automatically
  })
  return payload as Record<string, unknown>
}
