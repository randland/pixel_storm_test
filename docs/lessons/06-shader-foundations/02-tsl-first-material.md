# Lesson 06-02: TSL — Your First Custom Material

> **Section**: Shader Foundations
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Understand the TSL node-based mental model (expressions build a graph, compiled to WGSL)
- [ ] Create a MeshStandardNodeMaterial with custom colorNode
- [ ] Use built-in TSL nodes: `uv()`, `positionLocal`, `time`, `normalLocal`
- [ ] Compose nodes with arithmetic: `.mul()`, `.add()`, `.sub()`
- [ ] Write custom TSL functions with `Fn()`

## Prerequisites

- Lesson 06-01: The GPU Mindset + WebGPU Setup

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `tsl-playground` demo | Switch between TSL recipes on an interesting mesh |

## Key Concepts

### TSL Mental Model
- Nodes describe computation, they don't execute it
- TSL builds a graph that compiles to WGSL shader code
- Method chaining: `sin(time).mul(0.5).add(0.5)` — reads like math
- Compare: GLSL is text you write, TSL is code you compose

### Material Node Properties
- `colorNode`: replaces diffuse color
- `emissiveNode`: replaces emissive color
- `opacityNode`: replaces opacity
- `normalNode`: replaces surface normals
- `positionNode`: replaces vertex positions (next lesson)

### Core TSL Nodes
- `uv()`: texture coordinates [0,1] — varies across surface
- `positionLocal`: vertex position in object space
- `normalLocal`: vertex normal direction
- `time`: elapsed seconds — drives animation
- `vec3()`, `vec4()`, `float()`: constructors
- `sin()`, `cos()`, `abs()`: math operations

### Custom Functions
- `Fn(([param1, param2]) => { ... })` for reusable TSL logic
- Return value becomes a node in the graph
- Composable: custom functions can call other custom functions

## Demo Concept: "TSL Playground"

A torus knot (or other visually interesting mesh) with a `MeshStandardNodeMaterial`. Control panel lets you switch between TSL "recipes":
1. Solid color from `colorNode`
2. UV gradient (x=red, y=green)
3. Position-based rainbow
4. Time-pulsing emissive glow
5. Checkerboard using `fract()` and `step()`

Each recipe is a few lines of TSL code. A code display panel shows the active TSL alongside the visual result.

## Connection to GPU Work

> TSL is the tool you'll use for everything from here on. Gate materials that change appearance based on state? TSL `colorNode` driven by a buffer value. Flame fractal color mapping? TSL function over the histogram. GPU particles with custom rendering? TSL position and color nodes. This lesson is the vocabulary for all GPU visual work.

## Resources

- [Three.js TSL Documentation](https://threejs.org/docs/#api/en/nodes/Nodes)
- [Three.js TSL Examples](https://threejs.org/examples/?q=tsl)
