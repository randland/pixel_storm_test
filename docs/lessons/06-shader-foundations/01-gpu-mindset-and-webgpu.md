# Lesson 06-01: The GPU Mindset + WebGPU Setup

> **Section**: Shader Foundations
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Understand GPU architecture: thousands of simple cores vs few complex CPU cores
- [ ] Grasp SIMD (Single Instruction, Multiple Data) parallel execution
- [ ] Understand the "pull" model: the GPU asks "what color is pixel (x,y)?" rather than being told
- [ ] Set up WebGPURenderer in TresJS with detection and fallback
- [ ] Build a `useWebGPU` composable for capability detection

## Prerequisites

- Lesson 02-04: Shadows & Surfaces (understanding of the standard render pipeline)
- Lesson 05-02: Instanced Rendering (data-driven rendering mental model)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `webgpu-hello` demo | WebGPU renderer with adapter info and WebGL comparison |
| `useWebGPU` composable | Capability detection, adapter info, feature reporting |

## Key Concepts

### GPU vs CPU Mental Model
- CPU: few powerful cores, complex branching, sequential optimization
- GPU: thousands of simple cores, same operation on different data (SIMD)
- Why this matters: every pixel/vertex runs the same code independently

### The Pull Model
- Fragment shader: "what color should pixel (x,y) be?" — runs per pixel
- Vertex shader: "where should vertex N go?" — runs per vertex
- No loops over pixels — the GPU runs your function for every pixel in parallel
- Contrast with CPU approach: "for each pixel, compute color"

### WebGPU Setup
- `navigator.gpu` for detection
- `adapter.requestDevice()` for GPU access
- `WebGPURenderer` from `three/webgpu`
- `await renderer.init()` — async initialization
- Fallback to WebGLRenderer when WebGPU unavailable
- Adapter info: GPU name, limits, supported features

## Demo Concept: "WebGPU Hello World"

The hello-cube demo running on WebGPU renderer. A panel shows adapter info (GPU name, max texture size, max buffer size). Toggle between WebGL and WebGPU renderers for comparison. With a high instance count (50k cubes), show the performance difference.

## Connection to GPU Work

> This is the conceptual foundation for everything that follows. The SIMD mental model explains why compute shaders work (each logic gate computes independently = each GPU thread runs the same gate-evaluation code). The pull model explains fragment shaders (each pixel asks "what's my color?"). Every lesson after this builds on these two ideas.

## Resources

- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [Three.js WebGPU Renderer](https://threejs.org/docs/#api/en/renderers/WebGPURenderer)
- [MDN - WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
