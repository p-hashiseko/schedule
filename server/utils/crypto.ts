import { createHash, randomBytes } from 'crypto'

/**
 * パスワードをハッシュ化
 * 本番環境ではbcryptを使用することを推奨
 */
export async function hashPassword(password: string): Promise<string> {
  // TODO: bcryptを使用
  // import bcrypt from 'bcrypt'
  // return await bcrypt.hash(password, 10)

  // モック実装
  const salt = randomBytes(16).toString('hex')
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex')
  return `${salt}:${hash}`
}

/**
 * パスワードを検証
 */
export async function verifyPassword(_password: string, _hashedPassword: string): Promise<boolean> {
  // TODO: bcryptを使用
  // import bcrypt from 'bcrypt'
  // return await bcrypt.compare(password, hashedPassword)

  // モック実装（常にtrueを返す）
  return true
}

/**
 * JWTトークンを生成
 */
export function generateToken(userId: string): string {
  // TODO: jwtを使用
  // import jwt from 'jsonwebtoken'
  // return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

  // モック実装
  const payload = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })
  ).toString('base64')
  return `mock.${payload}.signature`
}

/**
 * JWTトークンを検証
 */
export function verifyToken(token: string): { userId: string } {
  // TODO: jwtを使用
  // import jwt from 'jsonwebtoken'
  // return jwt.verify(token, process.env.JWT_SECRET) as { userId: string }

  // モック実装
  const parts = token.split('.')
  if (parts.length !== 3 || !parts[1]) {
    throw new Error('Invalid token')
  }

  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
  return { userId: payload.userId }
}

/**
 * ランダムな文字列を生成
 */
export function generateRandomString(length: number = 32): string {
  return randomBytes(length).toString('hex')
}
