<template>
  <div class="page-container">
    <h1 class="page-title">スケジュール管理</h1>

    <!-- 検索バー -->
    <div class="search-section">
      <SearchBar v-model="searchQuery" @search="handleSearch" />
    </div>

    <!-- カレンダー -->
    <div class="calendar-section">
      <CalendarGrid @day-click="handleDayClick" />
    </div>

    <!-- スケジュール一覧 -->
    <div class="schedule-list">
      <h2>スケジュール一覧</h2>
      <div v-if="loading" class="loading">読み込み中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="schedules.length === 0" class="empty">スケジュールがありません</div>
      <div v-else class="schedule-items">
        <div v-for="schedule in schedules" :key="schedule.id" class="schedule-item">
          <div class="schedule-header">
            <h3>{{ schedule.title }}</h3>
            <Badge color="blue">{{ schedule.date }}</Badge>
          </div>
          <p class="schedule-time">{{ schedule.time }}</p>
          <p class="schedule-description">{{ schedule.description }}</p>
        </div>
      </div>
    </div>

    <!-- スケジュール作成ボタン -->
    <div class="floating-action">
      <Button variant="primary" @click="showForm = true"> + 新規作成 </Button>
    </div>

    <!-- スケジュールフォーム（モーダル） -->
    <div v-if="showForm" class="modal-overlay" @click="showForm = false">
      <div class="modal-content" @click.stop>
        <ScheduleForm @submit="handleSubmit" @cancel="showForm = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '../components/molecules/SearchBar.vue'
import CalendarGrid from '../components/organisms/CalendarGrid.vue'
import ScheduleForm from '../components/organisms/ScheduleForm.vue'
import Badge from '../components/atoms/Badge.vue'
import Button from '../components/atoms/Button.vue'
import { useSchedule } from '../composables/useSchedule'

const { schedules, loading, error, createSchedule } = useSchedule()

const searchQuery = ref('')
const showForm = ref(false)

const handleSearch = (query: string) => {
  console.log('検索:', query)
  // TODO: 検索処理の実装
}

const handleDayClick = (day: { date: string; number: number }) => {
  console.log('日付クリック:', day)
  // TODO: 日付選択時の処理
}

const handleSubmit = async (data: {
  title: string
  date: string
  time: string
  description: string
}) => {
  try {
    await createSchedule(data)
    showForm.value = false
  } catch (e) {
    console.error('作成エラー:', e)
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #111827;
}

.search-section {
  margin-bottom: 2rem;
}

.calendar-section {
  margin-bottom: 2rem;
}

.schedule-list {
  margin-top: 2rem;
}

.schedule-list h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.loading,
.error,
.empty {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.error {
  color: #ef4444;
}

.schedule-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: box-shadow 0.2s;
}

.schedule-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.schedule-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.schedule-time {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.schedule-description {
  color: #374151;
}

.floating-action {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}
</style>
