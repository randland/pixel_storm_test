# Lesson 06-04: Noise & Procedural Generation

> **Section**: Shader Foundations
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Understand how noise functions create organic-looking randomness
- [ ] Implement value noise, Perlin noise, and simplex noise concepts in TSL
- [ ] Use fractal Brownian motion (fBm) to layer noise at multiple octaves
- [ ] Apply noise for both color variation and vertex displacement
- [ ] Know when to use which noise type (value vs Perlin vs simplex)

## Prerequisites

- Lesson 06-03: Shaping Functions & Patterns

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `noise-explorer` demo | Interactive noise visualization with displacement |

## Key Concepts

### Why Noise?
- Random values (`Math.random()`) look like static — no spatial coherence
- Noise functions produce smooth, continuous randomness — organic textures
- Same input always produces same output — deterministic but looks random

### Noise Types
- **Value noise**: random grid values + interpolation — simple, slightly blocky
- **Perlin noise**: gradient vectors + dot product + interpolation — smoother, classic
- **Simplex noise**: fewer lookups, less directional artifacts — best quality/performance
- TSL may provide built-in noise nodes; otherwise implement via `Fn()`

### Fractal Brownian Motion (fBm)
- Layer noise at increasing frequencies and decreasing amplitudes
- `fBm(p) = noise(p) + 0.5 * noise(2p) + 0.25 * noise(4p) + ...`
- `octaves`: number of layers (more = more detail)
- `lacunarity`: frequency multiplier per octave (usually 2.0)
- `gain`: amplitude multiplier per octave (usually 0.5)

### Vertex Displacement
- `positionNode = positionLocal.add(normalLocal.mul(noise(positionLocal)))`
- Push vertices along their normals by noise amount → terrain, organic shapes
- High vertex count needed for smooth displacement results

## Demo Concept: "Noise Explorer"

A subdivided plane (high vertex count) with both color and displacement driven by noise. Controls for: noise type, octaves (1-8), frequency, amplitude, animation speed. A 2D preview panel shows the noise as a grayscale image. Toggle displacement on/off. Compare noise types side-by-side.

## Connection to GPU Work

> Noise is how you make GPU-generated visuals look organic. In the gate simulator: noise can drive subtle visual effects (signal jitter, heat maps, circuit board textures). In flame fractals: noise adds variation to color palettes. This lesson also exercises the TSL `Fn()` pattern for writing substantial custom functions — the same pattern used for compute shader kernels.

## Resources

- [The Book of Shaders - Noise](https://thebookofshaders.com/11/)
- [The Book of Shaders - Fractal Brownian Motion](https://thebookofshaders.com/13/)
- [Simplex Noise Demystified - Stefan Gustavson](http://staffwww.itn.liu.se/~stegu/simplexnoise/)
