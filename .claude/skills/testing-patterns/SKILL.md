---
name: testing-patterns
description: Testing patterns and standards for educational graphics projects
usage: /testing-patterns [type]
examples:
  - /testing-patterns console
  - /testing-patterns canvas
  - /testing-patterns webgl
context:
  - docs/learning-progress.md
---

# Testing Patterns Skill

Provides testing patterns and quality standards for educational graphics development.

## Console Error Testing (MANDATORY)

### When to Test
- After Three.js feature implementations
- Before educational commits
- After Vue reactivity integrations
- Before milestone merges
- During WebGPU/shader development

### Testing Command
```bash
# Ensure dev server is running: npm run dev
node test-demos.js
```

### Expected Results
```
Testing LayeredNoiseArt.vue...
Testing PerlinRGBDemo.vue...

=== TEST RESULTS ===

LayeredNoiseArt.vue:
  No errors detected

PerlinRGBDemo.vue:
  No errors detected

Total errors: 0
```

## Common Graphics Testing Patterns
```javascript
// Canvas validation
const canvas = await page.$('canvas.threejs-canvas')
if (!canvas) errors.push('Three.js canvas not found')

// Controls testing
const controls = await page.$('.controls-panel')
if (!controls) errors.push('Controls panel not found')

// WebGL context check
await page.waitForTimeout(3000) // Allow Three.js init
```

## Educational Testing Standards
- **Zero console errors** in production prototypes
- **Functional canvas rendering** for all demos
- **Responsive controls** for parameter manipulation
- **Memory leak prevention** through proper disposal
- **Performance profiling** for optimization learning

## Git Integration
- Include test results in commit messages
- Test before creating educational milestones
- Document test failures as learning opportunities
- Use testing as professional development demonstration

## Type-Specific Patterns

### console
Focus on capturing and resolving JavaScript console errors and warnings.

### canvas
Validate Three.js canvas rendering, WebGL context, and visual output.

### webgl
Verify WebGL context initialization, shader compilation, and GPU resource management.
