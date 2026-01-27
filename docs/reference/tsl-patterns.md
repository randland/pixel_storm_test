# TSL (Three Shading Language) Patterns Reference

> **Load this reference when**: Writing shaders, creating custom materials, or using WebGPU compute.

## Mental Model: Nodes vs Text

**Traditional GLSL**: Code runs on GPU as strings
```glsl
uniform float uTime;
void main() {
  gl_FragColor = vec4(sin(uTime), 0.0, 0.0, 1.0);
}
```

**TSL**: JavaScript that DESCRIBES what GPU should do
```javascript
import { time, sin, vec4 } from 'three/tsl'
material.colorNode = vec4(sin(time), 0.0, 0.0, 1.0)
```

When you write `sin(time)` in TSL, you create a **node** representing "the sine of time." Actual computation happens after TSL compiles to WGSL/GLSL.

---

## Common Imports

```javascript
import * as THREE from 'three/webgpu'
import {
  // Math
  Fn, float, vec2, vec3, vec4,
  sin, cos, abs, fract, step, smoothstep, mix, clamp,
  dot, normalize, length, distance,

  // Coordinates
  positionLocal, positionWorld, normalLocal, normalWorld,
  uv, time,

  // Control flow
  If, Loop, Break,

  // Textures
  texture, normalMap,

  // Compute
  instanceIndex, storageBuffer, compute
} from 'three/tsl'
```

---

## Position and Coordinate Nodes

```javascript
// Local space (-0.5 to 0.5 for unit geometry)
material.colorNode = positionLocal

// UV coordinates (0 to 1)
material.colorNode = vec4(uv(), 0.0, 1.0)

// World space for multi-object effects
const worldPos = positionWorld
```

---

## Custom Functions with Fn

```javascript
const myFunction = Fn(([param = float(0)]) => {
  return param.mul(2).add(1)
})

material.colorNode = myFunction(time)
```

### Hash Function
```javascript
export const hash = Fn(([seed]) => {
  const h = seed.fract().mul(0.1031)
  return h.mul(h.add(33.33)).mul(h.add(h)).fract()
})
```

### With Mutable Variables
```javascript
const main = Fn(() => {
  const p = positionLocal.toVar()  // Mutable
  If(abs(p.x).greaterThan(0.45), () => {
    p.z = 1
  })
  return p
})
```

---

## Material Node Properties

```javascript
const material = new THREE.MeshStandardNodeMaterial()

material.colorNode = texture(colorTexture)
material.normalNode = normalMap(texture(normalTexture))
material.metalnessNode = texture(metalnessTexture)
material.roughnessNode = texture(roughnessTexture)
material.emissiveNode = vec3(1, 0, 0).mul(time.sin())

// Vertex displacement
material.positionNode = positionLocal.add(
  normalLocal.mul(sin(time).mul(0.1))
)
```

---

## Method Chaining

```javascript
// Instead of nested: add(mul(texture(map), 2), 0.5)
material.colorNode = texture(map).mul(2).add(0.5)
```

---

## Pattern Examples

### Checkerboard
```javascript
material.fragmentNode = positionLocal.mul(4.9999).fract().step(0.5)
```

### Concentric Rings
```javascript
material.fragmentNode = positionLocal.length().mul(15).fract().step(0.5)
```

### Pulsing Color
```javascript
const pulse = sin(time.mul(2.0)).mul(0.5).add(0.5)
material.colorNode = vec3(1, 0, 0).mul(pulse)
```

---

## Compute Shaders

### Basic Setup
```javascript
import { instanceIndex, storageBuffer } from 'three/tsl'

const COUNT = 1024
const dataArray = new Float32Array(COUNT * 4)
const dataAttribute = new THREE.StorageInstancedBufferAttribute(dataArray, 4)
const dataStorage = storageBuffer(dataAttribute, 'vec4', COUNT)

const computeShader = Fn(() => {
  const idx = instanceIndex
  const current = dataStorage.element(idx)
  const newValue = current.xyz.add(vec3(0.01, 0, 0))
  dataStorage.element(idx).assign(vec4(newValue, current.w))
})().compute(COUNT)
```

### Running Compute
```javascript
async function init() {
  await renderer.init()
  animate()
}

function animate() {
  renderer.compute(computeShader)  // Before render
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
```

---

## Control Flow

### Conditionals
```javascript
const color = If(lessThan(positionView.z, float(5)), () => {
  return vec3(1, 0, 0)  // Red if close
}).Else(() => {
  return vec3(0, 1, 0)  // Green if far
})
```

### Loops
```javascript
Loop(10, ({ i }) => {
  If(someCondition, () => { Break() })
})
```

---

## Setup (Import Map)

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.178.0/build/three.webgpu.js",
    "three/webgpu": "https://cdn.jsdelivr.net/npm/three@0.178.0/build/three.webgpu.js",
    "three/tsl": "https://cdn.jsdelivr.net/npm/three@0.178.0/build/three.tsl.js"
  }
}
</script>
```

**Critical**: Use `three.webgpu.js` NOT `three.module.js`.

---

## Sources
- [Three.js TSL Docs](https://threejs.org/docs/pages/TSL.html)
- [Three.js TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- [sbcode.net TSL Tutorials](https://sbcode.net/tsl/)
- [Maxime Heckel - Field Guide to TSL](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)
