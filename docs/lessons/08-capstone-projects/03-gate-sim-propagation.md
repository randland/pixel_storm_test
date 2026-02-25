# Lesson 08-03: Logic Gate Simulator — Signal Propagation & Visualization

> **Section**: Capstone Projects
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Animate signal propagation through wires with per-layer timing
- [ ] Use TSL materials to drive gate/wire appearance from compute output
- [ ] Combine compute data with time-based animation for smooth transitions
- [ ] Implement color coding for signal states (inactive, signal-0, signal-1)

## Prerequisites

- Lesson 08-02: Logic Gate Simulator — GPU Evaluation
- Lesson 06-03: Shaping Functions & Patterns (smoothstep for transitions)
- Lesson 06-02: TSL — Your First Custom Material (custom node materials)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| Animated signal propagation | Visual flow of signals through the circuit |
| TSL gate materials | Gate appearance driven by compute state |

## Key Concepts

### Signal Animation
- When an input toggles, signals propagate layer by layer
- Each layer has a time offset: `layer * propagationDelay`
- Wire color transitions smoothly from inactive → active using `smoothstep(time - layerOffset)`
- Gate "flash" when they evaluate: brief emissive pulse

### TSL Material Integration
- Gate material reads from the compute output state buffer
- `colorNode`: `mix(inactiveColor, activeColor, stateValue)`
- `emissiveNode`: pulse on state change using `smoothstep` + `time`
- Wire material: gradient along wire length showing signal travel

### Multi-Pass Compute
- Evaluation pass: compute gate outputs (from 08-02)
- Animation pass: compute per-gate/wire animation timing
- Both feed into TSL materials for rendering

### Visual Design
- Inactive: gray/dim (both gates and wires)
- Signal 0: dim blue
- Signal 1: bright green
- Transition: smooth blend over ~200ms per layer
- Gate evaluation: brief white flash

## Demo Concept

Toggle an input switch. Watch the signal flow through the circuit: wires light up layer by layer, gates flash as they evaluate, output indicators update. Speed control: real-time, slow-motion, step-by-step. This is where TSL materials (Section 06) meet compute shaders (Section 07) in a single unified system.

## Connection to GPU Work

> This lesson combines everything: compute shaders produce state, TSL materials visualize state, animation timing makes it feel alive. The compute-to-render pipeline from GPU Particles (07-04) is the same pattern, now with meaningful domain logic instead of physics.

## Resources

- [Three.js - Node Materials](https://threejs.org/docs/#api/en/nodes/Nodes)
