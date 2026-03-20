import type { Schedule, CreateScheduleInput } from '~~/shared/types/schedule'
import { ScheduleRepository } from '../repository/scheduleRepository'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ScheduleService {
  /**
   * 全スケジュールを取得
   */
  static async getAllSchedules(): Promise<Schedule[]> {
    try {
      const schedules = await ScheduleRepository.findAll()

      // ビジネスロジック: 日付順でソート
      return schedules.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    } catch (error) {
      console.error('スケジュール取得エラー:', error)
      throw new Error('スケジュールの取得に失敗しました')
    }
  }

  /**
   * IDでスケジュールを取得
   */
  static async getScheduleById(id: string): Promise<Schedule | null> {
    try {
      return await ScheduleRepository.findById(id)
    } catch (error) {
      console.error('スケジュール取得エラー:', error)
      throw new Error('スケジュールの取得に失敗しました')
    }
  }

  /**
   * スケジュールを作成
   */
  static async createSchedule(data: CreateScheduleInput): Promise<Schedule> {
    try {
      // ビジネスロジック: 重複チェックなど
      const existingSchedules = await ScheduleRepository.findByDate(data.date)
      const hasConflict = existingSchedules.some((schedule) => {
        return schedule.time === data.time
      })

      if (hasConflict) {
        throw new Error('指定の日時には既にスケジュールが登録されています')
      }

      return await ScheduleRepository.create(data)
    } catch (error) {
      console.error('スケジュール作成エラー:', error)
      throw error
    }
  }

  /**
   * スケジュールを更新
   */
  static async updateSchedule(id: string, data: Partial<CreateScheduleInput>): Promise<Schedule> {
    try {
      const existing = await ScheduleRepository.findById(id)
      if (!existing) {
        throw new Error('スケジュールが見つかりません')
      }

      return await ScheduleRepository.update(id, data)
    } catch (error) {
      console.error('スケジュール更新エラー:', error)
      throw error
    }
  }

  /**
   * スケジュールを削除
   */
  static async deleteSchedule(id: string): Promise<boolean> {
    try {
      return await ScheduleRepository.delete(id)
    } catch (error) {
      console.error('スケジュール削除エラー:', error)
      throw new Error('スケジュールの削除に失敗しました')
    }
  }

  /**
   * 特定期間のスケジュールを取得
   */
  static async getSchedulesByDateRange(startDate: string, endDate: string): Promise<Schedule[]> {
    try {
      return await ScheduleRepository.findByDateRange(startDate, endDate)
    } catch (error) {
      console.error('スケジュール取得エラー:', error)
      throw new Error('スケジュールの取得に失敗しました')
    }
  }
}
