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
          class="control-input w-20 text-right"
        >
      </label>
    </div>

    <!-- Row 2: min [---slider---] max  step -->
    <div class="flex items-center gap-2 mb-1">
      <input
        v-model.number="param.min"
        type="number"
        :max="param.max"
        :step="param.step"
        class="control-inline w-10 text-right"
      >
      <input
        v-model.number="param.value"
        type="range"
        :min="param.min"
        :max="param.max"
        :step="param.step"
        class="flex-1"
      >
      <input
        v-model.number="param.max"
        type="number"
        :min="param.min"
        :step="param.step"
        class="control-inline w-10"
      >
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
