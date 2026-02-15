<script setup>
defineProps({
  param: { type: Object, required: true },
})
</script>

<template>
  <div class="rounded bg-gray-100 dark:bg-gray-700 p-3 text-xs text-gray-700 dark:text-gray-300">
    <!-- Row 1: name = value -->
    <div class="flex items-center justify-between gap-2 mb-2">
      <label class="control-label flex-1">
        <input
          :value="param.label"
          type="text"
          readonly
          class="control-input w-full"
        >
      </label>
      <label class="control-label">
        <input
          v-model.number="param.value"
          type="number"
          :min="param.min"
          :max="param.max"
          :step="param.step"
          class="control-input w-20"
        >
      </label>
    </div>

    <!-- Row 2: min [---slider---] max  step -->
    <div class="flex items-center gap-2 mb-1">
      <span class="control-label w-10 text-right">{{ param.min }}</span>
      <input
        v-model.number="param.value"
        type="range"
        :min="param.min"
        :max="param.max"
        :step="param.step"
        class="flex-1"
      >
      <span class="control-label w-10">{{ param.max }}</span>
    </div>

    <!-- Row 3: min/max/step editors -->
    <div class="flex items-end gap-2">
      <label class="control-label">
        min
        <input
          v-model.number="param.min"
          type="number"
          :max="param.max"
          :step="param.step"
          class="control-input w-16"
        >
      </label>
      <label class="control-label">
        max
        <input
          v-model.number="param.max"
          type="number"
          :min="param.min"
          :step="param.step"
          class="control-input w-16"
        >
      </label>
      <label class="control-label">
        step
        <input
          v-model.number="param.step"
          type="number"
          :min="0"
          :step="0.01"
          class="control-input w-16"
        >
      </label>
    </div>
  </div>
</template>
