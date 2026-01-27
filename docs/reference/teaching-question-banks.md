# Teaching Question Banks

Domain-specific questions for probing understanding in graphics programming topics.

## TresJS Integration

- "How does TresJS know when to re-render after your ref changes?"
- "What's the lifecycle of a TresJS component compared to a regular Vue component?"
- "If you needed to access the raw Three.js object, how would you do that?"
- "Why might you use `useRenderLoop` instead of `watchEffect` for animations?"

## WebGPU Fundamentals

- "What's the difference between a render pipeline and a compute pipeline?"
- "Why does WebGPU require explicit bind group layouts?"
- "If your shader needs to read AND write to the same buffer, what do you need to consider?"
- "What happens if your workgroup size doesn't divide evenly into your data size?"

## TSL Shader Programming

- "What does it mean that TSL is 'node-based'?"
- "How does TSL abstract away the differences between WebGL and WebGPU?"
- "When would you use `varying` vs `uniform` in TSL?"
- "How would you debug a TSL shader that's producing unexpected colors?"

## GPU Computing Concepts

- "Why is branching (if statements) expensive in shaders?"
- "What's the relationship between threads, workgroups, and dispatches?"
- "How do you prevent race conditions when multiple threads write to shared memory?"
- "When should computation stay on CPU vs. move to GPU?"

## Three.js Core

- "What happens if you forget to dispose a geometry or material?"
- "Why do we multiply delta time in animation loops?"
- "What's the difference between `position.set()` and `position.copy()`?"
- "When would you use InstancedMesh vs multiple Mesh objects?"

## Vue + Graphics Integration

- "Why do we use `shallowRef` for Three.js objects instead of `ref`?"
- "What's the risk of putting Three.js objects in reactive state?"
- "How do you properly clean up a Three.js scene in `onUnmounted`?"
- "When should animation logic live in Vue vs in the render loop?"

## Adaptive Question Patterns

### When Student Answers Correctly
Move to next level or introduce complexity:
- "Good. Now what if we had 10x more particles?"
- "Right. How would you extend this to handle [edge case]?"

### When Student Answers Incorrectly
Probe the misconception before correcting:
- "Interesting - what made you think that?"
- "Walk me through your reasoning."
- "What would happen if that were true?"

### When Student is Uncertain
Provide scaffolding:
- "Let's break this down. What's the first thing that happens when..."
- "Think about a simpler case first. What if there was only one..."
- "What do you know for sure about this?"
