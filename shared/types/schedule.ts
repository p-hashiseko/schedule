import type { z } from 'zod'
import type {
  scheduleSchema,
  createScheduleSchema,
  updateScheduleSchema,
  scheduleQuerySchema
} from '../schemas/scheduleSchema'

/**
 * Zodスキーマから型を抽出
 */
export type Schedule = z.infer<typeof scheduleSchema>
export type CreateScheduleInput = z.infer<typeof createScheduleSchema>
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>
export type ScheduleQuery = z.infer<typeof scheduleQuerySchema>

/**
 * API レスポンス型
 */
export interface ScheduleListResponse {
  success: boolean
  data: Schedule[]
}

export interface ScheduleResponse {
  success: boolean
  data: Schedule
}

export interface ScheduleErrorResponse {
  success: false
  message: string
  errors?: Array<{
    path: string[]
    message: string
  }>
}
