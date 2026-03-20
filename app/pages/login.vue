<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">ログイン</h1>

      <form @submit.prevent="handleLogin">
        <FormField
          id="username"
          v-model="username"
          label="ユーザー名"
          type="text"
          placeholder="username"
          :required="true"
          :error-message="errors.username"
          helper-text="ヒント: username"
        />

        <FormField
          id="password"
          v-model="password"
          label="パスワード"
          type="password"
          placeholder="password"
          :required="true"
          :error-message="errors.password"
          helper-text="ヒント: password"
        />

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <Button type="submit" variant="primary" :disabled="loading" class="login-button">
          {{ loading ? 'ログイン中...' : 'ログイン' }}
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/molecules/FormField.vue'
import Button from '../components/atoms/Button.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, loading, error } = useAuth()

const username = ref('')
const password = ref('')
const errors = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  // バリデーション
  errors.value.username = username.value ? '' : 'ユーザー名を入力してください'
  errors.value.password = password.value ? '' : 'パスワードを入力してください'

  if (!errors.value.username && !errors.value.password) {
    try {
      await login(username.value, password.value)
      router.push('/')
    } catch (e) {
      console.error('ログインエラー:', e)
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #111827;
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #fee2e2;
  color: #991b1b;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.login-button {
  width: 100%;
  margin-top: 1rem;
}
</style>
