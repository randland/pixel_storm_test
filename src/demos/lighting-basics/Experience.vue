<script setup>
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import useControls from './useControls'
import useFPS from '@/composables/useFPS'
import useLightHelper from '@/composables/useLightHelper'

const {
  ambientColor,
  ambientIntensity,
  directionalColor,
  directionalIntensity,
  directionalHelper,
  pointColor,
  pointDecay,
  pointDistance,
  pointIntensity,
  pointHelper,
  spotAngle,
  spotColor,
  spotDecay,
  spotDistance,
  spotIntensity,
  spotPenumbra,
  spotHelper,
} = useControls();

const directionalLight = ref(null)
useLightHelper(directionalLight, directionalHelper, DirectionalLightHelper)
const pointLight = ref(null)
useLightHelper(pointLight, pointHelper, PointLightHelper)
const spotLight = ref(null)
useLightHelper(spotLight, spotHelper, SpotLightHelper)

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
  <TresAmbientLight 
    :intensity="ambientIntensity.value"
    :color="ambientColor.hex"
  />
  <TresDirectionalLight 
    ref="directionalLight"
    :position="[5, 10, 5]"
    :intensity="directionalIntensity.value"
    :color="directionalColor.hex"
  />
  <TresPointLight
    ref="pointLight"
    :position="[0, 3, 0]"
    :intensity="pointIntensity.value"
    :color="pointColor.hex"
    :distance="pointDistance.value"
    :decay="pointDecay.value"
  />
  <TresSpotLight 
    ref="spotLight"
    :position="[5, 8, 0]"
    :intensity="spotIntensity.value"
    :color="spotColor.hex"
    :distance="spotDistance.value"
    :angle="spotAngle.value"
    :penumbra="spotPenumbra.value"
    :decay="spotDecay.value"
  />

  <TresMesh
    :rotate-x="-Math.PI / 2"
  >
    <TresPlaneGeometry
      :args="[20, 20]"
    />
    <TresMeshStandardMaterial
      color="#AAA"
    />
  </TresMesh>

  <TresMesh
    :position="[0, 1, 0]"
  >
    <TresSphereGeometry 
      :args="[1, 32, 32]"
    />
    <TresMeshStandardMaterial />
  </TresMesh>

  <TresMesh
    :position="[-2, 0.5, -2]"
    :rotate-y="Math.PI / 4"
  >
    <TresBoxGeometry />
    <TresMeshStandardMaterial />
  </TresMesh>

  <TresMesh
    :position="[4, 2, -5]"
  >
    <TresConeGeometry 
      :args="[1, 2, 32]"
    />
    <TresMeshStandardMaterial
      color="#DA9"
    />
  </TresMesh>

  <TresMesh
    :position="[-4, 1, 3]"
    :rotate-x="Math.PI / 6"
  >
    <TresCylinderGeometry 
      :args="[1, 1, 3, 32]"
    />
    <TresMeshStandardMaterial
      color="#3FC"
    />
  </TresMesh>

  <TresMesh
    :position="[2, 1, 4]"
    :rotate-x="-Math.PI / 6"
  >
    <TresTorusGeometry 
      :args="[1, 0.4, 16, 100]"
    />
    <TresMeshStandardMaterial
      color="#48C"
    />
  </TresMesh>

  <TresMesh
    :position="[-3, 2, -4]"
    :rotate-y="-Math.PI / 4"
  >
    <TresTorusKnotGeometry 
      :args="[0.5, 0.2, 100, 16]"
    />
    <TresMeshStandardMaterial
      color="#FC4"
      roughness="0.8"
      metalness="0"
    />
  </TresMesh>
</template>
