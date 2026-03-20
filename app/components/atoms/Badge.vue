<template>
  <span :class="['badge', `badge-${color}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeColor = 'blue' | 'green' | 'red' | 'yellow' | 'gray'

interface Props {
  color?: BadgeColor
}

withDefaults(defineProps<Props>(), {
  color: 'blue'
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-blue {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-green {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-red {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-yellow {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-gray {
  background-color: #f3f4f6;
  color: #374151;
}
</style>
