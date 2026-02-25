# Lesson 05-03: Interactive Scene Building

> **Section**: Interaction & Instancing
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Combine raycasting with instancing for interactive object management
- [ ] Implement keyboard input for mode switching (place, wire, delete)
- [ ] Build a graph data structure (nodes + edges) in Vue reactive state
- [ ] Render connections between objects (lines or thin cylinders)
- [ ] Toggle node state and propagate through connections (CPU-side)

## Prerequisites

- Lesson 05-01: Raycasting & Object Selection
- Lesson 05-02: Instanced Rendering

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `gate-prototype` demo | Place nodes, wire them, toggle states — gate simulator scaffolding |

## Key Concepts

### Interaction Modes
- Mode state machine: place → wire → delete → simulate
- Keyboard shortcuts for mode switching
- Visual feedback for current mode (cursor change, grid highlight)

### Graph Data Structure
- Nodes: `{ id, type, position, state }` — reactive array
- Edges: `{ from, to }` — connection list
- Topological considerations: directed vs undirected, cycles
- Vue reactivity with graph mutations (add/remove node, add/remove edge)

### State Propagation (CPU)
- Simple signal propagation: toggle a node, update connected nodes
- BFS or topological sort for evaluation order
- Animation: visible propagation delay per connection layer
- This reveals the CPU bottleneck for large graphs → motivation for GPU compute

### Rendering
- Nodes as instanced meshes (colored by state)
- Edges as Line2 or thin cylinder meshes
- Dynamic instance count (adding/removing nodes)

## Demo Concept: "Gate Prototype"

A grid-based board. Click to place nodes (simple colored cubes). Shift-click two nodes to wire them (line drawn between). Nodes can be toggled on/off. When toggled, signal propagates through connections with visible animation. Controls for grid size, propagation speed, node color scheme. This is the interaction layer of the logic gate simulator, prototyped with CPU-side logic.

## Connection to GPU Work

> This demo establishes the interaction model (placement, wiring, state toggling) that the gate simulator capstone will use. The CPU-side signal propagation you build here will be replaced by GPU compute in Section 07-08. At 50+ nodes with complex wiring, you'll start to feel the CPU limitation — that's the motivation for the GPU compute work ahead.

## Resources

- [Three.js - Line2](https://threejs.org/docs/#examples/en/lines/Line2)
- [Cientos - TransformControls](https://cientos.tresjs.org/guide/controls/transform-controls.html)
