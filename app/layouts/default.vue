<template>
  <div class="default-layout">
    <header class="header">
      <div class="header-container">
        <NuxtLink to="/" class="logo"> スケジュール管理 </NuxtLink>

        <nav class="nav">
          <NuxtLink to="/" class="nav-link">ホーム</NuxtLink>
          <NuxtLink to="/schedules" class="nav-link">スケジュール</NuxtLink>
        </nav>

        <div class="user-menu">
          <template v-if="isAuthenticated">
            <span class="user-name">{{ user?.name }}</span>
            <Button variant="secondary" @click="handleLogout"> ログアウト </Button>
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <Button variant="primary">ログイン</Button>
            </NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>&copy; 2026 スケジュール管理アプリ</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../components/atoms/Button.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (e) {
    console.error('ログアウトエラー:', e)
  }
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
  color: #374151;
}

.main {
  flex: 1;
  background-color: #f9fafb;
}

.footer {
  background-color: #111827;
  color: white;
  padding: 2rem;
  text-align: center;
}
</style>
