# Lesson 05-01: Raycasting & Object Selection

> **Section**: Interaction & Instancing
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Understand how raycasting converts 2D screen coordinates to 3D world intersections
- [ ] Use TresJS event system (@click, @pointer-enter, @pointer-leave) for basic interaction
- [ ] Use Three.js Raycaster directly for more control
- [ ] Implement hover and selection visual feedback (emissive highlight, scale)
- [ ] Know NDC (Normalized Device Coordinates) and how mouse position maps to 3D space

## Prerequisites

- Lesson 02-04: Shadows & Surfaces (materials for visual feedback)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `object-picker` demo | Interactive object selection with hover and click feedback |

## Key Concepts

### Raycasting
- `Raycaster` API: `setFromCamera(ndcCoords, camera)`, `intersectObjects()`
- NDC: mouse position normalized to [-1, 1] range
- Intersection results: `point`, `distance`, `face`, `object`
- Performance: raycasting against bounding volumes vs full geometry

### TresJS Events
- `@click`, `@pointer-enter`, `@pointer-leave`, `@pointer-move`
- Event object contains intersection data
- When to use TresJS events vs manual raycasting

### Visual Feedback
- Emissive color change on hover/select
- Scale animation on hover (subtle)
- Object identification via `userData`, `name`

## Demo Concept: "Object Picker"

A grid of varied objects (spheres, cubes, cylinders with different colors). Click to select (emissive highlight). Hover shows a subtle scale-up. Selected object's material properties appear in the control panel for live editing. Performance counter shows raycast timing.

## Connection to GPU Work

> Raycasting is the first time you encounter the GPU answering questions — "what object is at this screen position?" is a spatial query. The logic gate simulator needs exactly this for selecting and wiring gates. Later, GPU-accelerated picking (via render-to-texture with object IDs) will make this scale to millions of objects.

## Resources

- [Three.js - Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)
- [TresJS - Events](https://docs.tresjs.org/guide/events.html)
