# Lesson 07-01: Compute Shaders — Hello Parallel World

> **Section**: GPU Compute
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Write a first compute shader using TSL's `Fn().compute()` pattern
- [ ] Create and manage storage buffers (`instancedArray`)
- [ ] Understand `instanceIndex` for thread identification
- [ ] Dispatch compute work and read results back
- [ ] Connect compute output to instanced mesh rendering

## Prerequisites

- Lesson 06-01: The GPU Mindset + WebGPU Setup (SIMD, pull model)
- Lesson 05-02: Instanced Rendering (data-driven rendering)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `compute-visualizer` demo | 1D array transformed by compute shader, visualized as bar chart |

## Key Concepts

### Storage Buffers
- `instancedArray(count, 'float')` or `instancedArray(count, 'vec3')` for GPU-side data
- CPU → GPU: initialize buffer with data
- GPU → CPU: read results back after compute
- `StorageInstancedBufferAttribute` for explicit buffer control

### Compute Shader Pattern
- `Fn(() => { ... }).compute(count)` — defines the compute kernel
- `instanceIndex` — which thread am I? (0 to count-1)
- Each thread reads/writes its own element in the buffer
- `renderer.computeAsync(computeNode)` to dispatch

### Dispatch Model
- Total threads = buffer size
- `Math.ceil(count / workgroupSize)` dispatches
- Default workgroup size: 64 threads (Three.js default)
- No need to manage workgroups manually yet (next lesson)

### Compute-to-Render Pipeline
- Compute output buffer → `InstancedMesh` attribute
- `geometry.setAttribute('position', positions.toAttribute())`
- No CPU in the hot path: compute updates data, renderer reads it

## Demo Concept: "Compute Visualizer"

A 1D array of 1024 values, visualized as a row of instanced thin boxes (bar chart). A compute shader applies a function to each value: `f(x) = sin(x * freq + time)`. The bars animate smoothly. Controls for: function type (sin, square wave, sawtooth, noise), frequency, array size (256 to 16k). A "step" mode runs the compute shader one frame at a time. Performance comparison: JavaScript `for` loop vs GPU compute doing the same work.

## Connection to GPU Work

> This is the core pattern. Every compute project from here on follows this structure: create buffer → write compute kernel → dispatch → use results. The flame fractal iterates points in parallel. Game of Life evaluates cells in parallel. GPU particles update positions in parallel. The gate simulator evaluates gates in parallel. Same pattern, different kernels.

## Resources

- [Three.js - Compute examples](https://threejs.org/examples/?q=compute)
- [WebGPU Fundamentals - Compute Shaders](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
