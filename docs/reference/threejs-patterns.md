# Three.js Patterns Reference

> **Load this reference when**: Building 3D scenes, optimizing performance, or managing memory.

## Memory Management Checklist

### What Must Be Disposed

| Object Type | Method | Notes |
|-------------|--------|-------|
| Geometries | `geometry.dispose()` | Frees WebGLBuffer |
| Materials | `material.dispose()` | Delete when ALL related materials disposed |
| Textures | `texture.dispose()` | Handled separately (can be shared) |
| Render Targets | `target.dispose()` | Frees framebuffer |
| Renderer | `renderer.dispose()` | When destroying/recreating |

### Complete Scene Cleanup
```javascript
function disposeScene(scene) {
  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
      materials.forEach((mtl) => {
        mtl.dispose()
        for (const key in mtl) {
          if (mtl[key]?.isTexture) mtl[key].dispose()
        }
      })
    }
  })
}
```

### Debug Memory
```javascript
console.log(renderer.info.memory)  // textures, geometries count
console.log(renderer.info.render)  // draw calls, triangles
```

---

## Performance Patterns

### 1. Instancing (Critical)
```javascript
// Instead of 10,000 meshes (10,000 draw calls)
// Use InstancedMesh (1 draw call)
const mesh = new THREE.InstancedMesh(geometry, material, 10000)

const matrix = new THREE.Matrix4()
for (let i = 0; i < 10000; i++) {
  matrix.setPosition(Math.random() * 100, Math.random() * 100, Math.random() * 100)
  mesh.setMatrixAt(i, matrix)
}
mesh.instanceMatrix.needsUpdate = true
```

**Impact**: 9,000 → 300 draw calls, restored 60 FPS.

### 2. Delta Time Animation
```javascript
import { Clock, MathUtils } from 'three'

const clock = new Clock()
const radiansPerSecond = MathUtils.degToRad(30)

function animate() {
  const delta = clock.getDelta()  // Call ONCE per frame

  cube.rotation.x += radiansPerSecond * delta
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
```

### 3. Draw Call Targets
- Aim for **under 100 draw calls** per frame
- Use `BufferGeometryUtils.mergeBufferGeometries` for static geometry
- Group by material to minimize state changes

---

## Common Mistakes

### 1. Not Disposing Resources
```javascript
// BAD - GPU memory leaked
scene.remove(mesh)

// GOOD
scene.remove(mesh)
mesh.geometry.dispose()
mesh.material.dispose()
```

### 2. Calling getDelta() Multiple Times
```javascript
// BAD
const delta1 = clock.getDelta()  // correct
const delta2 = clock.getDelta()  // ~0!

// GOOD
const delta = clock.getDelta()
updatePhysics(delta)
updateAnimations(delta)
```

### 3. Frame-Rate Dependent Animation
```javascript
// BAD - faster on 120Hz, slower on 30Hz
cube.rotation.x += 0.01

// GOOD - frame-rate independent
cube.rotation.x += radiansPerSecond * delta
```

### 4. Using scene.clear() for Cleanup
```javascript
// BAD - objects removed but GPU memory remains
scene.clear()

// GOOD
disposeScene(scene)
scene.clear()
```

---

## Frame Budget Reference

| Target FPS | Frame Budget | Use Case |
|------------|--------------|----------|
| 60 FPS | ~16.67ms | Standard |
| 90 FPS | ~11.11ms | VR minimum |
| 120 FPS | ~8.33ms | High refresh |

---

## WebGPU Migration

### Setup
```javascript
import { WebGPURenderer } from 'three/webgpu'

const renderer = new WebGPURenderer()
await renderer.init()  // Required - async!
```

### TSL for Cross-Platform Shaders
```javascript
import { color, sin, time } from 'three/tsl'
import { MeshBasicNodeMaterial } from 'three/webgpu'

const material = new MeshBasicNodeMaterial()
material.colorNode = color(1, 0, 0).mul(sin(time).add(1).div(2))
```

---

## Sources
- [Three.js - Dispose Objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)
- [Discover three.js](https://discoverthreejs.com/book/)
- [Three.js Journey](https://threejs-journey.com/)
