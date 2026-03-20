import { z } from 'zod'

/**
 * スケジュール作成スキーマ
 */
export const createScheduleSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付の形式が正しくありません (YYYY-MM-DD)'),
  time: z.string().regex(/^\d{2}:\d{2}$/, '時刻の形式が正しくありません (HH:mm)'),
  description: z.string().max(500, '説明は500文字以内で入力してください').optional().default('')
})

/**
 * スケジュール更新スキーマ
 */
export const updateScheduleSchema = createScheduleSchema.partial()

/**
 * スケジュールスキーマ（DB格納時）
 */
export const scheduleSchema = createScheduleSchema.extend({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

/**
 * スケジュール検索スキーマ
 */
export const scheduleQuerySchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  keyword: z.string().optional()
})
