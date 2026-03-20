import { z } from 'zod'
import { AuthService } from '../../services/authService'
import { loginSchema } from '~~/shared/schemas/authSchema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Zodでバリデーション
    const validatedData = loginSchema.parse(body)

    // 認証処理
    const result = await AuthService.login(validatedData.email, validatedData.password)

    // セッション設定
    // await setUserSession(event, result.session)

    return {
      success: true,
      data: {
        user: result.user,
        token: result.token
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'バリデーションエラー',
        data: error.issues
      })
    }

    throw createError({
      statusCode: 401,
      message: '認証に失敗しました'
    })
  }
})
