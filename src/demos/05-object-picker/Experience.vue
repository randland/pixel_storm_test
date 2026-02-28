<script setup>
import { useLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import useControls from './useControls'
import useFPS from '@/composables/useFPS'
import use3dCanvasClick from '@/composables/use3dCanvasClick'
import useManualRaycaster from '@/composables/useManualRaycaster'

const { objects, controls } = useControls()
const { cast } = useManualRaycaster()

use3dCanvasClick(({ position }) => {
  if (!controls.manual.value) return null

  const intersects = cast(position)
  const intersect = intersects[0]
  if (!intersect) return null

  const index = intersect.object.userData
  if (index < 0) return null

  objects.value[index].toggleSelect()
})

const clickObject = (object) => {
  if (controls.manual.value) return

  object.toggleSelect()
}

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
    :user-data="index"
    :position="object.position"
    :rotate-x="object.rotateX"
    :size="object.size"
    cast-shadow
    @click="clickObject(object)"
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
