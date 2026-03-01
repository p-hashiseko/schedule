<script setup lang="ts">
// レスポンスの型定義
interface BackendResponse {
  message: string
}

const displayMessage = ref<string>('')
const isLoading = ref(false)
const errorLog = ref<string>('')

async function connectToBackend() {
  isLoading.value = true
  errorLog.value = ''
  displayMessage.value = ''

  try {
    // APIを呼び出し
    const response = await $fetch<BackendResponse>('/api/code')

    if (response && response.message) {
      displayMessage.value = response.message
    }
  } catch (err: unknown) {
    const error = err as { statusMessage?: string; message?: string }
    console.error('Fetch error:', error)
    errorLog.value = `接続エラー: ${error.statusMessage || error.message || 'サーバーが応答していません'}`
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="app-container">
    <div class="card">
      <h1>スケジュールアプリです。</h1>

      <div class="button-section">
        <button :disabled="isLoading" class="connect-button" @click="connectToBackend">
          {{ isLoading ? '接続中...' : 'コードを表示する' }}
        </button>
      </div>

      <div v-if="errorLog" class="error-message">
        {{ errorLog }}
      </div>

      <transition name="fade">
        <div v-if="displayMessage" class="result-area">
          <p class="status-badge">SUCCESS</p>
          <div class="message-content">
            {{ displayMessage }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
  max-width: 500px;
}

h1 {
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 800;
}

.button-section {
  margin-bottom: 2rem;
}

.connect-button {
  background-color: #00dc82;
  color: #002e3b;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.connect-button:hover:not(:disabled) {
  background-color: #00c170;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 220, 130, 0.4);
}

.connect-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  background: #fff5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #feb2b2;
}

.result-area {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  position: relative;
}

.status-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #00dc82;
  color: #002e3b;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 20px;
}

.message-content {
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 500;
}

/* アニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
