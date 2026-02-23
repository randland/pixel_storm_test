<script setup>
import { watch } from 'vue'
import { FogExp2, Color } from 'three'
import { useTres } from '@tresjs/core'
import { randomBetween } from '@/lib/randomUtils'
import useControls from './useControls'

const { toneMapExposure, backgroundColor, fogDensity } = useControls();

const objects = Array.from({ length: 20 }, () => ({
  position: [randomBetween(-6, 6), randomBetween(0.5, 4), randomBetween(-6, 6)],
  scale: randomBetween(0.5, 1.5),
  color: `hsl(${randomBetween(0, 360)}, 70%, 50%)`,
  shape: Math.random() > 0.5 ? 'TresBoxGeometry' : 'TresSphereGeometry',
}))

const { renderer, scene } = useTres()
renderer.toneMappingExposure = 1.0
scene.value.background = new Color(backgroundColor.hex)
scene.value.fog = new FogExp2(new Color("#ccc"), fogDensity.value);

watch(toneMapExposure, (newValue) => {
  renderer.toneMappingExposure = newValue.value;
})

watch(backgroundColor, (newValue) => {
  scene.value.background = new Color(newValue.hex);
})

watch(fogDensity, (newValue) => {
  scene.value.fog = new FogExp2(new Color("#ccc"), newValue.value);
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[6, 6, 6]"
    :look-at="[0, 0, 0]"
  />
  <TresAmbientLight 
    :intensity="0.5"
  />
  <TresDirectionalLight 
    :position="[5, 4, 3]"
  />

  <TresMesh
    v-for="(obj, i) in objects"
    :key="i"
    :position="obj.position"
    :scale="obj.scale"
  >
    <component :is="obj.shape" />
    <TresMeshStandardMaterial :color="obj.color" />
  </TresMesh>
</template>
