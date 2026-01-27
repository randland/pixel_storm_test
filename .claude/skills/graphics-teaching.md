# Graphics Teaching Skills

## Three.js Teaching Patterns

### Scene Setup Template
```js
// Always start with: scene, camera, renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement })
```

### Vue + Three.js Integration
1. Use `ref()` for reactive parameters
2. `watch()` to update Three.js objects
3. Dispose geometry/materials in `onUnmounted()`
4. Use composables for reusable graphics logic

### Visual Learning Progression
1. **Foundation**: Basic shapes, colors, camera movement
2. **Interactivity**: Mouse controls, parameter sliders
3. **Math Art**: Noise functions, procedural generation
4. **Advanced**: Shaders, post-processing, WebGPU compute

### Error Prevention
- Check WebGL context availability
- Validate texture dimensions (power of 2)
- Monitor memory usage with dispose()
- Test in multiple browsers/devices

## WebGPU Teaching Approach
1. Start with Three.js WebGL foundation
2. Show performance limitations that WebGPU solves
3. Introduce compute shaders for particle systems
4. Build toward GPU-accelerated art techniques

## Student Engagement Tactics
- Immediate visual feedback
- Creative parameter exploration
- Connect math concepts to artistic outcomes
- Build portfolio-worthy demonstrations