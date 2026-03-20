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

/**
 * フォームフィールドコンポーネント
 *
 * ラベル・入力欄・エラーメッセージ・補足テキストをまとめた汎用フォームフィールド。
 *
 * @example
 * <FormField
 *   id="email"
 *   v-model="email"
 *   label="メールアドレス"
 *   type="email"
 *   placeholder="example@example.com"
 *   :required="true"
 *   :error-message="errors.email"
 *   helper-text="登録済みのメールアドレスを入力してください"
 * />
 */
interface Props {
  /** input 要素の id（label の for 属性にも使用） */
  id?: string
  /** フィールドのラベルテキスト */
  label?: string
  /** v-model バインディング値 */
  modelValue?: string | number
  /** input の type 属性（text / password / email など） */
  type?: string
  /** input のプレースホルダー */
  placeholder?: string
  /** 入力を無効化するか */
  disabled?: boolean
  /** 必須フィールドかどうか（true の場合ラベルに * を表示） */
  required?: boolean
  /** バリデーションエラーメッセージ（空文字の場合は非表示） */
  errorMessage?: string
  /** 補足テキスト（errorMessage が空の場合のみ表示） */
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
