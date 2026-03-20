<template>
  <form class="schedule-form" @submit.prevent="handleSubmit">
    <h2 class="form-title">スケジュール登録</h2>

    <FormField
      id="title"
      v-model="formData.title"
      label="タイトル"
      placeholder="会議、イベント名など"
      :required="true"
      :error-message="errors.title"
    />

    <FormField
      id="date"
      v-model="formData.date"
      label="日付"
      type="date"
      :required="true"
      :error-message="errors.date"
    />

    <FormField
      id="time"
      v-model="formData.time"
      label="時刻"
      type="time"
      :error-message="errors.time"
    />

    <FormField
      id="description"
      v-model="formData.description"
      label="説明"
      placeholder="詳細な説明を入力"
      helper-text="任意項目です"
    />

    <div class="form-actions">
      <Button type="button" variant="secondary" @click="handleCancel"> キャンセル </Button>
      <Button type="submit" variant="primary"> 登録する </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormField from '../molecules/FormField.vue'
import Button from '../atoms/Button.vue'

interface ScheduleFormData {
  title: string
  date: string
  time: string
  description: string
}

const formData = reactive<ScheduleFormData>({
  title: '',
  date: '',
  time: '',
  description: ''
})

const errors = reactive({
  title: '',
  date: '',
  time: ''
})

const emit = defineEmits<{
  submit: [data: ScheduleFormData]
  cancel: []
}>()

const handleSubmit = () => {
  // バリデーション
  errors.title = formData.title ? '' : 'タイトルは必須です'
  errors.date = formData.date ? '' : '日付は必須です'

  if (!errors.title && !errors.date) {
    emit('submit', { ...formData })
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.schedule-form {
  max-width: 600px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
