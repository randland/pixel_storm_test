# Lesson 08-02: Logic Gate Simulator — GPU Evaluation

> **Section**: Capstone Projects
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Port gate evaluation from CPU JavaScript to GPU compute shader
- [ ] Encode gate types and truth tables in GPU buffer data
- [ ] Read input states from a shared state buffer in the compute kernel
- [ ] Implement layer-by-layer evaluation dispatch
- [ ] Verify correctness against the CPU reference implementation

## Prerequisites

- Lesson 08-01: Logic Gate Simulator — Board & Data Model
- Lesson 07-03: Cellular Automata (ping-pong buffers, neighbor reads)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| GPU evaluation engine | Compute shader that evaluates all gates in parallel |
| Correctness tests | CPU vs GPU output comparison |

## Key Concepts

### Buffer Layout
- Gate buffer: `{ type, inputA_index, inputB_index, layer }` per gate
- State buffer: `{ output }` per gate — ping-pong for read/write separation
- Layout must respect GPU alignment rules (vec3 → 16-byte padding)

### Compute Kernel
- Each thread evaluates one gate
- Read gate type and input indices from gate buffer
- Read input values from state buffer (previous frame)
- Apply truth table logic based on gate type
- Write output to state buffer (current frame)
- TSL conditionals: `If(gateType.equal(AND), inputA.and(inputB))`

### Layer-by-Layer Dispatch
- Layer 0 (input switches): no compute needed, state set by user
- Layer 1: dispatch compute for all layer-1 gates (reads layer-0 outputs)
- Layer N: dispatch compute for all layer-N gates (reads layer <N outputs)
- Alternative: single dispatch with barrier between layers (more advanced)

### Correctness Verification
- CPU reference implementation: JavaScript evaluation of same circuit
- Compare CPU output vs GPU output for test circuits
- Edge cases: NOT gate (single input), fan-out (one output feeds multiple inputs)

## Demo Concept

Extend the Gate Board demo. Add "CPU Evaluate" and "GPU Evaluate" buttons. For small circuits, both produce the same result instantly. For large auto-generated circuits (1000+ gates), show timing comparison. Benchmark mode: random circuits of increasing size, chart CPU vs GPU evaluation time.

## Connection to GPU Work

> This is the payoff. Thousands of gates evaluated in parallel, in microseconds. The pattern you learned in Game of Life (read neighbors, compute new state, ping-pong buffers) now applies to arbitrary graph structures instead of fixed spatial grids.

## Resources

- [Three.js - Compute Shader patterns](https://threejs.org/examples/?q=compute)
