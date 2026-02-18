<script setup>
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import useControls from './useControls'

const { ambientLight, rotationSpeedX, rotationSpeedY, rotationSpeedZ, cubeColor } = useControls();
const cube = ref(null);

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  if (cube.value) {
    cube.value.rotation.x += delta * rotationSpeedX.value;
    cube.value.rotation.y += delta * rotationSpeedY.value;
    cube.value.rotation.z += delta * rotationSpeedZ.value;
  }
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[3, 3, 3]"
    :look-at="[0, 0, 0]"
  />
  <TresAmbientLight 
    :intensity="ambientLight.value"
  />
  <TresDirectionalLight 
    :position="[5, 4, 3]"
  />
  <TresMesh ref="cube">
    <TresBoxGeometry />
    <TresMeshStandardMaterial
      :color="cubeColor.hex"
    />
  </TresMesh>
</template>
