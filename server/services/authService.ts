import type { User } from '~~/shared/types/auth'
import { UserRepository } from '../repository/userRepository'
import { hashPassword, verifyPassword, generateToken } from '../utils/crypto'

interface _UserWithPassword {
  id: string
  email: string
  name: string
  passwordHash: string
  avatar?: string
}

interface LoginResult {
  user: User
  token: string
  session: {
    userId: string
    expiresAt: Date
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
  /**
   * ログイン処理
   */
  static async login(email: string, password: string): Promise<LoginResult> {
    try {
      // ユーザー検索
      const user: _UserWithPassword | null = await UserRepository.findByEmail(email)
      if (!user) {
        throw new Error('メールアドレスまたはパスワードが正しくありません')
      }

      // パスワード検証
      const isValid = await verifyPassword(password, user.passwordHash)
      if (!isValid) {
        throw new Error('メールアドレスまたはパスワードが正しくありません')
      }

      // トークン生成
      const token = generateToken(user.id)

      // セッション情報
      const session = {
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7日間
      }

      // パスワードハッシュを除外
      const { passwordHash, ...userWithoutPassword } = user

      return {
        user: userWithoutPassword,
        token,
        session
      }
    } catch (error) {
      console.error('ログインエラー:', error)
      throw error
    }
  }

  /**
   * ユーザー登録
   */
  static async register(email: string, password: string, name: string): Promise<User> {
    try {
      // 既存ユーザーチェック
      const existingUser = await UserRepository.findByEmail(email)
      if (existingUser) {
        throw new Error('このメールアドレスは既に登録されています')
      }

      // パスワードハッシュ化
      const passwordHash = await hashPassword(password)

      // ユーザー作成
      const user = await UserRepository.create({
        email,
        passwordHash,
        name
      })

      const { passwordHash: _, ...userWithoutPassword } = user
      return userWithoutPassword
    } catch (error) {
      console.error('登録エラー:', error)
      throw error
    }
  }

  /**
   * ユーザー情報取得
   */
  static async getUserById(id: string): Promise<User | null> {
    try {
      const user = await UserRepository.findById(id)
      if (!user) {
        return null
      }

      const { passwordHash, ...userWithoutPassword } = user
      return userWithoutPassword
    } catch (error) {
      console.error('ユーザー取得エラー:', error)
      throw error
    }
  }
}
