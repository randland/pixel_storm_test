# Curriculum Outline

> **Progress**: Section 01 complete, Section 04 nearly complete (animation, controls, auto-rendering panel)
> **Last Updated**: 2026-02-19

## Learning Philosophy

- **Project-driven**: Each concept taught through practical projects
- **Progressive complexity**: Simple scenes to GPU-accelerated art
- **Visual feedback**: Immediate results maintain engagement
- **Modular approach**: Projects can be extended based on interest

## How to Use This Document

- **Status markers**: `[ ]` Planned | `[>]` In Progress | `[x]` Complete
- **Lesson requests**: Add to appropriate section with `[?]` marker for review
- **Tangents**: Curiosity-driven explorations go in `tangents-queue.md`

---

## Section 01: Getting Started

Foundation for everything that follows. No code artifacts - focus on mental models and working environment.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | 3D Graphics Concepts | `[x]` | What Three.js is, scene graph mental model, how rendering works |
| 02 | Project Setup & Tooling | `[x]` | TresJS installation, ESLint, Vitest, dev workflow |
| 03 | Hello Cube | `[x]` | First working demo - spinning cube, understanding the render loop |

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
| 02 | Demo Component Pattern | `[>]` | `BaseDemo` template component (Experience pattern established) |
| 03 | Control Panels | `[x]` | `ControlPanel` auto-renders by type, `SliderControl`, `ColorControl`, `useParam`, `useColorParam` |
| 04 | Navigation & Routing | `[x]` | `DemoSelector` + `useDemoRouter` built, URL routing working |

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
| 2026-01-26 | 01 | 01-3D Graphics Concepts | Completed mental models, corrected misconceptions about Groups and lighting |
| 2026-01-27 | 01 | 02-Project Setup & Tooling | TresJS 5.3.3, Three.js 0.182, ESLint flat config, Vitest with happy-dom |
| 2026-02-12 | 01, 04 | 01-03 Hello Cube + Platform Framework | Built demo platform: UnoCSS, convention-based demo discovery (import.meta.glob), URL routing (useUrlSearchParams), dark/light mode. Composables: useDemoRegistry, useDemoRouter, useParam. Components: DemoSelector, SliderControl. Hello-cube demo with Experience pattern (UI/scene separation). Co-located demo-specific composables. |
| 2026-02-19 | 04, 05 | Animation + Control Panel System | Animation loop via TresJS `useLoop` with delta-based rotation. Built `useColorParam` composable with hex/RGB reactive conversion. `ControlPanel.vue` auto-renders controls by param type. Added `type` field to `useParam` ('number') and `useColorParam` ('color'). New files: ControlPanel.vue, ColorControl.vue, useColorParam.js, colorUtils.js. Section 04 Control Panels and Navigation now complete. |

---

## Appendix A: Decision Guidelines

### JS vs GPU Performance Thresholds

**GPU Becomes Beneficial:**
- Particle Systems: >10,000 particles
- LED Grids: >1,000 with complex calculations
- Vertices: >100,000 with per-vertex calculations
- Noise Functions: Any requiring >60fps updates

**JavaScript Remains Optimal:**
- Small Arrays: <500 elements with simple updates
- Simple Animations: Basic transitions, fades
- Interactive Elements: Mouse/keyboard handlers
- State Management: Application logic
- Prototyping: Rapid development

### Complexity Scale (for project ideas)
- ⭐ Beginner: Basic concepts, minimal math
- ⭐⭐ Intermediate: Advanced features, moderate math
- ⭐⭐⭐ Advanced: Custom shaders, complex algorithms
- ⭐⭐⭐⭐ Expert: WebGPU compute, advanced math
- ⭐⭐⭐⭐⭐ Master: Cutting-edge techniques

---

## Appendix B: Project Ideas

Future projects for exploration after completing core curriculum.

| Project | Complexity | Description |
|---------|------------|-------------|
| Animated Geometric Art Studio | ⭐ | Three.js scene management, materials, lighting, animation loops |
| Interactive Particle Gallery | ⭐⭐ | Instanced rendering, BufferGeometry, mouse interaction |
| Procedural Landscape Generator | ⭐⭐ | Height maps, noise functions, texture blending |
| Perlin Noise Art Generator | ⭐⭐ | Multi-octave noise, flow fields, vertex displacement |
| Fractal Explorer | ⭐⭐⭐ | Mandelbrot, Julia sets, 3D fractals, infinite zoom |
| Reaction-Diffusion Simulator | ⭐⭐⭐ | Differential equations, pattern emergence |
| Shader Playground | ⭐⭐⭐ | GLSL fundamentals, live editing, uniform management |
| Animated Shader Gallery | ⭐⭐⭐ | Time-based animations, wave functions |
| Interactive Shader Composer | ⭐⭐⭐⭐ | Node-based visual programming, dynamic shader generation |
| GPU-Accelerated Particles | ⭐⭐⭐⭐ | 100K+ particles, physics simulation, boids |
| Cellular Automata Art | ⭐⭐⭐⭐ | Conway's Life, custom rules, million+ cells |
| Fluid Dynamics Simulator | ⭐⭐⭐⭐⭐ | Navier-Stokes equations, interactive manipulation |
| Ray Tracing Experiments | ⭐⭐⭐⭐⭐ | Path tracing, global illumination, BVH acceleration |

**Target Project**: GPU-Enhanced Logic Gate Simulator (see `docs/learning-progress.md`)
