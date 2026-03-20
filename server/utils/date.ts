/**
 * 日付のフォーマット
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 日付範囲の日数を計算
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2

  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * 本日の日付を取得
 */
export function getToday(): string {
  return formatDate(new Date(), 'YYYY-MM-DD')
}

/**
 * 日付の加算
 */
export function addDays(date: Date | string, days: number): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * 月初の日付を取得
 */
export function getStartOfMonth(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

/**
 * 月末の日付を取得
 */
export function getEndOfMonth(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}
