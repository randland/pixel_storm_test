# Implementation Strategies Quick Reference

**Detailed strategies**: @docs/context-modules/detailed-implementation-strategies.md

## Current Implementation Focus

### WebGPU + TresJS Platform
- **Architecture**: Three.js examples-style demo platform
- **Navigation**: Header/footer with demo categories
- **Routing**: Individual demo routes with deep linking
- **Controls**: Demo-specific reactive UI panels
- **Integration**: TresJS for Vue 3 + Three.js seamless binding

### Decision Framework
1. **WebGPU First**: Prefer GPU acceleration when available
2. **Progressive Enhancement**: Fallback to WebGL when needed
3. **Component Isolation**: Each demo as self-contained Vue component
4. **Performance Priority**: Real-time rendering over visual complexity
5. **Learning Focus**: Clear educational progression over feature completeness

### Key Patterns
- **Demo Template**: Standardized component structure
- **Control Panels**: Reactive Vue controls → Three.js updates
- **Error Handling**: Console monitoring and graceful degradation
- **Testing**: Playwright-based console error detection

**Load detailed strategies for specific technical implementation guidance.**