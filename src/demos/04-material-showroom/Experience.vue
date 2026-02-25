<script setup>
import { ref, watch } from 'vue'
import { useLoop } from '@tresjs/core'
import { OrbitControls, Environment } from '@tresjs/cientos'
import useControls from './useControls'
import useFPS from '@/composables/useFPS'

const {
  shadowBias,
  shadowMapSize,
  shadowFrustum,
  roughness,
  metalness,
  transmission,
  emissiveColor,
  emissiveIntensity,
  ior,
  thickness,
  preset,
  background,
} = useControls();

const { update } = useFPS()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  update(delta)
})

const directionalLight = ref()
watch([shadowBias, shadowMapSize, shadowFrustum], () => {
  if (!directionalLight.value) return

  directionalLight.value.shadow.bias = shadowBias.value

  directionalLight.value.shadow.camera.left = -shadowFrustum.value
  directionalLight.value.shadow.camera.right = shadowFrustum.value
  directionalLight.value.shadow.camera.top = shadowFrustum.value
  directionalLight.value.shadow.camera.bottom = -shadowFrustum.value
  directionalLight.value.shadow.camera.updateProjectionMatrix()

  directionalLight.value.shadow.mapSize.width = shadowMapSize.value
  directionalLight.value.shadow.mapSize.height = shadowMapSize.value

  if (directionalLight.value.shadow.map) {
    directionalLight.value.shadow.map.dispose() // Important: dispose the shadow map to apply changes
    directionalLight.value.shadow.map = null // Important: set to null to force re-creation
  }
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[8, 8, 8]"
  />
  <OrbitControls />
  
  <Suspense>
    <Environment
      v-if="preset.value === 'custom'"
      files="/hdri/kloofendal_48d_partly_cloudy_puresky_2k.hdr"
      :background="background.value"
    />
    <Environment
      v-else
      :preset="preset.value"
      :background="background.value"
    />
  </Suspense>

  <TresDirectionalLight 
    ref="directionalLight"
    color="#FFF"
    :intensity="4"
    :position="[5, 10, 5]"
    cast-shadow
  />
  <!-- <TresPointLight -->
  <!--   ref="pointLight" -->
  <!--   color="#F55" -->
  <!--   :intensity="10" -->
  <!--   :position="[0, 3, 0]" -->
  <!--   cast-shadow -->
  <!-- /> -->
  <!-- <TresSpotLight  -->
  <!--   ref="spotLight" -->
  <!--   color="#5AF" -->
  <!--   :angle="Math.PI / 6" -->
  <!--   :decay="2" -->
  <!--   :distance="20" -->
  <!--   :intensity="100" -->
  <!--   :penumbra="0.5" -->
  <!--   :position="[5, 8, 0]" -->
  <!--   cast-shadow -->
  <!-- /> -->

  <TresMesh
    :rotate-x="-Math.PI / 2"
    receive-shadow
  >
    <TresPlaneGeometry
      :args="[20, 20]"
    />
    <TresMeshStandardMaterial
      color="#AAA"
    />
  </TresMesh>

  <TresMesh
    :position="[-6, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Matte material -->
    <TresMeshStandardMaterial
      :roughness="1.0"
      :metalness="0.0"
    />
  </TresMesh>

  <TresMesh
    :position="[-4, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Glossy Plastic -->
    <TresMeshStandardMaterial
      :roughness="0.2"
      :metalness="0.0"
    />
  </TresMesh>

  <TresMesh
    :position="[-2, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Brushed Metal -->
    <TresMeshStandardMaterial
      :roughness="0.4"
      :metalness="1.0"
    />
  </TresMesh>

  <TresMesh
    :position="[0, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Slider Controls -->
    <TresMeshPhysicalMaterial
      :roughness="roughness.value"
      :metalness="metalness.value"
      :transmission="transmission.value"
      :ior="ior.value"
      :thickness="thickness.value"
    />
  </TresMesh>

  <TresMesh
    :position="[2, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Emissive Material -->
    <TresMeshStandardMaterial
      :emissive="emissiveColor.hex"
      :emissive-intensity="emissiveIntensity.value"
    />
  </TresMesh>

  <TresMesh
    :position="[4, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Glass Material -->
    <TresMeshPhysicalMaterial
      :roughness="0.0"
      :transmission="1.0"
    />
  </TresMesh>

  <TresMesh
    :position="[6, 1, 0]"
    :rotate-x="-Math.PI / 2"
    cast-shadow
    receive-shadow
  >
    <TresTorusKnotGeometry
      :args="[0.5, 0.2, 100, 16]"
    />
    <!-- Wireframe Material -->
    <TresMeshStandardMaterial
      wireframe
    />
  </TresMesh>
</template>
