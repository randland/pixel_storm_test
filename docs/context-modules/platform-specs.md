# Platform Architecture & Setup

## Technology Stack

### Core Framework
- **Vue 3**: Primary application framework (composition API, reactivity)
- **TresJS**: Vue 3 + Three.js integration for reactive 3D components
- **Three.js**: 3D graphics library for WebGL/WebGPU abstraction

### Graphics API Strategy
- **WebGPU** (Primary): Modern GPU API for compute shaders and advanced graphics
- **WebGL** (Fallback): Compatibility layer for broader browser support
- **Focus**: Learning WebGPU concepts for future-forward skill development

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Optional type safety for complex shader calculations

---

## System Requirements

### Prerequisites
- **Node.js 18+** with npm/yarn
- **Modern browser** with WebGPU support (Chrome/Edge 113+, Firefox behind flag)
- **GPU with WebGPU support** (discrete GPU recommended for compute shaders)

### Required Knowledge
- Strong Vue 3 skills (composition API, reactivity, component architecture)
- Basic JavaScript/ES6+ (async/await, destructuring, modules)

---

## Installation

```bash
# Clone and install
git clone <repository-url> pixel_storm_test
cd pixel_storm_test
npm install

# Start development
npm run dev
```

### Key Dependencies
```json
{
  "vue": "^3.x",
  "@tresjs/core": "latest",
  "@tresjs/cientos": "latest",
  "three": "^0.160+",
  "vite": "latest"
}
```

---

## Configuration

### WebGPU Browser Setup
- **Chrome/Edge**: Enable `chrome://flags/#enable-unsafe-webgpu`
- **Firefox**: Set `dom.webgpu.enabled` to true in `about:config`
- **Development**: Use WebGL fallback during initial learning

### TresJS Configuration
```javascript
// main.js
import { createApp } from 'vue'
import { TresCanvas } from '@tresjs/core'
import App from './App.vue'

const app = createApp(App)
app.component('TresCanvas', TresCanvas)
app.mount('#app')
```

---

## Project Structure

```
src/
  components/          # Vue UI components
  demos/              # Progressive learning demos
  shaders/            # GLSL/WGSL shader programs
  utils/              # Utility functions
  assets/             # Textures, models, resources
```

---

## Demo Platform Architecture

### Core Requirements
- **Navigation System**: Demo browser with categorization
- **URL Routing**: Individual demo routes with deep linking
- **Control Panels**: Per-demo reactive UI controls
- **Code Display**: Optional source code viewing

### Demo Component Pattern
```vue
<template>
  <TresCanvas>
    <!-- Three.js scene as Vue components -->
  </TresCanvas>
  <ControlPanel>
    <!-- Demo-specific controls -->
  </ControlPanel>
</template>
```

### Navigation Architecture
- **Header**: Category-based demo browser
- **Footer**: Previous/next demo navigation
- **Sidebar**: Demo-specific controls (optional)
- **URL Pattern**: `/demos/[category]/[demo-name]`

---

## Development Workflow

### Common Commands
```bash
npm run dev        # Development server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build
```

### Learning Progression
1. Start with Foundation lessons in `src/demos/foundation/`
2. Complete exercises sequentially to build skills
3. Experiment with parameters to understand relationships
4. Document discoveries in learning progress files

### WebGPU Development Tips
- Use browser dev tools WebGPU panel for debugging
- Start with simple compute shaders before complex graphics
- Test WebGL fallback for broader compatibility
- Monitor GPU usage during development

---

## Troubleshooting

### WebGPU Not Available
- Check browser compatibility and flags
- Fall back to WebGL for initial learning
- Verify GPU drivers are up to date

### TresJS Issues
- Ensure Vue 3 composition API properly configured
- Check Three.js version compatibility
- Verify component registration and imports

### Performance Issues
- Monitor frame rate and GPU usage
- Start with lower particle/vertex counts
- Use browser performance profiler
- Consider JavaScript vs GPU calculation patterns

---

## Learning Resources

**Three.js:**
- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [TresJS Documentation](https://tresjs.org/)

**WebGPU:**
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [WebGPU Samples](https://webkit.org/demos/webgpu/)
- [MDN WebGPU Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

**Shaders:**
- [Shadertoy](https://shadertoy.com/) for GLSL examples
- [Book of Shaders](https://thebookofshaders.com/)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

---

## Student Context

**Name**: Nick Karpenske
**Start Date**: 2026-01-27
**Experience**: Vue 3 expert, Three.js foundation, ready for WebGPU focus
**Learning Track**: WebGPU + TSL + TresJS specialization

**Key Focus**: Build examples-style learning platform supporting progressive WebGPU skill development with immediate visual feedback.
