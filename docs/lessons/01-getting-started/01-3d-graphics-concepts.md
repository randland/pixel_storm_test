# Lesson 01-01: 3D Graphics Concepts

> **Section**: Getting Started
> **Status**: `[x]` Complete
> **Completed**: 2026-01-26

## Learning Objectives

By the end of this lesson, you will:
- [x] Understand what Three.js is and why it exists (WebGL abstraction)
- [x] Grasp the scene graph mental model (scene → objects → children)
- [x] Know the three essential components: Scene, Camera, Renderer
- [x] Understand how TresJS wraps Three.js for Vue developers
- [x] Have a mental model of the render loop (request frame → update → render)

## Prerequisites

- Vue 3 Composition API experience (you have this!)
- Basic understanding of coordinate systems (x, y, z)

## Key Concepts

### The Three.js Ecosystem
- **Three.js**: JavaScript library that abstracts WebGL complexity
- **WebGL**: Browser API for GPU-accelerated graphics
- **TresJS**: Vue 3 wrapper that makes Three.js declarative

### The Scene Graph
```
Scene (container for everything)
├── Camera (viewpoint)
├── Light (illumination)
├── Mesh (visible object)
│   ├── Geometry (shape)
│   └── Material (appearance)
└── Group (organizational container)
    └── More meshes...
```

### The Render Loop
```
┌─────────────────────────────────┐
│  1. Request animation frame     │
│  2. Update object properties    │
│  3. Render scene through camera │
│  4. Repeat                      │
└─────────────────────────────────┘
```

### Coordinate System
- Three.js uses right-handed coordinate system
- Y is up, Z comes toward you, X goes right
- Units are arbitrary (you decide what 1 unit means)

## Exercises

*To be completed during lesson*

1. **Sketch the scene graph**: Draw how objects relate in a simple scene
2. **Identify components**: Given a 3D scene, name what's needed to render it
3. **Trace the loop**: Walk through what happens each frame

## Resources

- [Three.js Documentation - Creating a Scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)
- [TresJS Documentation - Introduction](https://docs.tresjs.org/)
- [Discover three.js - Book](https://discoverthreejs.com/book/)

## Notes

**Session notes**: See `docs/notes/01-getting-started/01-3d-graphics-concepts.md`

**Key takeaways from session:**
- Abstraction stack analogy (Vue:DOM :: Three.js:WebGL :: TresJS:Three.js) was effective
- Scene graph as tree structure connected well to Vue component thinking
- Corrected misconceptions: Groups don't improve performance, BasicMaterial is unlit
- Student ready for hands-on setup work
