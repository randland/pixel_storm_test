<script setup>
import useControls from './useControls'

const { ambientLight } = useControls();
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
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshStandardMaterial />
  </TresMesh>
</template>
