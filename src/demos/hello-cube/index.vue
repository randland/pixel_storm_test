<script setup>
import { TresCanvas } from '@tresjs/core'
import SliderControl from '@/components/SliderControl.vue'
import Experience from './Experience.vue'
import useControls from './useControls'

const { ambientLightIntensity } = useControls();
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
        v-model="ambientLightIntensity"
        label="Ambient Light Intensity"
        :min="0"
        :max="1"
        :step="0.01"
      />
    </div>
  </div>
</template>
