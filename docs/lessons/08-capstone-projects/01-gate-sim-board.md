# Lesson 08-01: Logic Gate Simulator — Board & Data Model

> **Section**: Capstone Projects
> **Status**: `[ ]` Planned
> **Estimated Time**: 4-5 hours

## Learning Objectives

- [ ] Design a directed acyclic graph (DAG) data model for logic circuits
- [ ] Define gate types with truth table data (AND, OR, NOT, XOR, NAND, NOR)
- [ ] Implement the placement and wiring interaction from 05-03 with the real data model
- [ ] Load or create gate visual representations (glTF models or stylized instanced meshes)
- [ ] Assign topological layer ordering for evaluation sequencing

## Prerequisites

- Lesson 05-03: Interactive Scene Building (placement, wiring, state management)
- Lesson 07-01: Compute Shaders (understanding buffer layouts)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `gate-simulator` demo | Circuit board with gate placement, wiring, and CPU-side evaluation |

## Key Concepts

### Circuit Data Model
- Gate: `{ id, type, position, inputs: [gateId], output: boolean }`
- Gate types: AND, OR, NOT, XOR, NAND, NOR — each defined by truth table
- Connections: directed edges from output to input
- DAG constraint: no cycles (would cause infinite evaluation loops)
- Input switches: gates with no inputs, user-toggleable
- Output indicators: gates with no downstream connections, display state

### Topological Sort
- Evaluation order must respect dependencies
- Layer 0: input switches (no dependencies)
- Layer N: gates whose inputs are all in layer < N
- This ordering maps directly to GPU compute dispatch order

### Rendering
- Gate bodies: instanced meshes or loaded glTF models
- Gate symbols: text or icon overlay showing gate type
- Wires: Line2 or CylinderGeometry connecting output→input ports
- State coloring: active (bright) vs inactive (dim)

### Model Loading (if using glTF)
- `useGLTF` from Cientos for loading gate symbol models
- Or: procedural gate shapes using basic geometry + text
- Decision point: visual fidelity vs implementation speed

## Demo Concept: "Gate Board"

Grid-based circuit board. Gate palette on the side (AND, OR, NOT, etc.). Click grid to place a gate. Click output port → input port to wire. Toggle input switches. CPU-side evaluation shows output states. Preset circuits: NOT gate, half adder, SR latch. Validate button checks for cycles.

## Connection to GPU Work

> This establishes the data model and interaction layer. The next lesson ports the evaluation from CPU to GPU compute. The topological layer assignment you build here directly determines how the compute shader dispatches — one dispatch per layer, each layer reads previous layer's outputs.

## Resources

- [Turing Complete (game)](https://turingcomplete.game/) — inspiration
- [Cientos - useGLTF](https://cientos.tresjs.org/guide/loaders/use-gltf.html)
