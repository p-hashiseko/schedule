import { ref } from 'vue'
import type { User } from '~~/shared/types/auth'

export const useAuth = () => {
  const user = ref<User | null>(null)

  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ログイン（モック実装：username="username", password="password"でログイン可）
  const login = async (username: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // モック遅延

      // 簡易認証チェック
      if (username === 'username' && password === 'password') {
        user.value = {
          id: '1',
          email: 'user@example.com',
          name: 'テストユーザー'
        }
        isAuthenticated.value = true
      } else {
        throw new Error('ユーザー名またはパスワードが正しくありません')
      }
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
