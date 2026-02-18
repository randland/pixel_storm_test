<script setup>
import SliderControl from '@/components/SliderControl.vue'
import ColorControl from '@/components/ColorControl.vue'

const controlMap = {
  number: SliderControl,
  color: ColorControl,
}

defineProps({
  controls: { type: Object, required: true },
})
</script>

<template>
  <div class="w-80 p-4">
    <component
      :is="controlMap[param.type]"
      v-for="(param, key) in controls"
      :key="key"
      :param="param"
      class="mb-2"
    />
  </div>
</template>
