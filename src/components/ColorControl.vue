<script setup>
defineProps({
  color: { type: Object, required: true }
})
</script>

<template>
  <div class="rounded bg-gray-100 dark:bg-gray-700 p-3 text-xs text-gray-700 dark:text-gray-300">
    <div class="flex items-center gap-2">
      <label class="control-label flex-1">
        <input
          :value="color.label"
          type="text"
          readonly
          class="control-input w-full"
        >
      </label>
      <input
        :value="color.hex"
        type="text"
        maxlength="7"
        class="control-input w-20 text-right font-mono"
        @change="color.hex = $event.target.value"
      >
      <input
        type="color"
        :value="color.hex"
        class="h-7 w-7 cursor-pointer rounded border-0 p-0"
        @input="color.hex = $event.target.value"
      >
    </div>
  </div>
</template>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>
