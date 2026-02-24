<script setup>
import BooleanControl from '@/components/BooleanControl.vue'
import ColorControl from '@/components/ColorControl.vue'
import OptionControl from '@/components/OptionControl.vue'
import SliderControl from '@/components/SliderControl.vue'

const controlMap = {
  boolean: BooleanControl,
  color: ColorControl,
  number: SliderControl,
  option: OptionControl,
}

defineProps({
  controls: { type: Object, required: true },
})
</script>

<template>
  <div class="w-80 p-4 overflow-y-auto">
    <component
      :is="controlMap[param.type]"
      v-for="(param, key) in controls"
      :key="key"
      :param="param"
      class="mb-2"
    />
  </div>
</template>
