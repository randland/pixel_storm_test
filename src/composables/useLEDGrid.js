import { ref, watch, shallowRef } from 'vue'
import { useRafFn } from '@vueuse/core'
import { clamp } from 'lodash-es'
import * as THREE from 'three'

// Simple Perlin noise implementation for organic patterns
const noise = (x, y, scale = 0.1) => {
  const p = []
  for (let i = 0; i < 512; i++) {
    p[i] = Math.floor(Math.random() * 256)
  }
  
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a, b, t) => a + t * (b - a)
  const grad = (hash, x, y) => {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }
  
  x *= scale
  y *= scale
  
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  
  x -= Math.floor(x)
  y -= Math.floor(y)
  
  const u = fade(x)
  const v = fade(y)
  
  const A = p[X] + Y
  const B = p[X + 1] + Y
  
  return lerp(
    lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
    lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u),
    v
  )
}

export function useLEDGrid(scene, options = {}) {
  const {
    initialSize = 15,
    initialLedSize = 0.05,
    initialAnimationSpeed = 1.0,
    initialWavePattern = 'sine'
  } = options

  const gridSize = ref(initialSize)
  const ledSize = ref(initialLedSize)
  const animationSpeed = ref(initialAnimationSpeed)
  const wavePattern = ref(initialWavePattern)
  
  const ledMeshes = shallowRef([])
  const spacing = 0.3

  const createLEDGrid = () => {
    if (!scene.value) return

    // Clear existing LEDs
    ledMeshes.value.forEach(led => scene.value.remove(led))
    ledMeshes.value = []

    const geometry = new THREE.SphereGeometry(ledSize.value, 8, 6)

    for (let x = 0; x < gridSize.value; x++) {
      for (let z = 0; z < gridSize.value; z++) {
        const material = new THREE.MeshLambertMaterial({
          color: new THREE.Color().setHSL(0.6, 1, 0.5),
          emissive: new THREE.Color().setHSL(0.6, 1, 0.1)
        })

        const led = new THREE.Mesh(geometry, material)
        
        // Position LED in grid
        led.position.set(
          (x - gridSize.value / 2) * spacing,
          0,
          (z - gridSize.value / 2) * spacing
        )

        // Store grid coordinates for animations
        led.userData = { gridX: x, gridZ: z }
        
        scene.value.add(led)
        ledMeshes.value.push(led)
      }
    }
  }

  const animateLEDs = () => {
    const time = Date.now() * 0.001 * animationSpeed.value

    ledMeshes.value.forEach(led => {
      const { gridX, gridZ } = led.userData
      let intensity = 0.1

      const centerX = gridSize.value / 2
      const centerZ = gridSize.value / 2

      switch (wavePattern.value) {
        case 'sine':
          intensity = 0.1 + 0.9 * Math.sin(gridX * 0.3 + time) * Math.sin(gridZ * 0.3 + time)
          break
          
        case 'ripple': {
          const distance = Math.sqrt((gridX - centerX) ** 2 + (gridZ - centerZ) ** 2)
          intensity = 0.1 + 0.9 * Math.sin(distance * 0.5 - time * 3)
          break
        }
        
        case 'spiral': {
          const angle = Math.atan2(gridZ - centerZ, gridX - centerX)
          const radius = Math.sqrt((gridX - centerX) ** 2 + (gridZ - centerZ) ** 2)
          intensity = 0.1 + 0.9 * Math.sin(angle * 3 + radius * 0.3 - time * 2)
          break
        }
        
        case 'perlin': {
          const noiseValue = noise(gridX, gridZ, 0.15) + noise(gridX, gridZ + time * 2, 0.3) * 0.5
          intensity = 0.1 + 0.9 * ((noiseValue + 1) * 0.5)
          break
        }
        
        case 'plasma': {
          const plasma1 = Math.sin(gridX * 0.4 + time) 
          const plasma2 = Math.sin(gridZ * 0.3 - time * 0.8)
          const plasma3 = Math.sin((gridX + gridZ) * 0.2 + time * 0.6)
          const plasma4 = Math.sin(Math.sqrt(gridX * gridX + gridZ * gridZ) * 0.5 - time * 1.2)
          intensity = 0.1 + 0.9 * ((plasma1 + plasma2 + plasma3 + plasma4) * 0.25 + 0.5)
          break
        }
        
        case 'interference': {
          const wave1 = Math.sin(Math.sqrt((gridX - 4) ** 2 + (gridZ - 4) ** 2) * 0.8 - time * 3)
          const wave2 = Math.sin(Math.sqrt((gridX - gridSize.value + 4) ** 2 + (gridZ - gridSize.value + 4) ** 2) * 0.8 - time * 3)
          intensity = 0.1 + 0.9 * Math.abs(wave1 + wave2) * 0.5
          break
        }
      }

      intensity = clamp(intensity, 0.1, 1.0)

      // Update LED color based on intensity
      const hue = 0.6 + intensity * 0.3
      led.material.color.setHSL(hue, 1, 0.3 + intensity * 0.7)
      led.material.emissive.setHSL(hue, 1, intensity * 0.3)
      
      // Slight vertical bobbing animation
      led.position.y = Math.sin(time + gridX + gridZ) * 0.02
    })
  }

  // Watch for changes and update scene
  watch([gridSize, ledSize], createLEDGrid)

  const { pause: pauseAnimation, resume: resumeAnimation } = useRafFn(animateLEDs)

  return {
    gridSize,
    ledSize,
    animationSpeed,
    wavePattern,
    ledMeshes,
    createLEDGrid,
    animateLEDs,
    pauseAnimation,
    resumeAnimation
  }
}