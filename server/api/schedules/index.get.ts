import { ScheduleService } from '../../services/scheduleService'

export default defineEventHandler(async () => {
  try {
    const schedules = await ScheduleService.getAllSchedules()
    return {
      success: true,
      data: schedules
    }
  } catch {
    throw createError({
      statusCode: 500,
      message: 'スケジュールの取得に失敗しました'
    })
  }
})
