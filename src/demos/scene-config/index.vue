<script setup>
import { TresCanvas } from '@tresjs/core'
import ControlPanel from '@/components/ControlPanel.vue'
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
    <ControlPanel :controls="controls" />
  </div>
</template>
