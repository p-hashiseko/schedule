import { z } from 'zod'

/**
 * ログインスキーマ
 */
export const loginSchema = z.object({
  email: z.string().email('メールアドレスの形式が正しくありません'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください')
})

/**
 * ユーザー登録スキーマ
 */
export const registerSchema = z.object({
  email: z.string().email('メールアドレスの形式が正しくありません'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
    .regex(/[a-z]/, 'パスワードには小文字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  name: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内で入力してください')
})

/**
 * パスワード変更スキーマ
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '現在のパスワードを入力してください'),
    newPassword: z
      .string()
      .min(8, '新しいパスワードは8文字以上で入力してください')
      .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
      .regex(/[a-z]/, 'パスワードには小文字を含めてください')
      .regex(/[0-9]/, 'パスワードには数字を含めてください'),
    confirmPassword: z.string()
  })
  .refine(
    (data: { newPassword: string; confirmPassword: string }) =>
      data.newPassword === data.confirmPassword,
    {
      message: 'パスワードが一致しません',
      path: ['confirmPassword']
    }
  )

/**
 * プロフィール更新スキーマ
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, '名前は必須です')
    .max(50, '名前は50文字以内で入力してください')
    .optional(),
  avatar: z.string().url('URLの形式が正しくありません').optional()
})
