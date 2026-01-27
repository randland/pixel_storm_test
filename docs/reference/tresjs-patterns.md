# TresJS Patterns Reference

> **Load this reference when**: Integrating Vue 3 with Three.js, building reactive 3D components.

## Core Composables

### `useTres` (Primary)
```javascript
const { renderer, scene, camera, invalidate, advance } = useTres()
```

### `useLoop` (Animation - v5)
```javascript
import { useLoop } from '@tresjs/core'

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  meshRef.value.rotation.x += delta * 0.5
})
```

### `useLoader` (Assets)
```javascript
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { data, isLoading, error } = useLoader(GLTFLoader, '/model.gltf')
```

---

## Critical: Use `shallowRef` for Three.js Objects

```javascript
// GOOD - Avoids deep reactivity overhead
const meshRef = shallowRef(null)

// BAD - Creates unnecessary reactive proxies
const meshRef = ref(null)
```

**Why**: Three.js objects have complex internals. Deep reactivity tracks every property, killing performance at 60fps.

---

## Component Organization

### Experience Pattern (Recommended)
```vue
<!-- App.vue -->
<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <Experience />
  </TresCanvas>
</template>

<!-- Experience.vue - Scene content -->
<script setup>
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

const donutRef = shallowRef()
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (donutRef.value) {
    donutRef.value.rotation.y = elapsed * 0.3
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[7, 7, 7]" :look-at="[0, 0, 0]" />
  <TresMesh ref="donutRef" :position="[0, 1, 0]">
    <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
    <TresMeshStandardMaterial color="orange" />
  </TresMesh>
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[5, 5, 5]" />
</template>
```

---

## Reactivity Integration

### UI-Driven Changes (Use refs)
```vue
<script setup>
const cubeColor = ref('#ff0000')
const cubeScale = ref(1)
</script>

<template>
  <TresMesh :scale="cubeScale">
    <TresBoxGeometry />
    <TresMeshStandardMaterial :color="cubeColor" />
  </TresMesh>

  <input type="color" v-model="cubeColor" />
</template>
```

### Animation Loop (Direct manipulation)
```javascript
// GOOD - No Vue overhead
onBeforeRender(({ delta }) => {
  meshRef.value.rotation.x += delta
})

// BAD - Triggers reactivity 60x/second
const rotation = ref(0)
onBeforeRender(({ delta }) => {
  rotation.value += delta
})
```

---

## Template Refs Access

```vue
<script setup>
import { shallowRef, watch, nextTick, onMounted } from 'vue'

const boxRef = shallowRef()

// Option 1: watch
watch(boxRef, (box) => {
  if (box) console.log('Geometry:', box.geometry)
})

// Option 2: nextTick in onMounted
onMounted(async () => {
  await nextTick()
  console.log(boxRef.value)  // Guaranteed to exist
})
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <TresMeshBasicMaterial color="blue" />
  </TresMesh>
</template>
```

---

## Performance Tips

### 1. Render Modes
```vue
<TresCanvas>                         <!-- Default: Always -->
<TresCanvas render-mode="on-demand"> <!-- Only when needed -->
<TresCanvas render-mode="manual">    <!-- Full control -->
```

### 2. Manual Invalidation
```javascript
const { invalidate } = useTres()

watch(externalState, () => {
  updateMesh()
  invalidate()  // Request re-render
})
```

### 3. Frame-Rate Independence
```javascript
onBeforeRender(({ delta, elapsed }) => {
  // delta: consistent speed across frame rates
  meshRef.value.rotation.x += delta * speed

  // elapsed: time-based effects
  meshRef.value.position.y = Math.sin(elapsed) * amplitude
})
```

---

## Cientos Library

```bash
npm install @tresjs/cientos
```

| Category | Components |
|----------|-----------|
| Controls | OrbitControls, CameraControls, TransformControls |
| Loaders | useGLTF, useFBX, useTexture |
| Materials | MeshGlassMaterial, HolographicMaterial |
| Staging | Sky, Stars, Environment, ContactShadows |

### OrbitControls Example
```vue
<script setup>
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
  </TresCanvas>
</template>
```

---

## v5 Migration Notes

| Old (v4) | New (v5) |
|----------|----------|
| `useRenderLoop` | `useLoop` |
| `@pointer-down` | `@pointerdown` |
| `useTresContext` | `useTres` (for most cases) |

---

## Sources
- [TresJS Documentation](https://docs.tresjs.org/)
- [Cientos Documentation](https://cientos.tresjs.org/)
- [TresJS v5 Upgrade Guide](https://docs.tresjs.org/getting-started/upgrade-guide)
