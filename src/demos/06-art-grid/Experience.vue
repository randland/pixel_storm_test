<script setup>
import { useLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import useControls from './useControls'
import useFPS from '@/composables/useFPS'

const { mesh, updateInstances } = useControls();

const { updateFps } = useFPS()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  updateFps(delta)
  updateInstances(delta)
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[8, 8, 8]"
  />

  <OrbitControls />

  <primitive :object="mesh" />
</template>
