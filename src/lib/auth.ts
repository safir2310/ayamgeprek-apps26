import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    console.log('[Auth] Verifying token...')

    if (!token || token.length < 10) {
      console.error('[Auth] Token too short or empty')
      return null
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    console.log('[Auth] Token verified successfully, payload:', { userId: payload.userId, email: payload.email })
    return payload as unknown as JWTPayload
  } catch (error: any) {
    console.error('[Auth] Token verification failed:', {
      name: error.name,
      code: error.code,
      message: error.message
    })

    // Provide specific error messages for common JWT errors
    if (error.name === 'JWTExpired') {
      console.error('[Auth] Token has expired')
      return null
    }

    if (error.name === 'JWSSignatureVerificationFailed') {
      console.error('[Auth] Token signature verification failed - possible secret mismatch')
      return null
    }

    if (error.name === 'JWTInvalid') {
      console.error('[Auth] Invalid token format')
      return null
    }

    console.error('[Auth] Unknown token verification error:', error)
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}
