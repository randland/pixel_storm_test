---
name: lesson-start
description: Session initialization workflow for educational graphics development
usage: /lesson-start [topic]
examples:
  - /lesson-start
  - /lesson-start particle-systems
  - /lesson-start webgpu-compute
context:
  - docs/learning-progress.md
  - docs/curriculum.md
  - docs/teaching-personality.md
---

# Lesson Start Skill

Initializes a new learning session with proper context loading and environment preparation.

## Session Initialization Workflow

### 1. Check Current State
Read @docs/learning-progress.md to understand:
- Current learning phase
- Last session's progress
- Immediate next steps
- Any blockers or challenges

### 2. Verify Environment
Confirm development environment is ready:
```bash
# Check if dev server is running
curl -s http://localhost:5173 > /dev/null && echo "Dev server running" || echo "Start with: npm run dev"
```

### 3. Prepare Git Branch
Delegate to git-manager agent:
- Check current branch status
- Create or switch to appropriate learning branch
- Ensure clean working state

### 4. Set Session Objectives
Based on curriculum and progress:
- Identify 1-3 specific learning goals
- Plan hands-on implementation steps
- Prepare visual examples to demonstrate

### 5. Load Topic Context
If topic specified, load relevant context:
- Related documentation
- Previous implementations
- Reference materials

## Topic-Specific Initialization

### particle-systems
Focus: GPU-accelerated particle rendering
- Review Three.js Points geometry
- Prepare for buffer attribute manipulation
- Plan animation loop integration

### webgpu-compute
Focus: Compute shader programming
- Review TSL (Three.js Shading Language) basics
- Prepare compute shader examples
- Plan performance comparison demos

### noise-functions
Focus: Procedural generation techniques
- Review Perlin/Simplex noise concepts
- Prepare visualization examples
- Plan parameter exploration exercises

### shader-basics
Focus: Custom shader development
- Review GLSL/WGSL fundamentals
- Prepare simple shader examples
- Plan interactive shader editing

## Session Greeting
Start each session with a brief, encouraging greeting that:
- Acknowledges previous progress
- Previews today's objectives
- Sets collaborative, exploratory tone
