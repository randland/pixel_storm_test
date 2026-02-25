# Lesson 07-04: GPU Particle Systems

> **Section**: GPU Compute
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Build a complete compute-to-render pipeline (no CPU in the hot loop)
- [ ] Manage multiple GPU buffers (position, velocity, life, color)
- [ ] Implement physics simulation in a compute shader (gravity, collision, wind)
- [ ] Use init compute (run once) vs update compute (run per frame)
- [ ] Profile frame budget: compute + render must fit in 16ms

## Prerequisites

- Lesson 07-03: Cellular Automata (ping-pong buffers, state management)
- Lesson 05-02: Instanced Rendering (InstancedMesh concepts)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `gpu-particles` demo | 100k+ particles with GPU-computed physics |

## Key Concepts

### Multi-Buffer Layout
- Position buffer: `vec3` per particle — where it is
- Velocity buffer: `vec3` per particle — how it's moving
- Life buffer: `float` per particle — time remaining (for spawn/despawn)
- Color buffer: `vec3` per particle — visual state (derived from velocity, life, etc.)
- All live on GPU — never copied to CPU during simulation

### Init vs Update Compute
- Init compute: runs once to set initial positions, velocities, life values
- Update compute: runs every frame to apply physics
- Separation keeps the update kernel simple and focused

### Physics Kernel
- Gravity: `velocity.y -= gravity * dt`
- Floor collision: if `position.y < 0`, reflect velocity, dampen
- Wind: `velocity.x += wind * dt`
- Life: `life -= dt`, if `life <= 0` → respawn at emitter position
- All per-particle, all in parallel

### Compute-to-Render Pipeline
- Compute shader writes position buffer
- InstancedMesh reads position buffer as geometry attribute
- `renderer.computeAsync()` runs before `renderer.render()`
- Zero data transfer between CPU and GPU per frame
- This pattern: compute produces data → render consumes data

### Frame Budget
- 60fps = 16.67ms per frame total
- Compute time + render time must fit
- Profile with `performance.now()` around compute and render calls
- Scale particle count to maintain 60fps target

## Demo Concept: "GPU Particles"

10,000 particles spawning from a point emitter, arcing outward under gravity, bouncing off a floor plane. Color encodes velocity magnitude (slow=blue, fast=red). Controls for: gravity, wind direction/strength, particle count (100 to 100k+), spawn rate, floor bounciness. FPS counter and compute/render time breakdown. Dramatic demonstration: 100k particles at 60fps — impossible with CPU, trivial for GPU.

## Connection to GPU Work

> This is the compute-to-render pipeline that the gate simulator will use: compute shader evaluates logic → output buffer contains states → instanced mesh renders gates colored by state. The particle system proves this pattern works at scale. The multi-buffer layout (position, velocity, life) maps directly to the gate simulator's layout (type, inputs, output state).

## Resources

- [Three.js - GPU Compute examples](https://threejs.org/examples/?q=compute)
- [WebGPU Fundamentals - Storage Buffers](https://webgpufundamentals.org/webgpu/lessons/webgpu-storage-buffers.html)
