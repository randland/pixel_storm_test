# Learning Progress

## Current Status
- **Phase**: Section 01 complete, Section 04 nearly complete, Section 02 in progress
- **Branch**: `learn/nick`
- **Focus**: Scene fundamentals — renderer/scene/camera configuration, dolly zoom effect
- **Pattern**: Three.js examples-style demos

## Immediate Next Steps
1. ~~**Lesson 01-01**: 3D Graphics Concepts (mental models)~~ ✅ Complete
2. ~~**Lesson 01-02**: Project Setup & Tooling (ESLint, Vitest, TresJS)~~ ✅ Complete
3. ~~**Lesson 01-03**: Hello Cube (first working demo)~~ ✅ Complete
4. ~~**Section 04**: Platform Architecture (animation, color controls, auto-rendering ControlPanel)~~ ✅ Substantial progress
5. ~~**Section 02-01**: Scene & Renderer (scene-config demo, renderer/scene controls)~~ ✅ Complete
6. **Section 02-02**: Cameras & Controls (FOV/near/far sliders, OrbitControls, dolly zoom in progress) ← **IN PROGRESS**

## Curriculum Location
**Full outline**: `docs/lessons/00-curriculum-outline.md`
**Tangent parking lot**: `docs/lessons/tangents-queue.md`

## Skills Status
- [x] Vue 3 (expert)
- [x] Three.js mental models (scene graph, transforms, geometry/material/mesh, render loop)
- [~] TresJS integration (hello-cube, scene-config demos; useLoop animation; renderer/scene/camera controls; OrbitControls)
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

**Learning Architecture**
1. Phase 1: TresJS + WebGPU Foundation (2-3 weeks)
2. Phase 2: GPU Computing Introduction (3-4 weeks)
3. Phase 3: Advanced WebGPU Graphics (4-6 weeks)
4. Phase 4: Creative Applications (4-6 weeks)

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
| 2026-02-24 | Section 02: Scene & Renderer, Cameras & Controls | Git cleanup (deleted useCounter, .gitignore update). Renamed `useParam` → `useNumericParam`. Built scene-config demo with randomized objects, renderer controls (exposure), scene controls (background, fog), camera controls (FOV/near/far), OrbitControls. Added `useBooleanParam`, `useOptionParam`, `BooleanControl`, `OptionControl`. `useColorParam` now exposes `.color` (Three.js Color). Discovered useTres() return types and named setter + immediate watcher pattern. Dolly zoom coded but has two known bugs. |

*Updated*: 2026-02-24
