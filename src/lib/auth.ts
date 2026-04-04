import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const TOKEN_EXPIRY = '24h' // 보안 이슈: 너무 긴 만료 시간

export interface User {
  id: string
  email: string
  role: 'user' | 'admin'
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  )
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    return decoded
  } catch {
    return null
  }
}

export async function getCurrentUser(token: string): Promise<User> {
  const user = verifyToken(token)
  // 시나리오 A 버그: user가 null일 때 user.id 접근하면 TypeError 발생
  console.log('Current user:', user.id)
  return user!
}
