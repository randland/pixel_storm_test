<script setup>
import { TresCanvas } from '@tresjs/core'
import SliderControl from '@/components/SliderControl.vue'
import ColorControl from '@/components/ColorControl.vue'
import Experience from './Experience.vue'
import useControls from './useControls'

const controls = useControls()
</script>

<template>
  <div class="flex h-screen">
    <div class="flex-1">
      <TresCanvas>
        <Experience />
      </TresCanvas>
    </div>
    <div class="w-80 p-4">
      <SliderControl
        :param="controls.ambientLight"
      />
      <SliderControl
        :param="controls.rotationSpeedX"
      />
      <SliderControl
        :param="controls.rotationSpeedY"
      />
      <SliderControl
        :param="controls.rotationSpeedZ"
      />
      <ColorControl
        :color="controls.cubeColor"
      />
    </div>
  </div>
</template>
