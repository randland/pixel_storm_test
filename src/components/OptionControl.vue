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
      <select
        :value="param.value"
        class="control-input w-20 text-right"
        @change="param.value = $event.target.value"
      >
        <option
          v-for="option in param.options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
