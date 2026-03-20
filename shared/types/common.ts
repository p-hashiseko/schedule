/**
 * 共通APIレスポンス型
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: Array<{
    path: string[]
    message: string
  }>
}

/**
 * ページネーションパラメータ
 */
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * ページネーション付きレスポンス
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * エラーレスポンス
 */
export interface ErrorResponse {
  success: false
  message: string
  statusCode?: number
  errors?: Array<{
    path: string[]
    message: string
  }>
}
