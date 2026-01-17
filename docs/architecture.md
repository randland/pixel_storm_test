# Architecture

## Overview

Pixel Storm Test is a learning-focused Vue 3 + Three.js + WebGPU project designed for progressive skill development in digital art creation. The architecture prioritizes educational value and modern GPU programming concepts.

## Technology Stack

### Core Framework
- **Vue 3**: Primary application framework (student has strong existing skills)
- **TresJS**: Vue 3 + Three.js integration library for reactive 3D components
- **Three.js**: 3D graphics library for WebGL/WebGPU abstraction

### Graphics API Strategy
- **WebGPU** (Primary): Modern GPU API for compute shaders and advanced graphics
- **WebGL** (Fallback): Compatibility layer for broader browser support
- **Focus**: Learning WebGPU concepts over WebGL for future-forward skill development

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Optional type safety for complex shader calculations
- **Modern ES6+**: Leveraging latest JavaScript features

## Learning-Focused Architecture Decisions

### Progressive Complexity
Architecture supports four learning phases:
1. **Foundation**: Vue + TresJS basics, simple 3D scenes
2. **Advanced**: Complex lighting, materials, scene management
3. **Shaders**: Custom vertex/fragment shaders, visual effects
4. **WebGPU**: Compute shaders, particle systems, procedural generation

### Implementation Strategy Patterns

**JavaScript Calculations**:
- Small datasets (<500 particles/LEDs)
- Simple transformations and animations
- Learning fundamental concepts
- Rapid prototyping and experimentation

**GPU Calculations**:
- Large datasets (>500 particles)
- Complex mathematical operations
- Parallel processing requirements
- Performance-critical rendering

### Component Architecture

**Vue Components**:
- UI controls and parameter adjustment
- Scene configuration and setup
- Learning exercise navigation
- Progress tracking and documentation

**Three.js/TresJS Components**:
- 3D scene objects and lighting
- Material and shader management
- Camera controls and interaction
- Render loop and animation systems

**Shader Programs**:
- Vertex shaders for geometry transformation
- Fragment shaders for pixel-level effects
- Compute shaders for data processing
- Progressive complexity from basic to advanced

## Design Decisions

### Educational Priority
- **Hands-on Learning**: Multiple small projects over single complex application
- **Progressive Building**: Each project builds on previous concepts
- **Modern Techniques**: Focus on current industry standards (WebGPU, ES6+)
- **Practical Application**: Digital art focus for engaging visual feedback

### Framework Choice Rationale
- **TresJS over Native Three.js**: Leverages existing Vue 3 expertise
- **WebGPU over WebGL**: Future-forward learning for modern GPU programming
- **Multiple Small Projects**: Better skill retention than monolithic applications

### Performance Considerations
- **Scalable Patterns**: JS for small, GPU for large calculations
- **Learning-Optimized**: Readability and understanding over maximum performance
- **Incremental Optimization**: Start simple, optimize as skills develop