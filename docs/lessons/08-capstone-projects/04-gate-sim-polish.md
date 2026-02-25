# Lesson 08-04: Logic Gate Simulator — Polish & Post-Processing

> **Section**: Capstone Projects
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Add post-processing effects (bloom/glow for active signals)
- [ ] Implement circuit save/load (JSON serialization)
- [ ] Build preset circuit library (half adder, full adder, SR latch, counter)
- [ ] Optimize performance for large circuits (1000+ gates)
- [ ] Create a polished, portfolio-ready demo

## Prerequisites

- Lesson 08-03: Logic Gate Simulator — Signal Propagation

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| Finished gate simulator | Portfolio-quality interactive demo |
| Preset circuit library | Pre-built circuits demonstrating increasing complexity |

## Key Concepts

### Post-Processing
- `EffectComposer` or TresJS post-processing integration
- `UnrealBloomPass` for signal glow (emissive surfaces bloom)
- Selective bloom: only active signals glow, not the whole scene
- Performance impact of post-processing (additional render passes)

### Circuit Serialization
- JSON format: gate positions, types, connections
- Save: serialize current circuit state
- Load: reconstruct scene from saved data
- Preset circuits as bundled JSON files

### Preset Circuit Library
Progressive complexity demonstrating the simulator's power:
1. NOT gate — simplest possible circuit
2. Half adder — AND + XOR, first multi-gate circuit
3. Full adder — two half adders + OR, carries
4. SR latch — (requires feedback handling — stretch goal)
5. 4-bit counter — (advanced, demonstrates scale)

### Performance Optimization
- Profiling: compute time, render time, post-processing time
- Buffer sizing: right-size buffers for actual circuit size
- Draw call budget: instancing for gates, batching for wires
- Frame budget monitoring: all three phases must fit in 16ms

## Demo Concept: "Gate Simulator" (Final)

The finished product. Gate palette, grid placement, wiring, input switches, output indicators, animated signal propagation with bloom glow. Preset circuits menu. Save/load functionality. Performance dashboard. This should look impressive in a portfolio.

### Stretch Goals
- Flip-flops and sequential logic (requires feedback/cycles — new evaluation strategy)
- Multiplexers, decoders, ALU components
- "Build a CPU" challenge: step-by-step guided circuit building
- Custom gate creation (user-defined truth tables)

## Connection to GPU Work

> This is the capstone — every skill from the entire curriculum comes together. Scene setup (Section 02), interaction (Section 05), TSL materials (Section 06), compute shaders (Section 07), and now post-processing. The stretch goals (sequential logic, ALU) push into new GPU compute territory if interest continues.

## Resources

- [Three.js - Post-Processing](https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing)
- [Turing Complete (game)](https://turingcomplete.game/)
