<script setup>
import { TresCanvas } from '@tresjs/core'
import SliderControl from '@/components/SliderControl.vue'
import Experience from './Experience.vue'
import useControls from './useControls'

const { ambientLight } = useControls()
</script>

<template>
  <div class="flex h-screen">
    <div class="flex-1">
      <TresCanvas>
        <Experience />
      </TresCanvas>
    </div>
    <div class="w-64 p-4">
      <SliderControl
        :param="ambientLight"
      />
    </div>
  </div>
</template>
