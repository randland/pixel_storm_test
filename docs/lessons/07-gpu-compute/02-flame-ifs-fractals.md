# Lesson 07-02: Flame IFS Fractals

> **Section**: GPU Compute
> **Status**: `[ ]` Planned
> **Estimated Time**: 3-4 hours

## Learning Objectives

- [ ] Understand Iterated Function Systems (IFS) and the chaos game algorithm
- [ ] Implement nonlinear variations (sinusoidal, spherical, swirl, horseshoe)
- [ ] Accumulate point density into a 2D histogram buffer via compute shader
- [ ] Apply log-density mapping and color palettes for rendering
- [ ] Manage large compute workloads (millions of iterations per frame)

## Prerequisites

- Lesson 07-01: Compute Shaders — Hello Parallel World

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `flame-explorer` demo | Real-time flame fractal renderer with interactive controls |

## Key Concepts

### Iterated Function Systems
- Start with random points in 2D space
- Each iteration: randomly select a transform function, apply it to the point
- After many iterations, the point distribution forms a fractal pattern
- The "chaos game" — simple rules produce complex structure

### Flame Variations
- Linear: identity transform (affine only)
- Sinusoidal: `(sin(x), sin(y))` — smooth organic curves
- Spherical: `(x, y) / (x² + y²)` — inversion
- Swirl: rotation by `r²` — spiral patterns
- Horseshoe: `(1/r) * ((x-y)(x+y), 2xy)` — folding
- Each variation produces a different visual character
- Combining variations with weights creates unique flames

### Histogram Accumulation
- 2D grid buffer (e.g., 1024x1024) initialized to zero
- Each compute thread iterates a point many times
- After each iteration, increment the histogram cell at the point's position
- Atomic operations needed: multiple threads may hit the same cell
- `atomicAdd` for safe concurrent histogram updates

### Rendering the Histogram
- Raw histogram values span huge range (some cells hit millions of times)
- Log-density mapping: `brightness = log(hits + 1) / log(maxHits + 1)`
- Color palette: map iteration count or transform index to a color gradient
- Render as a textured quad or via fragment shader reading the histogram buffer

### Performance Considerations
- Millions of iterations per frame — this is what GPUs excel at
- Each thread runs independently — embarrassingly parallel
- Buffer size determines resolution (1024² = 1M cells)
- Iteration count per thread determines quality vs speed

## Demo Concept: "Flame Explorer"

A real-time flame fractal renderer. Controls for: variation selection (checkboxes for which variations to combine), variation weights, color palette choice, iteration count per frame, zoom/pan. Preset flames for known beautiful configurations. Export to PNG. The visual should be immediately striking — this is the payoff for learning compute shaders.

## Connection to GPU Work

> This is pure GPU compute applied to creative visual art. The pattern — millions of independent iterations, histogram accumulation, density-based rendering — is a template for many GPU algorithms. The atomic operations you learn here (safe concurrent writes to shared memory) are essential for the gate simulator's state buffer and any future simulation work.

## Resources

- [Flame Fractals - Wikipedia](https://en.wikipedia.org/wiki/Fractal_flame)
- [The Fractal Flame Algorithm - Scott Draves & Erik Reckase](https://flam3.com/flame_draves.pdf)
- [Electric Sheep](https://electricsheep.org/) — collaborative flame fractal screensaver
