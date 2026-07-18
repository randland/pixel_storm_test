# Curriculum Outline

> **Progress**: Sections 01, 02, 04 complete. Section 05-01 (Raycasting) and 05-02 (Instanced Rendering) fully complete. Section 05-03 (Interactive Scene Building) in progress.
> **Last Updated**: 2026-07-18
>
> **Strategic revision (2026-07-18)**: Re-entry after the ~4.5-month gap goes through a TSL shader generative-art win — cosine color palette → animated plasma → Perlin noise field (a low-friction, highly visual Section 06 fragment-shader material that reconnects with generative art) BEFORE resuming — then finish Section 05-03, then normal progression. (This supersedes the earlier "WebGPU hello-compute" re-entry taster; the compute "aha" now comes slightly later via curl-noise/attractor particles in Section 07.) The Section 08 capstone will be built CPU/JS-first (working simulation + measured baseline), THEN ported to GPU as an optimization. Also proposed but pending a decision when Section 07 is reached: demote Flame IFS (07-02) to Section 09, reorder Section 07 (hello-compute → Game of Life → GPU particles), and a GPU teaching-method shift (front-load SIMD / pull-model / buffer-layout scaffolding before hands-on coding in Sections 06-07). See `docs/plans/2026-07-18-project-audit-remediation.md`.
>
> **Generative Art Track**: Optional generative-art projects that teach the same Section 06/07 skills (shaders, compute) are catalogued in `docs/lessons/generative-art-track.md` — intersperse them with the main curriculum so scene-building stays fresh.

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
| 04 | Shadows & Surfaces | `[x]` | Shadow mapping, MeshStandard/PhysicalMaterial, environment reflections, "Material Showroom" demo |

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
| 01 | Raycasting & Object Selection | `[x]` | `object-picker` demo (TresJS events) + manual `THREE.Raycaster` implementation. Composable chain: `useCanvas` → `useCanvasPoint` → `useScenePoint` → `use3dCanvasClick` → `useManualRaycaster`. `screenMath.js` with NDC conversion utilities (8 tests). `useObject` composable for per-object state. userData for mesh-to-object bridging. |
| 02 | Instanced Rendering | `[x]` | `art-grid` demo — 100×100 InstancedMesh (10k instances), sin/cos wave height animation, HSL color via mapRange, 230fps sustained. `Matrix4.setPosition()` + `setColorAt()` + `instanceColor.needsUpdate`. `<primitive :object>` escape hatch. No-allocation render loop. `geometry.rotateX()` bake. 13 tests (getX, getZ, getY, getHue with exported constants). |
| 03 | Interactive Scene Building | `[>]` | `gate-prototype` demo — place nodes on grid, wire them, toggle states (gate sim scaffolding). Foundations complete: `gridMath.js` (snapToGrid/gridToWorld, 12 tests), `useDynamicList` (swap-on-delete + dirty tracking, 16 tests), `useDynamicInstancedMesh` (add/remove/update/flush + capacity doubling, 15 tests). Next: gate factory, ground plane raycasting, wiring. |

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

> **Generative-art demos** (optional — see `generative-art-track.md`): cosine palette + animated plasma + Perlin noise field map to the first material/shaping/noise lessons (06-02/03/04) and are the re-entry taster set. fBm & domain warping, truchet tiles, voronoi, and kaleidoscope reinforce the shaping/noise lessons (06-03/04). Noise vertex displacement (organic blob) is the finale for the vertex-displacement lesson (06-05). Full resource links live in the track doc.

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

> **Generative-art demos** (optional — see `generative-art-track.md`): curl-noise flow-field particles and strange-attractor particles map to the GPU particles lesson (07-04) and are the gentlest real compute wins. Game of Life is the cellular-automata lesson (07-03). Reaction-diffusion (Gray-Scott) is the ping-pong "generative-art payoff" that graduates from Game of Life. Full resource links live in the track doc.

---

## Section 08: Capstone Projects

Applying everything learned to build the target project. Each lesson builds on the previous.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Logic Gate Simulator: Board & Data Model (CPU-first) | `[ ]` | Build a WORKING CPU/JS simulation first — DAG data model, gate types, JS evaluation with a correctness baseline, placement/wiring interaction, model loading. Establish a measured performance baseline to compare against later. |
| 02 | Logic Gate Simulator: GPU Evaluation (optimization) | `[ ]` | Port the evaluation hot path to a GPU compute shader AS AN OPTIMIZATION once scale justifies it. Explicit CPU-vs-GPU comparison measured against the JS-vs-GPU performance thresholds (Appendix A). |
| 03 | Logic Gate Simulator: Signal Propagation | `[ ]` | Multi-layer evaluation, animated signal flow, TSL materials for state |
| 04 | Logic Gate Simulator: Polish | `[ ]` | Post-processing (bloom), preset circuits, save/load, portfolio quality |

> **Target Project**: GPU-Enhanced Logic Gate Simulator inspired by Turing Complete. Built **CPU/JS-first, then GPU as an optimization** — a working JS simulation with a measured performance baseline comes before any compute-shader port, so the GPU step is a justified optimization with an explicit CPU-vs-GPU comparison. The interaction layer is scaffolded in Section 05-03, GPU evaluation uses patterns from Section 07, and visual feedback combines TSL materials with compute output.

---

## Section 09: Creative Extensions

Open-ended section for projects that emerge from student interests. Added as discovered.

| # | Lesson | Status | Description |
|---|--------|--------|-------------|
| 01 | Reaction-Diffusion Simulator | `[ ]` | Differential equations, pattern emergence, ping-pong buffers |
| 02 | Fractal Explorer | `[ ]` | Mandelbrot, Julia sets, infinite zoom, GPU-computed |
| 03 | Flow-field line art (Fidenza-style) | `[ ]` | Noise advection + stroke rendering — the generative line-art genre (needs makio-meshline/Line2) |
| 04 | Strange attractors (point cloud → GPU) | `[ ]` | Iterative attractor math → geometry; CPU-first then port to GPU (bridges 06→07) |
| 05 | Physarum / slime-mold | `[ ]` | Agent trails + deposit/diffuse — needs atomics (thin TSL support), a boss level |
| 06 | Boids / flocking | `[ ]` | Neighbor reads across particles + spatial hashing |
| 07 | N-body galaxy | `[ ]` | All-pairs / tiled particle interaction on GPU buffers |
| 08 | Differential line growth | `[ ]` | Node insertion + neighbor repulsion (like `useDynamicList`), grown line geometry |
| 09 | L-systems / fractal plants | `[ ]` | Grammar rewriting → turtle → line geometry |
| ?? | *(added as discovered)* | | |

> **Tangent-driven**: See `tangents-queue.md` for exploration ideas. Flame IFS fractals were promoted from tangent to curriculum (Section 07-02).
>
> **Generative Art Track**: Rows 03-09 are the ambitious generative-art "boss levels" and notable projects — full details, difficulty/TSL-fit flags, and resource links are in `docs/lessons/generative-art-track.md`.

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
| 2026-02-27 | 05 | 05-01 Raycasting & Object Selection (TresJS events) | Built object-picker demo: 4x4 torus knot grid with HSL color ramp, click-to-select (emissive highlight), hover feedback (emissive intensity), `useObject` composable, time-based click debounce (50ms). Learned TresJS pointer event naming (lowercase, not kebab), scale-on-hover raycaster recursion antipattern, TresCanvas custom renderer boundary. Standardized `useControls` return pattern across all demos. |
| 2026-02-28 | 05 | 05-01 Raycasting & Object Selection (manual Raycaster) | Built composable chain for manual raycasting: `useCanvas` (canvas ref), `useCanvasPoint` (mouse position on canvas), `useScenePoint` (NDC conversion), `use3dCanvasClick` (click hook), `useManualRaycaster` (THREE.Raycaster ray cast + intersection filtering). Extracted `screenMath.js` with 8 tests for NDC conversion, CSS vs canvas pixel handling on retina displays. Learned userData for mesh-object bridging, NDC as screen-to-world bridge, screen coordinate systems. |
| 2026-03-01 | 05 | 05-02 Instanced Rendering | Built `art-grid` demo: 100×100 InstancedMesh, sin/cos wave height, HSL color via mapRange, 230fps. Platform fixes: useFPS.updateFps(), control aria-labels, vite.config isCustomElement typo, vitest @/ alias. 13 tests with exported constants. Learned: single draw call performance win, Matrix4.setPosition(), setColorAt() + needsUpdate, `<primitive :object>` escape hatch, no-allocation render loop, geometry.rotateX() bake, MeshBasicMaterial for color-driven art, GC-inflated FPS reading, mapRange() utility, pure function extraction (getHue). |
| 2026-03-02 | 05 | 05-03 Interactive Scene Building (foundations) | Built `gridMath.js` (snapToGrid/gridToWorld, 12 tests), `useDynamicList` composable (swap-on-delete array + dirty set tracking, 16 tests), `useDynamicInstancedMesh` composable (dynamic InstancedMesh with add/remove/update/flush + capacity doubling + old mesh disposal, 15 tests). Scaffolded gate-prototype demo. Added `markAllDirty()` for resize support. Learned: dynamic array over-allocation (capacity vs count), dirty set for efficient GPU updates, InstancedMesh capacity management (resize = new mesh + dispose old), `BufferAttribute.needsUpdate` is write-only setter, `shallowRef` for identity-changing Three.js objects, VueUse `toRef` for flexible input. |
| 2026-07-18 | all | Learning-plan strategic audit | Higher-level audit. Decided: re-entry via TSL shader generative-art taster (cosine palette → plasma → noise field, Section 06) then finish 05-03 — supersedes the earlier hello-compute re-entry; capstone built CPU-first then GPU-as-optimization. Proposed (pending): demote Flame IFS to Sec 09, reorder Sec 07 (hello→GoL→particles), front-load GPU concept-scaffolding in Sec 06-07. See docs/plans/2026-07-18-project-audit-remediation.md. |

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
