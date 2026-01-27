# Lesson 01-03: Hello Cube

> **Section**: Getting Started
> **Status**: `[ ]` Planned
> **Estimated Time**: 1-2 hours

## Learning Objectives

By the end of this lesson, you will:
- [ ] Have a working TresJS scene with a visible cube
- [ ] Understand how TresJS components map to Three.js objects
- [ ] Know how to use `useRenderLoop` for animation
- [ ] See how Vue reactivity connects to 3D properties
- [ ] Have your first "it works!" moment with 3D graphics

## Prerequisites

- Lesson 01-01: 3D Graphics Concepts
- Lesson 01-02: Project Setup & Tooling

## Target Artifact

A working demo component that can be referenced for all future lessons:

```vue
<!-- src/demos/HelloCube.vue -->
<template>
  <TresCanvas>
    <!-- Camera, lights, cube -->
  </TresCanvas>
</template>
```

## Key Concepts

### TresJS Component Mapping
| Three.js | TresJS Component |
|----------|------------------|
| `PerspectiveCamera` | `<TresPerspectiveCamera>` |
| `BoxGeometry` | `<TresBoxGeometry>` |
| `MeshStandardMaterial` | `<TresMeshStandardMaterial>` |
| `DirectionalLight` | `<TresDirectionalLight>` |

### The `useRenderLoop` Composable
```javascript
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  // delta: time since last frame (seconds)
  // elapsed: total time since start (seconds)
  cube.value.rotation.y += delta
})
```

### Vue Reactivity with 3D
```vue
<script setup>
const rotation = ref(0)

onLoop(({ delta }) => {
  rotation.value += delta
})
</script>

<template>
  <TresMesh :rotation-y="rotation">
    <!-- ... -->
  </TresMesh>
</template>
```

## Exercises

*To be completed during lesson*

1. **Create the canvas**: Set up TresCanvas with basic configuration
2. **Add a camera**: Position it to see the origin
3. **Add lighting**: Ambient + directional so the cube is visible
4. **Create the cube**: Geometry + material = mesh
5. **Animate it**: Use `useRenderLoop` to spin the cube
6. **Experiment**: Change colors, speed, position - see what happens

## Debugging Checklist

If you don't see anything:
- [ ] Is the camera positioned and looking at the cube?
- [ ] Is there a light source?
- [ ] Is the material compatible with the lighting?
- [ ] Check browser console for errors
- [ ] Check that TresCanvas has a size (CSS height/width)

## Resources

- [TresJS - Your First Scene](https://docs.tresjs.org/getting-started/your-first-scene)
- [Three.js - Creating a Scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)

## Notes

*Space for observations during the lesson*

### Common "Aha!" Moments
- The cube won't be visible without light (except MeshBasicMaterial)
- Camera needs to be positioned away from origin to see anything
- Rotation values are in radians, not degrees
