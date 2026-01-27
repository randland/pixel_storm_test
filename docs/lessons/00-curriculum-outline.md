# Curriculum Outline

> **Progress**: Section 01 - Getting Started (not started)
> **Last Updated**: 2026-01-26

## How to Use This Document

- **Status markers**: `[ ]` Planned | `[>]` In Progress | `[x]` Complete
- **Lesson requests**: Add to appropriate section with `[?]` marker for review
- **Tangents**: Curiosity-driven explorations go in `tangents-queue.md`

---

## Section 01: Getting Started

Foundation for everything that follows. No code artifacts - focus on mental models and working environment.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | 3D Graphics Concepts | `[ ]` | What Three.js is, scene graph mental model, how rendering works |
| 02 | Project Setup & Tooling | `[ ]` | TresJS installation, ESLint, Vitest, dev workflow |
| 03 | Hello Cube | `[ ]` | First working demo - spinning cube, understanding the render loop |

---

## Section 02: Scene Fundamentals

Core Three.js/TresJS concepts. Each lesson produces a reusable composable or component.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Scene & Renderer | `[ ]` | `useScene`, `BaseCanvas` |
| 02 | Cameras & Controls | `[ ]` | `useCamera`, camera presets |
| 03 | Lighting Basics | `[ ]` | `useLighting`, light factories |
| 04 | Shadows | `[ ]` | Shadow configuration patterns |
| 05 | Geometry | `[ ]` | Geometry helper utilities |
| 06 | Materials | `[ ]` | Material factory utilities |
| 07 | Textures | `[ ]` | `useTexture` composable |
| 08 | Responsive Design | `[ ]` | Window resize, pixel ratio handling |

---

## Section 03: Scene Organization

Structuring larger scenes and loading external assets.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Groups & Hierarchies | `[ ]` | Scene organization patterns |
| 02 | Debug Helpers | `[ ]` | `useDebugHelpers` (axes, grid, light helpers) |
| 03 | Loading 3D Models | `[ ]` | `useModel` (glTF loader) |
| 04 | Asset Management | `[ ]` | Loading patterns, progress tracking |

---

## Section 04: Platform Architecture

Building the demo platform infrastructure.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | WebGPU Detection | `[ ]` | `useWebGPU` capability composable |
| 02 | Demo Component Pattern | `[ ]` | `BaseDemo` template component |
| 03 | Control Panels | `[ ]` | `useControls`, `ControlPanel` component |
| 04 | Navigation & Routing | `[ ]` | `DemoNav`, router configuration |

---

## Section 05: Interactivity

Making scenes respond to user input and time.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Animation Loops | `[ ]` | `useAnimation`, timing utilities |
| 02 | Raycasting & Picking | `[ ]` | `useRaycast`, object selection |
| 03 | User Input | `[ ]` | `usePointer`, `useKeyboard` |
| 04 | Reactive Bindings | `[ ]` | Vue ↔ Three.js sync patterns |

---

## Section 06: Visual Effects

Adding polish and visual interest.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Particles & Points | `[ ]` | `useParticles` composable |
| 02 | Environment Maps & HDR | `[ ]` | Environment loading utilities |
| 03 | Post-Processing Basics | `[ ]` | EffectComposer setup |
| 04 | Post-Processing Advanced | `[ ]` | Bloom, DOF, custom effects |

---

## Section 07: Shader Foundations

Understanding GPU programming concepts before diving into WebGPU.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | The GPU Mindset | `[ ]` | Mental model: pull vs push |
| 02 | UV Coordinates & Gradients | `[ ]` | UV visualization demo |
| 03 | Shaping Functions | `[ ]` | `step`, `smoothstep`, `mix` demos |
| 04 | Noise Functions | `[ ]` | Perlin, Simplex implementations |
| 05 | Signed Distance Fields | `[ ]` | SDF shape library |

---

## Section 08: TSL & WebGPU

Three.js Shading Language and WebGPU compute.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | WGSL Syntax Basics | `[ ]` | WGSL reference patterns |
| 02 | TSL Node System | `[ ]` | TSL material patterns |
| 03 | Custom TSL Materials | `[ ]` | Reusable TSL material library |
| 04 | Compute Shaders Intro | `[ ]` | `useComputeShader` composable |
| 05 | Workgroups & Parallelism | `[ ]` | GPU execution patterns |

---

## Section 09: Advanced Patterns

Open-ended section for advanced techniques discovered along the way.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Ping-Pong Buffers | `[ ]` | Buffer swap patterns |
| 02 | GPU Simulations | `[ ]` | Simulation framework |
| ?? | *(added as discovered)* | | |

---

## Lesson Request Queue

Lessons suggested during learning that need to be placed in the outline.

| Topic | Suggested Placement | Status |
|-------|---------------------|--------|
| *(none yet)* | | |

---

## Progress Log

| Date | Section | Lesson | Notes |
|------|---------|--------|-------|
| | | | |
