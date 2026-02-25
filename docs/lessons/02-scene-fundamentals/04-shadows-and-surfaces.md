# Lesson 02-04: Shadows & Surfaces

> **Section**: Scene Fundamentals
> **Status**: `[ ]` Planned
> **Estimated Time**: 2-3 hours

## Learning Objectives

- [ ] Configure shadow mapping (castShadow, receiveShadow, shadow camera frustum)
- [ ] Diagnose and fix shadow artifacts (shadow acne, peter panning, shadow bias)
- [ ] Understand MeshStandardMaterial properties (roughness, metalness, emissive, transparent)
- [ ] Know when to use MeshPhysicalMaterial vs MeshStandardMaterial
- [ ] Use environment maps for reflections (basic introduction)

## Prerequisites

- Lesson 02-03: Lighting Basics (light types, helpers)

## Target Artifacts

| Artifact | Purpose |
|----------|---------|
| `material-showroom` demo | Showcase materials + shadows in a visually polished scene |

## Key Concepts

### Shadows
- Shadow maps: depth buffer from light's perspective
- `castShadow` on lights and meshes, `receiveShadow` on surfaces
- Shadow camera frustum (directional light shadow area)
- `shadow.mapSize` for quality, `shadow.bias` for artifact control
- Shadow acne (self-shadowing noise) vs peter panning (detached shadows)

### Materials
- `MeshStandardMaterial`: roughness, metalness, emissive, emissiveIntensity
- `MeshPhysicalMaterial`: clearcoat, transmission, ior (glass, water)
- `opacity` + `transparent` for see-through materials
- `side`: FrontSide, BackSide, DoubleSide
- `wireframe` mode for debugging geometry

### Environment
- Basic environment map for reflections (quick intro, not deep dive)
- How environment maps affect metallic surfaces

## Demo Concept: "Material Showroom"

A circular arrangement of the same mesh (torus knot or similar) rendered with different material configurations: matte, glossy, metallic, emissive, transparent, wireframe. A ground plane receives shadows from all objects. Interactive controls for shadow quality, bias, and material properties on a "focus" object. The visual should look like a product photography setup.

## Connection to GPU Work

> Each material property you set here (roughness, metalness, emissive) becomes a shader input. When you write TSL materials in Section 06, you'll compute these values per-pixel instead of setting them as constants. Understanding what the standard material does prepares you to replace it.

## Resources

- [Three.js - Shadows](https://threejs.org/docs/#api/en/lights/shadows)
- [Three.js - MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
- [Three.js - MeshPhysicalMaterial](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial)
