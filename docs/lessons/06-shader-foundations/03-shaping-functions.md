# Lesson 06-03: Shaping Functions & Patterns

> **Section**: Shader Foundations
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Master `step`, `smoothstep`, `mix` as the core vocabulary of procedural graphics
- [ ] Use `fract` and `mod` to create repeating patterns
- [ ] Combine shaping functions to build stripes, grids, radial patterns, animated transitions
- [ ] Understand how these functions transfer directly between TSL, GLSL, and WGSL

## Prerequisites

- Lesson 06-02: TSL — Your First Custom Material

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `pattern-lab` demo | Interactive pattern generator with visible TSL code |

## Key Concepts

### Core Shaping Functions
- `step(edge, x)`: returns 0 below edge, 1 above — hard binary threshold
- `smoothstep(a, b, x)`: returns 0 below a, 1 above b, smooth transition between — soft edge
- `mix(a, b, t)`: linear interpolation, `a * (1-t) + b * t` — blending
- `clamp(x, min, max)`: constrain to range

### Repetition Functions
- `fract(x)`: fractional part — creates repeating 0→1 ramps
- `mod(x, y)`: modulo — creates repeating patterns with custom period
- `abs(x)`: mirror/fold — symmetric patterns

### Pattern Building
- Stripes: `step(0.5, fract(uv.x * 10))`
- Smooth stripes: `smoothstep(0.4, 0.5, fract(uv.x * 10))`
- Grid: combine x and y stripes
- Circles: `length(uv - 0.5)` → `step` or `smoothstep`
- Radial gradient: `distance(uv, center)`
- Animation: add `time` to the input of any pattern

### Transferability
- These functions are identical in TSL, GLSL, WGSL, and even shadertoy
- Learning them once teaches you the universal language of GPU graphics
- The Book of Shaders uses these same building blocks

## Demo Concept: "Pattern Laboratory"

A flat plane with a TSL material. The control panel selects a pattern category (stripes, grid, circles, radial, waves) and offers controls for frequency, amplitude, edge softness, color palette, animation speed. Each pattern shows the TSL code that generates it. This demo is a reference tool to return to later.

## Connection to GPU Work

> These are the visual vocabulary for everything ahead. In the gate simulator: `smoothstep` defines glow edges around active gates, `mix` blends between off-color and on-color based on signal value, `fract` creates repeating wire patterns. In flame fractals: shaping functions map density values to colors. You'll use these in every TSL material you write.

## Resources

- [The Book of Shaders - Shaping Functions](https://thebookofshaders.com/05/)
- [The Book of Shaders - Patterns](https://thebookofshaders.com/09/)
