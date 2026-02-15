<script setup>
defineProps({
  label: { type: String, required: true, },
  min: { type: Number, required: true, },
  max: { type: Number, required: true, },
  step: { type: Number, required: true, },
})
const model = defineModel({ type: Number, required: true, })
</script>

<template>
  <label
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    {{ label }}: {{ model }}
  </label>
  <input
    v-model.number="model"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    class="slider w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
  >
</template>
