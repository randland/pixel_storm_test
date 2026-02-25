# Lesson 06-05: Vertex Displacement & Animation

> **Section**: Shader Foundations
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Use `positionNode` to deform geometry in the vertex shader
- [ ] Understand how displacement affects normals and lighting
- [ ] Create time-based vertex animations (ripples, breathing, waves)
- [ ] Know the relationship between vertex count and displacement resolution
- [ ] Combine noise displacement with shaping functions for complex effects

## Prerequisites

- Lesson 06-04: Noise & Procedural Generation

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `living-geometry` demo | Animated, deforming meshes with multiple displacement modes |

## Key Concepts

### Vertex Displacement
- `positionNode = positionLocal.add(normalLocal.mul(displacement))`
- Displacement along normals: pushes surface outward/inward
- Displacement along axes: stretching, squashing, skewing
- Vertex count determines displacement quality (more vertices = smoother)

### Normal Recomputation
- Displacing vertices invalidates the original normals
- Without correction: lighting looks flat on displaced surfaces
- Options: recompute normals analytically, use `normalNode`, or accept the artifact
- Analytical: sample displacement at neighboring points, compute cross product

### Animated Displacement
- `sin(positionLocal.x.mul(freq).add(time))` — traveling wave
- Radial waves: `sin(length(positionLocal.xz).mul(freq).sub(time))`
- Breathing: `sin(time.mul(speed)).mul(amplitude)` on all normals
- Combining: wave + noise + breathing for organic motion

### Performance
- High vertex count = smooth displacement but more compute per frame
- `<TresSphereGeometry :args="[1, 128, 128]">` — 16k+ vertices for smooth sphere
- LOD considerations for distant objects (not critical yet, note for later)

## Demo Concept: "Living Geometry"

A smooth sphere that breathes (sinusoidal scale along normals) with wave ripples across its surface. Toggle between displacement modes: breathing, ripple, noise terrain, explosion (vertices fly outward). Wireframe overlay toggle shows the vertex-level deformation. A "freeze frame" control stops animation for inspection. Controls for amplitude, frequency, wave speed.

## Connection to GPU Work

> Vertex displacement completes your TSL material toolkit — you now control color, emission, opacity, normals, AND position. In the gate simulator: gates could pulse upward when receiving a signal, wires could bulge as signals travel through. More importantly, understanding that the vertex shader runs per-vertex in parallel is the same mental model as compute shaders running per-element in parallel.

## Resources

- [Three.js - positionNode examples](https://threejs.org/examples/?q=tsl)
- [The Book of Shaders - Cellular Noise](https://thebookofshaders.com/12/)
