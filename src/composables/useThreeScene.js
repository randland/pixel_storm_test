import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRafFn } from '@vueuse/core'
import * as THREE from 'three'

export function useThreeScene(canvas) {
  const scene = shallowRef(null)
  const camera = shallowRef(null)
  const renderer = shallowRef(null)
  const fps = ref(0)
  
  let frameCount = 0
  let lastTime = 0

  const initScene = () => {
    if (!canvas.value) return

    // Scene setup
    scene.value = new THREE.Scene()
    scene.value.background = new THREE.Color(0x000011)

    // Camera setup
    camera.value = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    camera.value.position.set(0, 5, 8)
    camera.value.lookAt(0, 0, 0)

    // Renderer setup
    renderer.value = new THREE.WebGLRenderer({ 
      canvas: canvas.value,
      antialias: true 
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(window.devicePixelRatio)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.value.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.value.add(directionalLight)
  }

  const handleResize = () => {
    if (!camera.value || !renderer.value) return
    
    camera.value.aspect = window.innerWidth / window.innerHeight
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(window.innerWidth, window.innerHeight)
  }

  const updateFPS = () => {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
      fps.value = Math.round((frameCount * 1000) / (currentTime - lastTime))
      frameCount = 0
      lastTime = currentTime
    }
  }

  const render = () => {
    if (scene.value && camera.value && renderer.value) {
      renderer.value.render(scene.value, camera.value)
      updateFPS()
    }
  }

  const { pause: pauseRender, resume: resumeRender } = useRafFn(render)

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    pauseRender()
    window.removeEventListener('resize', handleResize)
    renderer.value?.dispose()
  })

  return {
    scene,
    camera,
    renderer,
    fps,
    initScene,
    render,
    pauseRender,
    resumeRender
  }
}