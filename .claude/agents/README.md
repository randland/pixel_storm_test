# Agents & Consultants Index

> **Load this first** to determine how to get help.

## Two Types of Helpers

### Agents (Delegate via Task tool)
Execute multi-step workflows in fresh context. Use when work should be **offloaded**.

| Agent | Delegate When | How |
|-------|---------------|-----|
| `git-manager.md` | Complex git (conflicts, rebase, PRs, branch strategy) | Task tool |
| `documentation.md` | Updating docs, maintaining learning progress | Task tool |
| `3d-math-expert.md` | Camera math, dolly zoom, projection, spatial transforms | Task tool |
| `debugger.md` | Visual bugs, console errors, browser testing (Playwright MCP) | Task tool or Teammate |

> **Git Routing**: Simple commits use `/commit` skill (has conversation context). Only delegate to git-manager for complex operations.

### Consultants (Load inline for advice)
Decision guides that provide expert advice within the main conversation. Use when you need **guidance** but want to stay in current context.

| Consultant | Consult When | How |
|------------|--------------|-----|
| `vue-expert.md` | Composable design, reactivity questions, Vue patterns | Read file + reference docs |
| `graphics-expert.md` | Three.js, TresJS, shaders, WebGPU, performance | Read file + reference docs |

> **Note**: Teaching protocols are in `.claude/rules/learning-workflow.md` (always active), not an agent or consultant.

## Decision Tree

```
Need to do git operations?
  ├─> Read-only (status/log/diff)?
  │     └─> Execute directly
  ├─> Simple commit?
  │     └─> /commit skill (keeps conversation context)
  └─> Complex (conflicts/rebase/PRs)?
        └─> DELEGATE to git-manager.md

Need to update documentation?
  └─> DELEGATE to documentation.md

Need implementation advice for Vue code?
  └─> CONSULT vue-expert.md (load inline, don't delegate)

Need implementation advice for graphics code?
  └─> CONSULT graphics-expert.md (load inline, don't delegate)

Need 3D math help (camera, projection, transforms)?
  └─> DELEGATE to 3d-math-expert.md

Need to debug a visual bug or check browser state?
  └─> DELEGATE or SPAWN TEAMMATE from debugger.md

Need teaching guidance?
  └─> NOT here. Use rules in .claude/rules/learning-workflow.md
```

## When to Delegate vs Consult

| Scenario | Use Agent (Delegate) | Use Consultant (Load) |
|----------|---------------------|----------------------|
| Multi-step workflow with state | ✅ | ❌ |
| Need fresh context | ✅ | ❌ |
| Quick decision/pattern question | ❌ | ✅ |
| Need conversation history | ❌ | ✅ |
| Can run in parallel with other work | ✅ | ❌ |

---

## Agents (Detailed)

### git-manager.md
**Type**: Agent (delegate via Task tool)
**Why Agent**: Complex git operations need focused attention and fresh context

**Use for** (complex operations):
- Merge conflict resolution
- Rebase/history rewriting
- Branch strategy decisions
- PR creation and management
- Repository initialization

**Don't use for** (use `/commit` skill instead):
- Simple commits after work
- Checkpoint/milestone commits

See `.claude/rules/learning-workflow.md` for complete git routing logic.

### documentation.md
**Type**: Agent (delegate via Task tool)
**Why Agent**: Coordinates updates across multiple files

- Updating learning-progress.md
- Maintaining curriculum completion status
- Recording decisions and rationale
- Coordinating doc updates with code changes

### 3d-math-expert.md
**Type**: Agent (delegate via Task tool)
**Why Agent**: 3D math problems require focused reasoning and often involve reading code, deriving formulas, and producing corrected implementations

- Camera projection math (FOV, near/far, aspect ratio)
- Dolly zoom / vertigo effect calculations
- Coordinate space transforms (world/local/screen)
- Frustum calculations, interpolation, spatial transforms
- Debugging math-heavy camera code

**Don't use for**: General Three.js setup, TresJS reactivity, shaders, or performance — use graphics-expert consultant instead.

### debugger.md
**Type**: Agent (delegate via Task tool) or Teammate (spawn for collaborative sessions)
**Why Agent/Teammate**: Debugging requires focused context — reading code, checking browser state, isolating issues. Can run as a one-shot agent or as an ongoing teammate for extended sessions.

- Visual bugs (wrong rendering, broken effects)
- Console errors in demos
- Browser-based verification via **Playwright MCP**
- Systematic issue isolation and minimal fixes
- Can escalate math issues to 3d-math-expert

**Playwright MCP**: Uses `browser_navigate`, `browser_snapshot`, `browser_console_messages`, `browser_take_screenshot`, `browser_evaluate` for browser-based debugging.

**As Teammate**: Spawn for extended debugging sessions where back-and-forth is needed. Reports findings, proposes fixes, waits for approval.

---

## Consultants (Detailed)

### vue-expert.md
**Type**: Consultant (load inline for advice)
**Why Consultant**: Provides decision guidance, doesn't execute workflows

- Composable architecture and design patterns
- Reactivity debugging (ref vs reactive, anti-patterns)
- VueUse-style utility patterns
- State management decisions
- **Loads**: `docs/reference/vue-composition-patterns.md`, `vueuse-patterns.md`

**How to use**: Read `vue-expert.md` → Follow its "Reference Loading Protocol" → Load specific reference docs as needed

### graphics-expert.md
**Type**: Consultant (load inline for advice)
**Why Consultant**: Provides decision guidance, doesn't execute workflows

- Three.js memory management and performance
- TresJS Vue integration patterns
- TSL shader development
- WebGPU compute shaders
- WebGL fallback strategies
- **Loads**: `docs/reference/threejs-patterns.md`, `tresjs-patterns.md`, `tsl-patterns.md`, etc.

**How to use**: Read `graphics-expert.md` → Follow its "Reference Loading Protocol" → Load specific reference docs as needed

---

## Classification Criteria

**Should be AGENT when:**
- Task requires fresh context (deep research, complex multi-step work)
- Work should be offloaded to preserve main conversation focus
- Output is a single result returned to main conversation
- Task is self-contained and doesn't need conversation history
- Benefits from parallel execution with other work

**Should be CONSULTANT when:**
- Task is providing expert advice or decision guidance
- Needs conversation context to give relevant advice
- Main agent should implement the advice (not delegate implementation)
- Guidance applies to current work, not a separate workflow
