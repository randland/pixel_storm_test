# WebGL Patterns Reference

> **Load this reference when**: Building WebGL fallbacks, optimizing draw calls, or debugging shader issues.

## Performance Checklist

### Draw Call Reduction
- **Target**: Under 500 draw calls (mobile), under 1000 (desktop)
- **Batch** objects into fewer, larger draw calls
- **Texture atlas**: Combine multiple images into single textures
- **Instanced rendering**: Many identical objects in one call

### State Change Minimization
- Group draw calls by material/texture
- Cache GL state to avoid redundant calls
- Set up framebuffers ahead of time

### Shader Performance
- Move work to vertex shaders (fewer executions than fragment)
- Use built-in functions (`dot`, `mix`, `normalize`) - hardware optimized
- Compile shaders in parallel, check status together

---

## GLSL Patterns

### Variable Types

| Type | Scope | Purpose | Convention |
|------|-------|---------|------------|
| `uniform` | All shaders | Constants (time, matrices) | `u_` prefix |
| `attribute` | Vertex only | Per-vertex data | `a_` prefix |
| `varying` | V→F transfer | Interpolated data | `v_` prefix |

### Basic Shader Structure
```glsl
// Vertex Shader
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;

varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
precision mediump float;

uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  gl_FragColor = texture2D(u_texture, v_uv);
}
```

### Precision Handling
```glsl
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
```

---

## Three.js WebGL Patterns

### InstancedMesh
```javascript
const mesh = new THREE.InstancedMesh(geometry, material, 10000)
const dummy = new THREE.Object3D()

for (let i = 0; i < 10000; i++) {
  dummy.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100)
  dummy.updateMatrix()
  mesh.setMatrixAt(i, dummy.matrix)
}
mesh.instanceMatrix.needsUpdate = true
```

### ShaderMaterial
```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0.0 },
    u_texture: { value: texture }
  },
  vertexShader: /* glsl */`
    varying vec2 v_uv;
    void main() {
      v_uv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform float u_time;
    uniform sampler2D u_texture;
    varying vec2 v_uv;
    void main() {
      gl_FragColor = texture2D(u_texture, v_uv + sin(u_time) * 0.1);
    }
  `
})

// Update in loop
material.uniforms.u_time.value = performance.now() / 1000
```

### Custom BufferGeometry Attributes
```javascript
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('a_customData', new THREE.BufferAttribute(customData, 1))

// Access in vertex shader: attribute float a_customData;
```

---

## Common Pitfalls

### Texture Issues

| Problem | Solution |
|---------|----------|
| Non-power-of-2 (WebGL 1) | CLAMP_TO_EDGE, no mipmaps |
| RGB format slow | Use RGBA8 instead |
| Float texture filtering | Check `OES_texture_float_linear` |

### Precision Issues
- `mediump`/`lowp` behave differently on mobile vs desktop
- Test on actual mobile devices
- iOS may silently degrade float textures

### Context Loss
```javascript
canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault()
  cancelAnimationFrame(animationId)
})

canvas.addEventListener('webglcontextrestored', () => {
  initWebGL()  // Re-create everything
  animate()
})
```

---

## WebGL Limits

| Property | Minimum |
|----------|---------|
| `MAX_TEXTURE_SIZE` | 4096 |
| `MAX_VERTEX_ATTRIBS` | 16 |
| `MAX_TEXTURE_IMAGE_UNITS` | 8 |
| `MAX_VARYING_VECTORS` | 8 |

Always query actual limits and cap accordingly.

---

## WebGPU Fallback Strategy

```javascript
async function createRenderer() {
  if (navigator.gpu) {
    try {
      const adapter = await navigator.gpu.requestAdapter()
      if (adapter) {
        const renderer = new WebGPURenderer()
        await renderer.init()
        return renderer
      }
    } catch (e) {
      console.warn('WebGPU failed, using WebGL')
    }
  }
  return new THREE.WebGLRenderer()
}
```

### When to Use WebGPU
- Hitting 60 FPS ceiling
- Need compute shaders
- 100,000+ particles
- Real-time physics

### When to Stay WebGL
- Universal browser support needed
- Modest performance requirements
- Simple scenes

---

## Debugging

### Spector.js
- Browser extension for frame capture
- Shows all WebGL commands
- Identifies overdraw and inefficient shaders

### Memory Monitoring
```javascript
console.log(renderer.info.memory)   // textures, geometries
console.log(renderer.info.render)   // draw calls, triangles
```

---

## Sources
- [MDN WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Three.js ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [Spector.js](https://spector.babylonjs.com/)
