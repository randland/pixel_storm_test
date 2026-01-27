# Learning Progress

## Current Status
- **Phase**: Section 01 - Getting Started
- **Branch**: `learn/fresh-architecture`
- **Focus**: WebGPU + TresJS integration
- **Pattern**: Three.js examples-style demos

## Immediate Next Steps
1. ~~**Lesson 01-01**: 3D Graphics Concepts (mental models)~~ ✅ Complete
2. **Lesson 01-02**: Project Setup & Tooling (ESLint, Vitest, TresJS) ← **NEXT**
3. **Lesson 01-03**: Hello Cube (first working demo)

## Curriculum Location
**Full outline**: `docs/lessons/00-curriculum-outline.md`
**Tangent parking lot**: `docs/lessons/tangents-queue.md`

## Skills Status
- [x] Vue 3 (expert)
- [x] Three.js mental models (scene graph, transforms, geometry/material/mesh, render loop)
- [ ] TresJS integration
- [ ] WebGPU programming
- [ ] TSL shaders

## Platform Requirements
- [x] Vue 3 + Vite foundation
- [ ] TresJS integration
- [ ] Navigation system
- [ ] Demo routing
- [ ] Control panels

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
- Git-manager agent for ALL changes
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

*Updated*: 2026-01-26
