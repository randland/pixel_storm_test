# Curriculum Outline

> **Progress**: Section 01 complete, Section 04 nearly complete, Section 02 nearly complete (shadows remaining)
> **Last Updated**: 2026-02-24

## Learning Philosophy

- **Project-driven**: Each concept taught through interesting, purposeful projects
- **Progressive complexity**: Scene fundamentals → TSL shaders → GPU compute → capstone
- **Visual feedback**: Immediate results maintain engagement
- **Forward-connected**: Every lesson explains why it matters for GPU work ahead
- **Best tool for the concept**: Each section uses the most interesting project to teach its skills

## How to Use This Document

- **Status markers**: `[ ]` Planned | `[>]` In Progress | `[x]` Complete
- **Lesson requests**: Add to appropriate section with `[?]` marker for review
- **Tangents**: Curiosity-driven explorations go in `tangents-queue.md`

---

## Section 01: Getting Started

Foundation for everything that follows. No code artifacts — focus on mental models and working environment.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | 3D Graphics Concepts | `[x]` | What Three.js is, scene graph mental model, how rendering works |
| 02 | Project Setup & Tooling | `[x]` | TresJS installation, ESLint, Vitest, dev workflow |
| 03 | Hello Cube | `[x]` | First working demo — spinning cube, understanding the render loop |

---

## Section 02: Scene Fundamentals

Core Three.js/TresJS concepts. Each lesson produces a reusable composable or component.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Scene & Renderer | `[x]` | scene-config demo, renderer/scene controls, named setter + immediate watcher pattern |
| 02 | Cameras & Controls | `[x]` | FOV/near/far sliders, OrbitControls, `useDollyZoom` composable, `dollyZoomMath` utility |
| 03 | Lighting Basics | `[x]` | `useLightHelper` composable, 4 light types with interactive controls, imperative helper management |
| 04 | Shadows & Surfaces | `[ ]` | Shadow mapping, MeshStandard/PhysicalMaterial, environment reflections, "Material Showroom" demo |

> **Consolidated**: Geometry, Textures, and Responsive Design were dropped as standalone lessons. Geometry was covered organically in lighting demos (6+ types used). Textures and responsive design will be covered on-demand when needed.

---

## Section 04: Platform Architecture

Building the demo platform infrastructure. *(Section 03 was eliminated — model loading absorbed into Section 08 capstone.)*

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Demo Component Pattern | `[x]` | Experience pattern (UI/scene separation) established |
| 02 | Control Panels | `[x]` | `ControlPanel` auto-renders by type, `SliderControl`, `ColorControl`, `BooleanControl`, `OptionControl` |
| 03 | Navigation & Routing | `[x]` | `DemoSelector` + `useDemoRouter` built, URL routing working |

> **Note**: WebGPU Detection moved to Section 06-01 where it's actually needed.

---

## Section 05: Interaction & Instancing

Making scenes interactive and rendering at scale. Each lesson builds skills directly needed for the capstone project.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | Raycasting & Object Selection | `[ ]` | `object-picker` demo — click to select, hover effects, TresJS events + manual Raycaster |
| 02 | Instanced Rendering | `[ ]` | `art-grid` demo — 10k+ instances, color/scale driven by math functions + mouse position |
| 03 | Interactive Scene Building | `[ ]` | `gate-prototype` demo — place nodes on grid, wire them, toggle states (gate sim scaffolding) |

> **Restructured**: Animation Loops and Reactive Bindings were dropped (already covered through existing demos). Interaction lessons are project-driven, building toward the gate simulator.

---

## Section 06: Shader Foundations

Understanding GPU programming through TSL (Three.js Shading Language). TSL-first approach — start writing shader materials immediately, not GLSL/WGSL theory.

| # | Lesson | Status | Artifact |
|---|--------|--------|----------|
| 01 | The GPU Mindset + WebGPU Setup | `[ ]` | `webgpu-hello` demo, `useWebGPU` composable — SIMD, pull model, WebGPURenderer |
| 02 | TSL: Your First Custom Material | `[ ]` | `tsl-playground` demo — MeshStandardNodeMaterial, colorNode, uv(), time, positionLocal |
| 03 | Shaping Functions & Patterns | `[ ]` | `pattern-lab` demo — step, smoothstep, mix, fract, procedural patterns |
| 04 | Noise & Procedural Generation | `[ ]` | `noise-explorer` demo — Perlin, simplex, fBm, vertex displacement |
| 05 | Vertex Displacement & Animation | `[ ]` | `living-geometry` demo — positionNode, normalNode, animated deformation |

> **TSL-first**: Lessons teach the node-based approach directly (the tool you'll actually use) rather than starting with raw GLSL/WGSL syntax. Signed Distance Fields deferred to on-demand exploration.

---

## Section 07: GPU Compute

The core target — parallel computation on the GPU. Each lesson uses the most interesting project for its concept.

| # | Lesson | Status | Demo | Why This Project |
|---|--------|--------|------|-----------------|
| 01 | Compute Shaders: Hello Parallel World | `[ ]` | `compute-visualizer` | Simplest possible compute shader, immediate visual feedback |
| 02 | Flame IFS Fractals | `[ ]` | `flame-explorer` | Pure compute, stunning visuals, minimal UI, high interest |
| 03 | Cellular Automata (Game of Life) | `[ ]` | `gpu-game-of-life` | Ping-pong buffers, state machines, neighbor reads |
| 04 | GPU Particle Systems | `[ ]` | `gpu-particles` | Compute-to-render pipeline, multi-buffer management |

> **Project-driven**: Flame IFS fractals are the first real compute project (pure GPU, stunning results, minimal UI overhead). Game of Life teaches ping-pong buffers (the exact pattern the gate simulator needs). GPU Particles prove the compute-to-render pipeline at scale.

---

## Section 08: Capstone Projects

Applying everything learned to build the target project. Each lesson builds on the previous.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Logic Gate Simulator: Board & Data Model | `[ ]` | DAG representation, gate types, placement/wiring interaction, model loading |
| 02 | Logic Gate Simulator: GPU Evaluation | `[ ]` | Compute shader for parallel gate logic, CPU vs GPU comparison |
| 03 | Logic Gate Simulator: Signal Propagation | `[ ]` | Multi-layer evaluation, animated signal flow, TSL materials for state |
| 04 | Logic Gate Simulator: Polish | `[ ]` | Post-processing (bloom), preset circuits, save/load, portfolio quality |

> **Target Project**: GPU-Enhanced Logic Gate Simulator inspired by Turing Complete. The interaction layer is scaffolded in Section 05-03, GPU evaluation uses patterns from Section 07, and visual feedback combines TSL materials with compute output.

---

## Section 09: Creative Extensions

Open-ended section for projects that emerge from student interests. Added as discovered.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Reaction-Diffusion Simulator | `[ ]` | Differential equations, pattern emergence, ping-pong buffers |
| 02 | Fractal Explorer | `[ ]` | Mandelbrot, Julia sets, infinite zoom, GPU-computed |
| ?? | *(added as discovered)* | | |

> **Tangent-driven**: See `tangents-queue.md` for exploration ideas. Flame IFS fractals were promoted from tangent to curriculum (Section 07-02).

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
| 2026-02-12 | 01, 04 | 01-03 Hello Cube + Platform Framework | Built demo platform: UnoCSS, convention-based demo discovery (import.meta.glob), URL routing (useUrlSearchParams), dark/light mode. Composables: useDemoRegistry, useDemoRouter, useNumericParam. Components: DemoSelector, SliderControl. Hello-cube demo with Experience pattern (UI/scene separation). Co-located demo-specific composables. |
| 2026-02-19 | 04 | Animation + Control Panel System | Animation loop via TresJS `useLoop` with delta-based rotation. Built `useColorParam` composable with hex/RGB reactive conversion. `ControlPanel.vue` auto-renders controls by param type. Added `type` field to `useNumericParam` ('number') and `useColorParam` ('color'). New files: ControlPanel.vue, ColorControl.vue, useColorParam.js, colorUtils.js. Section 04 Control Panels and Navigation now complete. |
| 2026-02-24 | 02 | Scene & Renderer + Cameras & Controls | Built scene-config demo (randomized objects, renderer/scene/camera controls, OrbitControls). Dolly zoom refactored: pure math utility (`dollyZoomMath.js` + 4 tests), `useDollyZoom` composable with state machine pattern. Learned Cientos wrapper chain (`.instance` not `.instance.value`), captured state in composables, separation of concerns (watcher vs computed). Added `useBooleanParam`, `useOptionParam`, `BooleanControl`, `OptionControl`. |
| 2026-02-24 | 02 | Lighting Basics (in progress) | Built lighting-basics demo with ground plane + 6 geometry types. Four light types (Ambient, Directional, Point, Spot) with full interactive controls. `useLightHelper` composable for imperative helper management. `useFPS` composable (singleton, rolling 500ms window). Fixed BooleanControl bug (value vs checked). Learned geometry vs mesh props, `:args` vs props, imperative scene management. |
| 2026-02-24 | all | Curriculum Restructure | Compressed 26 lessons → 21. Dropped generic fundamentals (geometry, textures, responsive design). Eliminated Section 03 (Scene Organization). Promoted Flame IFS from tangent to curriculum. Restructured for faster path to GPU work: 7 lessons to shaders (was 16), 12 to compute (was 21). |

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
