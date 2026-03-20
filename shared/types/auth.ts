import type { z } from 'zod'
import type {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  updateProfileSchema
} from '../schemas/authSchema'

/**
 * Zodスキーマから型を抽出
 */
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

/**
 * ユーザー型
 */
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

/**
 * 認証セッション型
 */
export interface AuthSession {
  userId: string
  expiresAt: Date
}

/**
 * API レスポンス型
 */
export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
}

export interface UserResponse {
  success: boolean
  data: User
}

export interface AuthErrorResponse {
  success: false
  message: string
  errors?: Array<{
    path: string[]
    message: string
  }>
}
