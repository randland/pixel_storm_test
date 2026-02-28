<script setup>
import { useLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import useControls from './useControls'
import useFPS from '@/composables/useFPS'

const { objects } = useControls()

const { update } = useFPS()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  update(delta)
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[8, 8, 8]"
  />
  <OrbitControls />
  
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight 
    ref="directionalLight"
    color="#FFF"
    :intensity="3"
    :position="[5, 10, 5]"
    cast-shadow
  />

  <TresMesh
    v-for="(object, index) in objects"
    :key="index"
    :position="object.position"
    :rotate-x="object.rotateX"
    :size="object.size"
    cast-shadow
    @click="object.toggleSelect"
    @pointerenter="object.hovered = true"
    @pointerleave="object.hovered = false"
  >
    <TresTorusKnotGeometry :args="[0.5, 0.2, 100, 16]" />
    <TresMeshStandardMaterial
      :color="object.color"
      :roughness="0.5"
      :metalness="0.5"
      :emissive-intensity="object.emissiveIntensity"
      emissive="#FFF"
    />
  </TresMesh>
</template>
