<script setup>
defineProps({
  param: { type: Object, required: true }
})
</script>

<template>
  <div class="rounded bg-gray-100 dark:bg-gray-700 p-3 text-xs text-gray-700 dark:text-gray-300">
    <div class="flex items-center gap-2">
      <label class="control-label flex-1">
        <input
          :value="param.label"
          type="text"
          readonly
          class="control-input w-full"
        >
      </label>
      <input
        :value="param.value"
        type="checkbox"
        @change="param.value = $event.target.value"
      >
    </div>
  </div>
</template>
