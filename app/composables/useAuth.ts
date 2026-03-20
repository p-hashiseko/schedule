import { ref } from 'vue'
import type { User } from '~~/shared/types/auth'

export const useAuth = () => {
  const user = ref<User | null>(null)

  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ログイン（APIコール）
  const login = async (username: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<{ success: boolean; data: { user: User; token: string } }>(
        '/api/auth/login',
        {
          method: 'POST',
          body: { username, password }
        }
      )

      user.value = response.data.user
      isAuthenticated.value = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'ログインに失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // ログアウト
  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      // await $fetch('/api/auth/logout', { method: 'POST' })
      await new Promise((resolve) => setTimeout(resolve, 500)) // モック遅延

      user.value = null
      isAuthenticated.value = false
    } catch (e) {
      error.value = 'ログアウトに失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  // ユーザー情報を取得
  const fetchUser = async () => {
    loading.value = true
    error.value = null
    try {
      // TODO: 実際のAPIコール
      // const response = await $fetch('/api/auth/me')
      // user.value = response
      await new Promise((resolve) => setTimeout(resolve, 500)) // モック遅延
    } catch (e) {
      error.value = 'ユーザー情報の取得に失敗しました'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    fetchUser
  }
}
