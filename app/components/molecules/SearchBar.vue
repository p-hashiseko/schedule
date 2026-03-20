<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="handleSearch"
    />
    <button class="search-button" @click="handleSubmit">🔍</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '検索...',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
}>()

const searchQuery = ref(props.modelValue)

const handleSearch = () => {
  emit('update:modelValue', searchQuery.value)
}

const handleSubmit = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #2563eb;
}
</style>
