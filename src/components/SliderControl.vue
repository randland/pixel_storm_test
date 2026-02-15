<script setup>
defineProps({
  param: { type: Object, required: true },
})
</script>

<template>
  <label
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    {{ param.label }}: {{ param.value }}
    <input
      v-model.number="param.value"
      type="range"
      :min="param.min"
      :max="param.max"
      :step="param.step"
      class="slider w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    >
  </label>
</template>
