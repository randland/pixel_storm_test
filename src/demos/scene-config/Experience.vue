<script setup>
import { ref, watch } from 'vue'
import { FogExp2 } from 'three'
import { useTres } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { randomBetween } from '@/lib/randomUtils'
import useControls from './useControls'
import useDollyZoom from '@/composables/useDollyZoom'

const {
  toneMappingExposure,
  backgroundColor,
  fogDensity,
  fogColor,
  fov,
  near,
  far,
  dollyZoom,
} = useControls();

const objects = Array.from({ length: 20 }, () => ({
  position: [randomBetween(-6, 6), randomBetween(0.5, 4), randomBetween(-6, 6)],
  scale: randomBetween(0.5, 1.5),
  color: `hsl(${randomBetween(0, 360)}, 70%, 50%)`,
  shape: Math.random() > 0.5 ? 'TresBoxGeometry' : 'TresSphereGeometry',
}))

const { renderer, scene, camera } = useTres()

const setToneMappingExposure = () => renderer.toneMappingExposure = toneMappingExposure.value
watch(toneMappingExposure, setToneMappingExposure, { immediate: true })

const setSceneBackground = () => scene.value.background = backgroundColor.color
watch(backgroundColor, setSceneBackground, { immediate: true })

const setSceneFog = () => scene.value.fog = new FogExp2(fogColor.color, fogDensity.value)
watch([fogDensity, fogColor], setSceneFog, { immediate: true })

const orbitControls = ref(null)
const { effectiveFov } = useDollyZoom(camera, orbitControls, fov, dollyZoom)
</script>

<template>
  <TresPerspectiveCamera
    :position="[6, 6, 6]"
    :fov="effectiveFov"
    :near="near.value"
    :far="far.value"
  />
  <OrbitControls
    ref="orbitControls"
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
