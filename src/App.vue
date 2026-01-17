<template>
  <div class="app">
    <!-- Controls Panel -->
    <div class="controls-panel">
      <h2>LED Grid Controls</h2>
      
      <div class="control-group">
        <label>Grid Size</label>
        <input 
          type="range" 
          v-model="gridSize" 
          min="5" 
          max="50" 
          step="1"
        />
        <span>{{ gridSize }} x {{ gridSize }}</span>
      </div>

      <div class="control-group">
        <label>Animation Speed</label>
        <input 
          type="range" 
          v-model="animationSpeed" 
          min="0.1" 
          max="5" 
          step="0.1"
        />
        <span>{{ animationSpeed }}x</span>
      </div>

      <div class="control-group">
        <label>LED Size</label>
        <input 
          type="range" 
          v-model="ledSize" 
          min="0.02" 
          max="0.2" 
          step="0.01"
        />
        <span>{{ ledSize }}</span>
      </div>

      <div class="control-group">
        <label>Wave Pattern</label>
        <select v-model="wavePattern">
          <option value="sine">Sine Wave</option>
          <option value="ripple">Ripple</option>
          <option value="spiral">Spiral</option>
          <option value="perlin">Perlin Noise</option>
          <option value="plasma">Plasma</option>
          <option value="interference">Wave Interference</option>
        </select>
      </div>

      <div class="info">
        <div>FPS: {{ fps }}</div>
        <div>LEDs: {{ totalLeds }}</div>
      </div>
    </div>

    <!-- Three.js Canvas -->
    <canvas ref="canvas" class="threejs-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useThreeScene } from './composables/useThreeScene.js'
import { useLEDGrid } from './composables/useLEDGrid.js'

const canvas = ref(null)

// Initialize Three.js scene
const { scene, fps, initScene } = useThreeScene(canvas)

// Initialize LED grid with scene reference
const { 
  gridSize, 
  ledSize, 
  animationSpeed, 
  wavePattern, 
  createLEDGrid,
  resumeAnimation
} = useLEDGrid(scene, {
  initialSize: 15,
  initialLedSize: 0.05,
  initialAnimationSpeed: 1.0,
  initialWavePattern: 'sine'
})

const totalLeds = computed(() => gridSize.value * gridSize.value)

onMounted(() => {
  initScene()
  createLEDGrid()
  resumeAnimation()
})
</script>

<style lang="sass" scoped>
$panel-bg: rgba(20, 20, 40, 0.9)
$accent-blue: #88ccff
$text-secondary: #aabbcc
$control-bg: rgba(40, 40, 60, 0.8)
$border-light: rgba(255, 255, 255, 0.1)
$border-medium: rgba(255, 255, 255, 0.2)

.app
  position: relative
  width: 100vw
  height: 100vh

.threejs-canvas
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.controls-panel
  position: fixed
  top: 20px
  right: 20px
  background: $panel-bg
  color: white
  padding: 20px
  border-radius: 10px
  backdrop-filter: blur(10px)
  border: 1px solid $border-light
  min-width: 250px
  z-index: 100

  h2
    margin: 0 0 20px 0
    font-size: 18px
    color: $accent-blue

.control-group
  margin-bottom: 15px

  label
    display: block
    margin-bottom: 5px
    font-size: 14px
    color: $text-secondary

  input[type="range"]
    width: 100%
    margin-bottom: 5px

  select
    width: 100%
    padding: 5px
    background: $control-bg
    border: 1px solid $border-medium
    color: white
    border-radius: 4px

  span
    font-size: 12px
    color: $accent-blue

.info
  margin-top: 20px
  padding-top: 15px
  border-top: 1px solid $border-medium
  font-size: 12px

  div
    margin-bottom: 5px
    color: $accent-blue
</style>