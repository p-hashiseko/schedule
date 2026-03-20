import { z } from 'zod'
import { createScheduleSchema } from '~~/shared/schemas/scheduleSchema'
import { ScheduleService } from '../../services/scheduleService'

export default defineEventHandler(async (event) => {
  try {
    // リクエストボディを取得
    const body = await readBody(event)

    // Zodでバリデーション
    const validatedData = createScheduleSchema.parse(body)

    // ビジネスロジック層へ
    const newSchedule = await ScheduleService.createSchedule(validatedData)

    return {
      success: true,
      data: newSchedule
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
      statusCode: 500,
      message: 'スケジュールの作成に失敗しました'
    })
  }
})
