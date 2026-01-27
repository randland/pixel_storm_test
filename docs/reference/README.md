# Reference Documentation Index

> **Load this file first** to determine which reference you need. Then load only the specific reference file.

## Quick Reference Selection

### Vue & Composables
| File | Load When |
|------|-----------|
| `vue-composition-patterns.md` | Designing composables, debugging reactivity, component structure |
| `vueuse-patterns.md` | Building VueUse-style composables, animation/input utilities |

### 3D Graphics
| File | Load When |
|------|-----------|
| `threejs-patterns.md` | Memory management, performance optimization, disposal patterns |
| `tresjs-patterns.md` | Vue + Three.js integration, reactive 3D, TresJS composables |

### Shaders & GPU
| File | Load When |
|------|-----------|
| `tsl-patterns.md` | Writing TSL shaders, custom materials, node-based effects |
| `webgpu-compute-patterns.md` | Compute shaders, particle systems, GPU algorithms |
| `webgl-patterns.md` | WebGL fallback, GLSL shaders, draw call optimization |

---

## Decision Tree

```
Need help with...

Composable design?
  └─> vue-composition-patterns.md

VueUse-style utilities (animation, input)?
  └─> vueuse-patterns.md

Three.js memory leaks or performance?
  └─> threejs-patterns.md

TresJS + Vue reactivity?
  └─> tresjs-patterns.md

Custom shader materials?
  └─> tsl-patterns.md

GPU compute (particles, simulation)?
  └─> webgpu-compute-patterns.md

WebGL fallback or GLSL?
  └─> webgl-patterns.md
```

---

## File Summaries

### vue-composition-patterns.md
- `ref()` vs `reactive()` decision matrix
- Composable design patterns (options object, flexible arguments, cleanup)
- Anti-patterns to avoid
- Composables vs Pinia decision guide

### vueuse-patterns.md
- Key composables for graphics (useRafFn, useMouse, useResizeObserver)
- VueUse design patterns (MaybeRefOrGetter, Pausable, isSupported)
- Template for building graphics composables

### threejs-patterns.md
- Memory disposal checklist
- Performance patterns (instancing, delta time, draw call targets)
- Common mistakes (not disposing, frame-rate dependent animation)
- WebGPU migration basics

### tresjs-patterns.md
- Core composables (useTres, useLoop, useLoader)
- Critical: `shallowRef` for Three.js objects
- Reactivity integration (UI-driven vs animation loop)
- Cientos library overview

### tsl-patterns.md
- Node-based shader mental model
- Common nodes (position, normal, uv, time)
- Custom functions with `Fn()`
- Material node properties
- Compute shader basics

### webgpu-compute-patterns.md
- Workgroup/thread/dispatch model
- Buffer management and alignment (vec3 trap!)
- Synchronization patterns
- Three.js TSL compute integration
- Particle system pattern

### webgl-patterns.md
- Draw call optimization
- GLSL shader patterns (uniforms, varyings)
- Three.js ShaderMaterial and InstancedMesh
- Common pitfalls (precision, context loss)
- WebGPU fallback strategy
