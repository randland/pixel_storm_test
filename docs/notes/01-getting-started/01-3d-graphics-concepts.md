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

## Ready For

Lesson 01-02: Project Setup & Tooling - getting TresJS installed and the dev environment configured.
