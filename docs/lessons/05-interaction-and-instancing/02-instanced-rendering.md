# Lesson 05-02: Instanced Rendering

> **Section**: Interaction & Instancing
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Understand the performance cliff between individual meshes and instanced rendering
- [ ] Use InstancedMesh with Matrix4 for per-instance transforms
- [ ] Use InstancedBufferAttribute for per-instance colors
- [ ] Update instance data dynamically in the animation loop
- [ ] Grasp the "data-driven rendering" mental model (scene described by arrays, not objects)

## Prerequisites

- Lesson 05-01: Raycasting & Object Selection

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `art-grid` demo | 10k+ instances driven by math functions and mouse interaction |

## Key Concepts

### InstancedMesh
- `InstancedMesh(geometry, material, count)` — one draw call for N objects
- `Matrix4.compose(position, quaternion, scale)` for per-instance transforms
- `instanceMatrix.needsUpdate = true` after modifying instance data
- `setMatrixAt(index, matrix)` / `getMatrixAt(index, matrix)`

### Per-Instance Attributes
- `InstancedBufferAttribute` for custom per-instance data (color, size, etc.)
- Attaching to geometry: `geometry.setAttribute('color', instancedAttr)`
- Material must support vertex colors: `vertexColors: true`

### Performance
- `renderer.info.render.calls` — monitoring draw calls
- 10k individual meshes vs 1 InstancedMesh: dramatic FPS difference
- When to use instancing vs when individual meshes are fine (<100 objects)

### Mental Model Shift
- "Describe the scene as data" — arrays of positions, colors, scales
- This array IS what the GPU will compute later (compute shaders operate on arrays)
- InstancedMesh is the CPU-managed version of what GPU instancing does natively

## Demo Concept: "Art Grid"

A 100x100 grid (10,000 instances) of small cubes or spheres. Each instance's color and scale are driven by math functions: `sin(x * freq + time)`, `distance(pos, mousePos)`, etc. Mouse position affects the pattern in real-time. Controls for: function type (waves, radial, spiral), frequency, amplitude, color palette, grid size (100 to 50k). FPS counter shows performance scaling.

## Connection to GPU Work

> This is the CPU-side version of what GPU compute shaders do. You're updating 10,000 positions/colors per frame in JavaScript. In Section 07, the compute shader will do this for 100,000+ elements at higher FPS. The data layout you design here (arrays of positions, colors) is exactly the buffer layout you'll use for GPU compute.

## Resources

- [Three.js - InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)
- [Three.js - InstancedBufferAttribute](https://threejs.org/docs/#api/en/core/InstancedBufferAttribute)
