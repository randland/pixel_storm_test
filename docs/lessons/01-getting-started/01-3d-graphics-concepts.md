# Lesson 01-01: 3D Graphics Concepts

> **Section**: Getting Started
> **Status**: `[ ]` Planned
> **Estimated Time**: 1-2 hours

## Learning Objectives

By the end of this lesson, you will:
- [ ] Understand what Three.js is and why it exists (WebGL abstraction)
- [ ] Grasp the scene graph mental model (scene → objects → children)
- [ ] Know the three essential components: Scene, Camera, Renderer
- [ ] Understand how TresJS wraps Three.js for Vue developers
- [ ] Have a mental model of the render loop (request frame → update → render)

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

*Space for observations during the lesson*
