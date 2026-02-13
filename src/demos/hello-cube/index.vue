<script setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresAmbientLight 
      :intensity="0.5"
    />
    <TresDirectionalLight 
      :position="[5, 4, 3]"
    />
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
  </TresCanvas>
</template>
