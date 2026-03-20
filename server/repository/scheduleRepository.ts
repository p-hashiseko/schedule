import type { Schedule, CreateScheduleInput } from '~~/shared/types/schedule'

// モックデータ（実際はSupabase/Prismaを使用）
const schedules: Schedule[] = [
  {
    id: '1',
    title: 'チーム会議',
    date: '2026-03-25',
    time: '10:00',
    description: '月次レビュー',
    createdAt: '2026-03-20T00:00:00Z',
    updatedAt: '2026-03-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'プロジェクト打ち合わせ',
    date: '2026-03-27',
    time: '14:00',
    description: 'スケジュールアプリの設計レビュー',
    createdAt: '2026-03-20T00:00:00Z',
    updatedAt: '2026-03-20T00:00:00Z'
  }
]

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ScheduleRepository {
  /**
   * 全スケジュール取得
   */
  static async findAll(): Promise<Schedule[]> {
    // TODO: 実際のDB操作
    // return await prisma.schedule.findMany()
    return [...schedules]
  }

  /**
   * IDでスケジュール取得
   */
  static async findById(id: string): Promise<Schedule | null> {
    // TODO: 実際のDB操作
    // return await prisma.schedule.findUnique({ where: { id } })
    return schedules.find((s) => s.id === id) || null
  }

  /**
   * 日付でスケジュール取得
   */
  static async findByDate(date: string): Promise<Schedule[]> {
    // TODO: 実際のDB操作
    // return await prisma.schedule.findMany({ where: { date } })
    return schedules.filter((s) => s.date === date)
  }

  /**
   * 期間でスケジュール取得
   */
  static async findByDateRange(startDate: string, endDate: string): Promise<Schedule[]> {
    // TODO: 実際のDB操作
    return schedules.filter((s) => s.date >= startDate && s.date <= endDate)
  }

  /**
   * スケジュール作成
   */
  static async create(data: CreateScheduleInput): Promise<Schedule> {
    // TODO: 実際のDB操作
    // return await prisma.schedule.create({ data })
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    schedules.push(newSchedule)
    return newSchedule
  }

  /**
   * スケジュール更新
   */
  static async update(id: string, data: Partial<CreateScheduleInput>): Promise<Schedule> {
    // TODO: 実際のDB操作
    // return await prisma.schedule.update({ where: { id }, data })
    const index = schedules.findIndex((s) => s.id === id)
    if (index === -1) {
      throw new Error('スケジュールが見つかりません')
    }

    const current = schedules[index]!
    schedules[index] = {
      id: current.id,
      title: data.title ?? current.title,
      date: data.date ?? current.date,
      time: data.time ?? current.time,
      description: data.description ?? current.description,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString()
    }
    return schedules[index]!
  }

  /**
   * スケジュール削除
   */
  static async delete(id: string): Promise<boolean> {
    // TODO: 実際のDB操作
    // await prisma.schedule.delete({ where: { id } })
    const index = schedules.findIndex((s) => s.id === id)
    if (index === -1) {
      return false
    }
    schedules.splice(index, 1)
    return true
  }
}
