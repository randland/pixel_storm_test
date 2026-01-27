# Notes: Lesson 01-01 - 3D Graphics Concepts

> **Date**: 2026-01-26
> **Session focus**: Building mental models for 3D graphics

---

## Key Insight: The Abstraction Stack

The relationship between layers finally clicked:
```
My code → Vue → DOM → Screen
My code → Three.js → WebGL/WebGPU → Screen
```

TresJS sits on top of Three.js the same way Vue sits on top of the DOM. It lets me write 3D scenes declaratively as components instead of imperative setup code.

**Why this matters**: I can think in terms of scenes and objects, not low-level GPU operations.

---

## The Scene Graph = A Tree

This is the most important mental model. Everything in 3D is a tree structure, like the DOM:

```
Scene (root)
├── Camera
├── Light
├── Mesh
│   ├── Geometry (shape)
│   └── Material (appearance)
└── Group (container)
    └── child meshes...
```

**Key realization**: Transforms (position, rotation, scale) are relative to the parent. If I rotate a Group, all its children rotate around the Group's origin. This is like CSS transforms on a parent element.

**Use case**: Solar system → parent moons to planets, planets to sun. Arm with hand → parent hand to arm.

---

## The Three Essentials

Every scene needs:
1. **Scene** - container for all objects
2. **Camera** - defines viewpoint
3. **Renderer** - turns scene into pixels

TresJS gives me Scene + Renderer through `<TresCanvas>`. I mostly think about objects and camera.

---

## Render Loop Runs Constantly

Unlike Vue (reactive, re-renders on change), 3D runs a constant loop ~60fps:

```
1. Browser: "ready for frame"
2. Update object positions/rotations
3. Render scene
4. Repeat forever
```

**Gotcha I'll hit later**: `rotation += 0.1` per frame = different speeds on different refresh rates. Need "delta time" to fix.

---

## Materials and Lighting

My initial guess was wrong! What you see depends on material type:

| Material | Needs Light? | Use Case |
|----------|--------------|----------|
| MeshBasicMaterial | No | Debugging, UI, flat style |
| MeshStandardMaterial | Yes | Realistic surfaces |
| MeshPhongMaterial | Yes | Shiny surfaces |

`BasicMaterial` is "unlit" - good for getting started but looks flat.

---

## Coordinate System

Right-handed:
- **Y** is up
- **Z** comes toward me
- **X** goes right

Position (2, 0, -5) = 2 right, ground level, 5 units INTO the screen

---

## Misconceptions Corrected

1. **Groups don't improve performance** - they're organizational only. Performance comes from InstancedMesh, merged geometries, LOD.

2. **Meshes without light aren't invisible** - they're black (for lit materials) or normal (for BasicMaterial).

---

## Questions I Have

- How does TresJS handle reactivity with Three.js objects? Does changing a ref automatically update the 3D scene?
- What's the performance cost of the constant render loop when nothing changes?
- When should I use WebGPU vs WebGL renderer?

---

## Deep Dive: Transforms and Hierarchy

Transforms cascade from parent to child. Position/rotation/scale are relative to parent.

```
Group (y=5, rotated 45° on Y)
├── Mesh A (local pos: -2, 0, 0) → world pos affected by group
└── Mesh B (local pos: 2, 0, 0) → also affected
```

Rotating the Group rotates children **around the Group's origin**, not the world origin or their own centers.

**Three.js uses SRT order internally**: Scale → Rotation → Translation. The order I set properties in code doesn't matter - the matrix computation order is fixed.

---

## Deep Dive: Camera Types

| Type | Use Case | Characteristic |
|------|----------|----------------|
| Perspective | Games, realistic | Far = smaller, lines converge |
| Orthographic | 2D in 3D, CAD, diagrams | No perspective distortion |

For LED grid: either works - ortho for "what you see is what you get", perspective for physical installation feel.

---

## Deep Dive: Geometry/Material/Mesh

- **Geometry**: Shape data (heavy, reuse it)
- **Material**: Surface properties (lighter, can vary)
- **Mesh**: Geometry + Material in scene (instance)

450 LEDs = 1 SphereGeometry + 450 Materials + 450 Meshes. Geometry is shared in GPU memory.

For 10,000+ objects: InstancedMesh (single draw call with per-instance attributes).

---

## Deep Dive: Delta Time

```javascript
// BAD: 144Hz runs 2.4x faster than 60Hz
cube.rotation.y += 0.01

// GOOD: Consistent speed regardless of frame rate
cube.rotation.y += 1.0 * deltaTime  // 1 radian per second
```

TresJS `useLoop` provides delta time automatically.

---

## Misconceptions Fixed

1. **Groups don't improve performance** - they're for transform organization
2. **MeshStandardMaterial without light = black** (not invisible)
3. **MeshBasicMaterial ignores light** - shows color regardless
4. **Transform order in code doesn't matter** - Three.js uses fixed SRT internally

---

## Ready For

Lesson 01-02: Project Setup & Tooling - getting TresJS installed and the dev environment configured.
