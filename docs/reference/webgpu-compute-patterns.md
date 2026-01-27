# WebGPU Compute Patterns Reference

> **Load this reference when**: Building particle systems, simulations, or GPU-accelerated algorithms.

## Execution Model

**Thread**: Smallest unit, runs shader independently
**Workgroup**: Collection of threads that can share memory
**Dispatch**: Command launching multiple workgroups

```wgsl
@compute @workgroup_size(64) fn computeMain(
    @builtin(global_invocation_id) id: vec3<u32>
) {
    let index = id.x;
    // Process data[index]
}
```

---

## Workgroup Sizing

| Recommendation | Rationale |
|----------------|-----------|
| 64 threads default | GPUs execute 64 efficiently |
| Max 256 invocations | x*y*z <= 256 |
| Power of 2 | Optimal alignment |

**2D workload**: `@workgroup_size(8, 8)` = 64 threads
**1D workload**: `@workgroup_size(64)`

### Dispatch Calculation
```javascript
const totalItems = 1000000
const workgroupSize = 64
const numWorkgroups = Math.ceil(totalItems / workgroupSize)
pass.dispatchWorkgroups(numWorkgroups)
```

---

## Built-in Variables

```wgsl
@builtin(local_invocation_id)    localId      // Position in workgroup
@builtin(workgroup_id)           workgroupId  // Which workgroup
@builtin(global_invocation_id)   globalId     // Unique across all
@builtin(local_invocation_index) localIndex   // Linear position
```

---

## Buffer Types

| Type | Size Limit | Access |
|------|------------|--------|
| Uniform | 64 KiB | `var<uniform>` read-only |
| Storage | 128 MiB | `var<storage, read_write>` |

### Buffer Creation
```javascript
// Static data
const buffer = device.createBuffer({
  size: data.byteLength,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  mappedAtCreation: true
})
new Float32Array(buffer.getMappedRange()).set(data)
buffer.unmap()

// Dynamic updates
device.queue.writeBuffer(buffer, 0, data)
```

---

## Data Alignment (Critical!)

| Type | Size | Alignment |
|------|------|-----------|
| `f32` | 4 | 4 |
| `vec2<f32>` | 8 | 8 |
| `vec3<f32>` | 12 | **16** (padded!) |
| `vec4<f32>` | 16 | 16 |

### vec3 Trap
```wgsl
struct Particle {
    position: vec3<f32>,  // 12 + 4 padding = offset 0
    velocity: vec3<f32>,  // 12 + 4 padding = offset 16
    age: f32,             // offset 32
    // Struct size: 48 bytes (padded to 16)
}
```

### JavaScript Layout
```javascript
const PARTICLE_SIZE = 48  // bytes
const particleData = new Float32Array(count * 12)  // 48/4 floats

for (let i = 0; i < count; i++) {
  const offset = i * 12
  particleData[offset + 0] = posX     // position.x
  particleData[offset + 1] = posY     // position.y
  particleData[offset + 2] = posZ     // position.z
  // offset + 3 is padding
  particleData[offset + 4] = velX     // velocity.x
  // ...
}
```

---

## Synchronization

### Barriers
```wgsl
var<workgroup> sharedData: array<f32, 64>;

// Phase 1: Write
sharedData[localIdx] = computeValue();
workgroupBarrier();  // Wait for all threads

// Phase 2: Read (safe now)
let neighborValue = sharedData[(localIdx + 1) % 64];
```

**Limitation**: Barriers can't sync between workgroups. Use separate passes or atomics.

---

## Three.js TSL Integration

### Storage Buffers
```javascript
import { instancedArray, storageBuffer } from 'three/tsl'

// Method 1: instancedArray (simpler)
const positions = instancedArray(count, 'vec3')
const velocities = instancedArray(count, 'vec3')

// Method 2: Explicit buffer
const posArray = new Float32Array(count * 3)
const posAttr = new StorageInstancedBufferAttribute(posArray, 3)
const posStorage = storage(posAttr, 'vec3', count)
```

### Compute with TSL
```javascript
const updateParticles = Fn(() => {
  const i = instanceIndex
  const pos = positions.element(i)
  const vel = velocities.element(i)

  const newPos = pos.add(vel.mul(deltaTime))
  positions.element(i).assign(newPos)
})

const computeNode = updateParticles().compute(count)

// In render loop
renderer.computeAsync(computeNode)
```

### Complete Particle Pattern
```javascript
// 1. Create buffers
const positions = instancedArray(count, 'vec3')
const velocities = instancedArray(count, 'vec3')

// 2. Init shader (run once)
const initParticles = Fn(() => {
  positions.element(instanceIndex).assign(randomPosition())
  velocities.element(instanceIndex).assign(randomVelocity())
}).compute(count)

await renderer.computeAsync(initParticles)

// 3. Update shader
const updateParticles = Fn(() => {
  const pos = positions.element(instanceIndex)
  const vel = velocities.element(instanceIndex)
  positions.element(instanceIndex).assign(pos.add(vel.mul(deltaTime)))
}).compute(count)

// 4. Use as geometry attribute
geometry.setAttribute('position', positions.toAttribute())

// 5. Render loop
function animate() {
  renderer.computeAsync(updateParticles)
  renderer.render(scene, camera)
}
```

---

## Common Algorithms

### Parallel Reduction
```wgsl
var<workgroup> sdata: array<f32, 256>;

sdata[localIdx] = inputData[globalIdx];
workgroupBarrier();

for (var stride = 128u; stride > 0u; stride >>= 1u) {
  if (localIdx < stride) {
    sdata[localIdx] += sdata[localIdx + stride];
  }
  workgroupBarrier();
}

if (localIdx == 0u) {
  partialSums[groupId.x] = sdata[0];
}
```

---

## Sources
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [Google WebGPU Codelab](https://codelabs.developers.google.com/your-first-webgpu-app)
- [Three.js TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
