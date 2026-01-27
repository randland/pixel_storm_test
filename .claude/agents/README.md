# Agents Index

> **Load this first** to determine which agent to delegate to.

## Agent Selection

| Agent | Delegate When |
|-------|---------------|
| `git-manager.md` | ANY git operation (commits, branches, PRs) |
| `teaching-assistant.md` | Socratic teaching, concept explanation, spaced repetition |
| `documentation.md` | Updating docs, maintaining learning progress |
| `vue-expert.md` | Composable design, reactivity questions, Vue patterns |
| `graphics-expert.md` | Three.js, TresJS, shaders, WebGPU, performance |

## Decision Tree

```
Need to do git operations?
  └─> git-manager.md (MANDATORY for all git changes)

Need to teach/explain a concept?
  └─> teaching-assistant.md

Need to update documentation?
  └─> documentation.md

Need implementation advice for Vue code?
  └─> vue-expert.md

Need implementation advice for graphics code?
  └─> graphics-expert.md
```

## Agent Responsibilities

### git-manager.md
- All git commits, branches, tags
- GitHub integration (PRs, issues)
- Educational commit message formatting
- **Mandatory** - never do git operations without this agent

### teaching-assistant.md
- Socratic questioning for concept discovery
- Spaced repetition review scheduling
- Adaptive difficulty based on student progress
- A.C.G.C.E. teaching framework

### documentation.md
- Updating learning-progress.md
- Maintaining curriculum completion status
- Recording decisions and rationale
- Coordinating doc updates with code changes

### vue-expert.md
- Composable architecture and design patterns
- Reactivity debugging (ref vs reactive, anti-patterns)
- VueUse-style utility patterns
- State management decisions
- **Loads**: `docs/reference/vue-composition-patterns.md`, `vueuse-patterns.md`

### graphics-expert.md
- Three.js memory management and performance
- TresJS Vue integration patterns
- TSL shader development
- WebGPU compute shaders
- WebGL fallback strategies
- **Loads**: `docs/reference/threejs-patterns.md`, `tresjs-patterns.md`, `tsl-patterns.md`, etc.
