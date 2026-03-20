<template>
  <div class="form-field">
    <label v-if="label" :for="id" class="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <Input
      :id="id"
      :model-value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="!!errorMessage"
      @update:model-value="handleUpdate"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
  </div>
</template>

<script setup lang="ts">
import Input from '../atoms/Input.vue'

interface Props {
  id?: string
  label?: string
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  id: '',
  label: '',
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  required: false,
  errorMessage: '',
  helperText: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleUpdate = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #374151;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.error-message {
  font-size: 0.875rem;
  color: #ef4444;
}

.helper-text {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
