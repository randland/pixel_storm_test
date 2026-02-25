# Lesson 07-03: Cellular Automata (Game of Life)

> **Section**: GPU Compute
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Implement ping-pong (double) buffering for stateful GPU computation
- [ ] Read neighbor data from a 2D grid in a compute shader
- [ ] Understand read/write buffer separation to prevent race conditions
- [ ] Control simulation speed (steps per frame, pause, step-through)
- [ ] Handle grid boundary conditions (wrapping, clamping)

## Prerequisites

- Lesson 07-01: Compute Shaders — Hello Parallel World
- Lesson 07-02: Flame IFS Fractals (buffer management experience)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `gpu-game-of-life` demo | GPU-accelerated Game of Life with interactive cell toggling |

## Key Concepts

### Ping-Pong Buffers
- Problem: if every cell reads AND writes the same buffer, results depend on execution order
- Solution: read from buffer A, write to buffer B, then swap
- `bufferA` (previous state) → compute reads → `bufferB` (new state) → swap → repeat
- This guarantees all cells see the same "previous" state regardless of execution order

### Neighbor Reads
- Each cell needs to count its 8 neighbors (Moore neighborhood)
- 2D index math: `index = y * width + x`
- Neighbor offsets: `(-1,-1), (0,-1), (1,-1), (-1,0), (1,0), (-1,1), (0,1), (1,1)`
- Boundary handling: wrap around (torus topology) or clamp (dead border)

### Conway's Rules (in compute shader)
- Count live neighbors from the "read" buffer
- Live cell + 2-3 neighbors → survives
- Dead cell + exactly 3 neighbors → born
- All other cases → dies
- Write result to the "write" buffer

### Simulation Control
- Steps per frame: run N compute dispatches before rendering
- Pause/resume: skip compute dispatch, keep rendering
- Step-through: single compute dispatch on button press
- Speed control: useful for understanding pattern evolution

## Demo Concept: "GPU Game of Life"

A 256x256 grid (65,536 cells) rendered as instanced flat squares colored by state. Click to toggle cells on/off. Preset patterns: glider, glider gun, R-pentomino, Gosper gun. Controls for: grid size (64² to 1024²), simulation speed, color theme, boundary mode (wrap/clamp). Step-through mode for studying pattern evolution. FPS counter showing that even 1M cells runs smoothly.

## Connection to GPU Work

> This is the exact computational pattern the gate simulator uses. Logic gates have state (output), they read their inputs (neighbors/connections), and they compute new state based on rules (truth tables). Ping-pong buffers prevent read-write conflicts. The only difference: Game of Life has fixed spatial neighbors, while the gate simulator has arbitrary graph connections. Master this pattern here, apply it to gates later.

## Resources

- [WebGPU Game of Life Tutorial](https://codelabs.developers.google.com/your-first-webgpu-app)
- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
