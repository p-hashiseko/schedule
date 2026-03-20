import { ref, computed } from 'vue'
import type { Schedule } from '~~/shared/types/schedule'

export const useSchedule = () => {
  const schedules = ref<Schedule[]>([
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
  ])

  const loading = ref(false)
  const error = ref<string | null>(null)

  // スケジュール一覧を日付順でソート
  const sortedSchedules = computed(() => {
    return [...schedules.value].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  })

  // スケジュールを取得
  const fetchSchedules = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      // const response = await $fetch('/api/schedules')
      // schedules.value = response
      await new Promise((resolve) => setTimeout(resolve, 500)) // モック遅延
    } catch (e) {
      error.value = 'スケジュールの取得に失敗しました'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  // スケジュールを作成
  const createSchedule = async (data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>) => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      // const response = await $fetch('/api/schedules', {
      //   method: 'POST',
      //   body: data
      // })
      const newSchedule: Schedule = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      schedules.value.push(newSchedule)
      return newSchedule
    } catch (e) {
      error.value = 'スケジュールの作成に失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // スケジュールを更新
  const updateSchedule = async (
    id: string,
    data: Partial<Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>>
  ) => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      const index = schedules.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        const current = schedules.value[index]!
        schedules.value[index] = {
          id: current.id,
          title: data.title ?? current.title,
          date: data.date ?? current.date,
          time: data.time ?? current.time,
          description: data.description ?? current.description,
          createdAt: current.createdAt,
          updatedAt: new Date().toISOString()
        }
      }
    } catch (e) {
      error.value = 'スケジュールの更新に失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // スケジュールを削除
  const deleteSchedule = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      schedules.value = schedules.value.filter((s) => s.id !== id)
    } catch (e) {
      error.value = 'スケジュールの削除に失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // 特定の日付のスケジュールを取得
  const getSchedulesByDate = (date: string) => {
    return schedules.value.filter((s) => s.date === date)
  }

  return {
    schedules: sortedSchedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getSchedulesByDate
  }
}
