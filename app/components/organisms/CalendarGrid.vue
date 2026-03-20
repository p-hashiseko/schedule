<template>
  <div class="calendar-grid">
    <div class="calendar-header">
      <Button variant="secondary" @click="previousMonth">←</Button>
      <h2 class="calendar-title">{{ currentMonth }}</h2>
      <Button variant="secondary" @click="nextMonth">→</Button>
    </div>
    <div class="calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>
    <div class="calendar-days">
      <div
        v-for="day in days"
        :key="day.date"
        :class="['calendar-day', { 'is-today': day.isToday, 'is-other-month': day.isOtherMonth }]"
        @click="handleDayClick(day)"
      >
        <span class="day-number">{{ day.number }}</span>
        <Badge v-if="day.hasEvent" color="blue">イベント</Badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '../atoms/Button.vue'
import Badge from '../atoms/Badge.vue'

interface CalendarDay {
  date: string
  number: number
  isToday: boolean
  isOtherMonth: boolean
  hasEvent: boolean
}

const currentDate = ref(new Date())
const weekdays = ['日', '月', '火', '水', '木', '金', '土']

const currentMonth = computed(() => {
  return `${currentDate.value.getFullYear()}年${currentDate.value.getMonth() + 1}月`
})

// モックデータ
const days = ref<CalendarDay[]>(
  Array.from({ length: 35 }, (_, i) => ({
    date: `2026-03-${i + 1}`,
    number: i + 1,
    isToday: i === 19,
    isOtherMonth: i > 30,
    hasEvent: i % 7 === 0
  }))
)

const emit = defineEmits<{
  dayClick: [day: CalendarDay]
}>()

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const handleDayClick = (day: CalendarDay) => {
  emit('dayClick', day)
}
</script>

<style scoped>
.calendar-grid {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.weekday {
  text-align: center;
  font-weight: 500;
  color: #6b7280;
  padding: 0.5rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: #f3f4f6;
}

.calendar-day.is-today {
  background-color: #dbeafe;
  border-color: #3b82f6;
}

.calendar-day.is-other-month {
  opacity: 0.4;
}

.day-number {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}
</style>
