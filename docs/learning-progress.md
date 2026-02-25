# Learning Progress

## Current Status
- **Phase**: Sections 01, 04 complete. Section 02 nearly complete (shadows remaining).
- **Branch**: `learn/nick`
- **Focus**: Finishing scene fundamentals, then interaction & instancing
- **Pattern**: Three.js examples-style demos with forward connection to GPU work

## Immediate Next Steps
1. ~~**Section 01**: Getting Started (3D concepts, setup, hello cube)~~ ✅ Complete
2. ~~**Section 04**: Platform Architecture (demo pattern, control panels, routing)~~ ✅ Complete
3. ~~**Section 02-01 to 02-03**: Scene/Renderer, Cameras, Lighting~~ ✅ Complete
4. **Section 02-04**: Shadows & Surfaces ← **NEXT** (shadows + materials consolidated lesson)
5. **Section 05**: Interaction & Instancing (raycasting, instanced rendering, gate prototype)
6. **Section 06**: Shader Foundations (GPU mindset, TSL materials, patterns, noise, displacement)
7. **Section 07**: GPU Compute (hello compute, flame fractals, Game of Life, GPU particles)
8. **Section 08**: Capstone — Logic Gate Simulator (board, GPU eval, signal propagation, polish)

## Curriculum Location
**Full outline**: `docs/lessons/00-curriculum-outline.md`
**Tangent parking lot**: `docs/lessons/tangents-queue.md`

## Skills Status
- [x] Vue 3 (expert)
- [x] Three.js mental models (scene graph, transforms, geometry/material/mesh, render loop)
- [~] TresJS integration (hello-cube, scene-config, lighting-basics demos; useLoop animation; renderer/scene/camera controls; OrbitControls; dolly zoom composable; light types + helpers)
- [ ] WebGPU programming
- [ ] TSL shaders

## Platform Requirements
- [x] Vue 3 + Vite foundation
- [x] TresJS integration
- [x] ESLint + Vitest tooling
- [x] Navigation system
- [x] Demo routing
- [x] Control panels (SliderControl, ColorControl, BooleanControl, OptionControl, auto-rendering ControlPanel, useNumericParam, useColorParam, useBooleanParam, useOptionParam)

---

## Project Essence

**Mission**: WebGPU + TresJS learning via Three.js examples-style demo platform
**Student**: Vue 3 expert progressing to WebGPU/TSL focus
**Pattern**: Structured demos with navigation, individual controls, progressive complexity

### Target Project: GPU-Enhanced Logic Gate Simulator
**Inspiration**: Turing Complete (the game)
**Goal**: Web-based circuit simulation with GPU-accelerated gate computation
**Why this is perfect for WebGPU**:
- Logic gates are embarrassingly parallel (each gate computes independently)
- Large circuits (1000s of gates) benefit massively from GPU compute
- Visual feedback (signal propagation, state changes) ties into rendering
- Progressive complexity: AND/OR/NOT → flip-flops → ALU → CPU

**Teaching examples to use**:
- When learning compute shaders: simulate a grid of logic gates
- When learning buffer management: circuit state as GPU buffers
- When learning synchronization: signal propagation through circuit layers

### Core Rules
- Build first, explain through code
- Simple commits → `/commit` skill; complex git → git-manager agent
- Subagents preserve context
- Never create files unless essential
- Edit existing over new

### Critical Agents
- **Git**: @.claude/agents/git-manager.md
- **Docs**: @.claude/agents/documentation.md

---

## Decisions Log

### Technology Stack

**TresJS for Vue 3 + Three.js Integration**
- Declarative component-based approach familiar to Vue developers
- Better integration with Vue's reactivity system
- Active maintenance and growing community

**WebGPU over WebGL Priority**
- Modern API with better compute shader support
- Future-focused technology (industry direction)
- Superior performance for particle systems and simulations
- Educational investment in cutting-edge techniques

**Three.js Examples-Style Platform**
- Clear topic-based navigation organization
- Individual URLs for deep-linkable demos
- Minimal UI with focus on graphics
- Source code access for learning

### Implementation Strategy

**JS vs GPU Calculation Guidelines**
- **JavaScript**: <500 elements, rapid prototyping, simple calculations
- **GPU**: >10,000 elements, complex compute operations, parallel processing

**Learning Architecture** (restructured 2026-02-24)
1. Scene Fundamentals: Sections 01-02 (shadows & surfaces remaining)
2. Interaction & Instancing: Section 05 (raycasting, instancing, gate prototype)
3. Shader Foundations: Section 06 (GPU mindset, TSL materials, patterns, noise, displacement)
4. GPU Compute: Section 07 (hello compute, flame fractals, Game of Life, GPU particles)
5. Capstone: Section 08 (Logic Gate Simulator — board, GPU eval, signal propagation, polish)
6. Creative Extensions: Section 09 (open-ended, tangent-driven)

### Demo Platform Framework (2026-02-12)

**UnoCSS (preset-wind4) for Utility CSS**
- Lightweight, performant utility-first CSS framework
- Chosen over SASS for demo platform styling

**Convention-Based Demo Discovery**
- Demos live at `src/demos/{name}/index.vue`, auto-discovered via `import.meta.glob`
- `useDemoRegistry` composable provides demo list and metadata
- `useDemoRouter` composable handles URL-based demo selection via VueUse `useUrlSearchParams`

**Experience Pattern for Demo Architecture**
- UI and 3D scene separated: `index.vue` (UI + controls) wraps `Experience.vue` (TresCanvas scene)
- Shared reactive params via `useNumericParam` composable (co-located with demo)
- Enables clean separation of concerns between DOM controls and 3D rendering

### Animation & Control Panel Patterns (2026-02-19)

**useLoop for Animation**
- TresJS `useLoop` with delta-based rotation on all 3 axes
- Frame-rate independent animation via delta time

**Type-Driven Control Panel**
- `useNumericParam` extended with `type: 'number'`, `useColorParam` with `type: 'color'`
- `ControlPanel.vue` auto-renders controls based on param type ('number' -> SliderControl, 'color' -> ColorControl)
- `useColorParam` composable with hex/RGB reactive conversion via `colorUtils.js`
- New files: `ControlPanel.vue`, `ColorControl.vue`, `useColorParam.js`, `colorUtils.js`

### Scene Configuration & Camera Patterns (2026-02-24)

**useTres() Access Patterns**
- `renderer` is a plain object — direct property access (`renderer.toneMappingExposure`)
- `scene` is a ShallowRef — needs `.value` (`scene.value.background`, `scene.value.fog`)
- `camera` is a ref — empty during setup, requires lazy init or watchers

**Named Setter + Immediate Watcher Pattern**
- Define `const setX = () => { /* apply to Three.js object */ }` then `watch(param, setX, { immediate: true })`
- Ensures initial sync and ongoing reactivity for Three.js objects that can't use template bindings

**TresJS Component Resolution**
- `Tres*` components auto-resolve from THREE namespace (TresMesh, TresBoxGeometry, etc.)
- Cientos components (OrbitControls) must be explicitly imported from `@tresjs/cientos`

**New Control Types**
- `useBooleanParam` + `BooleanControl` for toggle switches
- `useOptionParam` + `OptionControl` for dropdown selections
- `useColorParam` now exposes `.color` property (Three.js Color object) directly

**Renamed useParam to useNumericParam**
- Clearer naming now that multiple param types exist (numeric, color, boolean, option)

### Dolly Zoom & Composable Patterns (2026-02-24)

**Pure Math Utility for Testability**
- `dollyZoomMath.js`: `dollyZoomDistance(baseDistance, baseFovDeg, newFovDeg)` — `d_new = d_base * tan(baseFov/2) / tan(newFov/2)`
- No Three.js dependency in the math layer — testable with plain Vitest
- 4 tests including invariant property test (identity at base FOV)

**Composable State Machine (useDollyZoom)**
- Captured state pattern: `baseDistance` lazy-initialized on first use, persists across watcher calls
- Separation of concerns: watcher moves camera position, `effectiveFov` computed handles FOV, neither mutates the other's domain
- Integrates with OrbitControls via Cientos wrapper chain

**Cientos Wrapper Chain**
- `orbitControls.value?.instance` — instance IS the Three.js object directly (not `.instance.value`)
- Version-specific behavior: Cientos wraps the Three.js control, `.instance` returns the unwrapped object

**FOV Clamping**
- `tan(fov/2)` approaches infinity near 180 degrees — must clamp `effectiveFov` to safe range
- Known limitation: FOV slider change while dolly zoom active causes slight visual jump (dollyZoom resets, camera returns to baseDistance)

### Lighting & Imperative Helpers (2026-02-24)

**Imperative Helper Pattern for TresJS**
- Three.js light helpers (DirectionalLightHelper, PointLightHelper, SpotLightHelper) need imperative `scene.add()`/`scene.remove()` — cannot use TresJS declarative templates
- `useLightHelper` composable manages helper lifecycle: creates helper from light ref, toggles via boolean param, cleans up on scope dispose
- Pattern: watch a boolean toggle → `scene.value.add(helper)` or `scene.value.remove(helper)`

**Geometry vs Mesh Props**
- Position, rotation, scale go on the **mesh** (the scene graph node), not the geometry
- Geometry defines shape; mesh defines placement — `:args` on geometry for constructor params, props on mesh for transforms

**TresJS `:args` vs Props**
- `:args` maps to Three.js constructor arguments (e.g., `<TresSphereGeometry :args="[1, 32, 32]">`)
- Props map to property setters after construction (e.g., `:position="[0, 1, 0]"` calls `.position.set()`)

**BooleanControl Bug Fix**
- Checkbox `$event.target.value` returns string `"on"` — must use `$event.target.checked` for boolean

**useFPS Composable**
- Singleton frame counter using rolling 500ms window for stable FPS display
- Displayed in DemoSelector header

### Historical Context

**Previous Phase Completed**: LED demo projects with Perlin noise
- LED Grid: 15x30 triangular grid, 60fps performance
- Vue 3 + Three.js integration patterns established
- Moved to fresh architecture for WebGPU focus

---

## Agent Context
**Ready for WebGPU + TresJS demo platform development.**

**Detailed progression**: @docs/context-modules/learning-phases.md
**Platform architecture**: @docs/context-modules/platform-specs.md
**Success metrics**: @docs/context-modules/progress-tracking.md

---

## Session Log

| Date | Focus | Key Accomplishments |
|------|-------|---------------------|
| 2026-02-24 | Section 02: Scene & Renderer, Cameras & Controls | Git cleanup (deleted useCounter, .gitignore update). Renamed `useParam` → `useNumericParam`. Built scene-config demo with randomized objects, renderer controls (exposure), scene controls (background, fog), camera controls (FOV/near/far), OrbitControls. Added `useBooleanParam`, `useOptionParam`, `BooleanControl`, `OptionControl`. `useColorParam` now exposes `.color` (Three.js Color). Discovered useTres() return types and named setter + immediate watcher pattern. Dolly zoom refactored: pure math utility (`dollyZoomMath.js` + 4 tests), `useDollyZoom` composable with state machine, Cientos wrapper chain discovery (`.instance` not `.instance.value`), cleaned up Experience.vue (~25 lines replaced with composable call). |
| 2026-02-24 (evening) | Section 02: Lighting Basics | Built lighting-basics demo with ground plane + varied geometry (sphere, box, cone, cylinder, torus, torus knot). Four light types with full interactive controls: AmbientLight, DirectionalLight, PointLight, SpotLight. Built `useLightHelper` composable (imperative scene.add/remove toggle). Built `useFPS` composable (singleton rolling 500ms window). Fixed BooleanControl bug (`$event.target.value` → `$event.target.checked`). Added `overflow-y-auto` to ControlPanel. Learned geometry vs mesh props, `:args` vs props in TresJS, imperative helper management. |

*Updated*: 2026-02-24
