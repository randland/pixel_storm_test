# Development Setup

## Prerequisites

### Required Knowledge
- **Strong Vue 3 skills** (composition API, reactivity, component architecture)
- **Basic JavaScript/ES6+** (async/await, destructuring, modules)
- **HTML/CSS fundamentals** for UI components

### Learning Goals
- **Three.js fundamentals** (scenes, cameras, lighting, materials)
- **WebGPU concepts** (compute shaders, buffer management, parallel processing)
- **Shader programming** (GLSL/WGSL for visual effects)
- **Digital art techniques** (particle systems, procedural generation)

### System Requirements
- **Node.js 18+** with npm/yarn package management
- **Modern browser** with WebGPU support (Chrome/Edge 113+, Firefox behind flag)
- **GPU with WebGPU support** (discrete GPU recommended for compute shaders)

## Installation

### Project Setup
```bash
# Clone and install dependencies
git clone <repository-url> pixel_storm_test
cd pixel_storm_test
npm install

# Start development server
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

## Configuration

### WebGPU Setup
- **Chrome/Edge**: Enable chrome://flags/#enable-unsafe-webgpu
- **Firefox**: Set dom.webgpu.enabled to true in about:config
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

### Project Structure
```
src/
├── components/          # Vue UI components
├── lessons/            # Progressive learning exercises
├── shaders/            # GLSL/WGSL shader programs
├── utils/              # Utility functions and helpers
└── assets/             # Textures, models, resources
```

## Development Workflow

### Learning Progression
1. **Start with Foundation lessons** in `src/lessons/foundation/`
2. **Complete exercises sequentially** to build skills progressively
3. **Experiment with parameters** to understand concept relationships
4. **Document discoveries** in learning progress files

### Common Commands
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking (if using TypeScript)
npm run type-check
```

### WebGPU Development Tips
- **Use browser dev tools** WebGPU panel for debugging
- **Start with simple compute shaders** before complex graphics
- **Test WebGL fallback** for broader compatibility
- **Monitor GPU usage** during development

### Learning Resources

**Three.js**:
- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [TresJS Documentation](https://tresjs.org/)

**WebGPU**:
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [WebGPU Samples](https://webkit.org/demos/webgpu/)
- [MDN WebGPU Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

**Shaders**:
- [Shadertoy](https://shadertoy.com/) for GLSL examples
- [Book of Shaders](https://thebookofshaders.com/)
- [WebGPU Shading Language (WGSL) spec](https://www.w3.org/TR/WGSL/)

## Troubleshooting

### WebGPU Not Available
- Check browser compatibility and flags
- Fall back to WebGL for initial learning
- Verify GPU drivers are up to date

### TresJS Issues
- Ensure Vue 3 composition API is properly configured
- Check Three.js version compatibility
- Verify component registration and imports

### Performance Issues
- Monitor frame rate and GPU usage
- Start with lower particle/vertex counts
- Use browser performance profiler
- Consider JavaScript vs GPU calculation patterns