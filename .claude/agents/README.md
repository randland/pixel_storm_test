# Agents & Consultants Index

> **Load this first** to determine how to get help.

## Two Types of Helpers

### Agents (Delegate via Task tool)
Execute multi-step workflows in fresh context. Use when work should be **offloaded**.

| Agent | Delegate When | How |
|-------|---------------|-----|
| `git-manager.md` | ANY git operation (commits, branches, PRs) | Task tool (MANDATORY) |
| `documentation.md` | Updating docs, maintaining learning progress | Task tool |

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
  └─> DELEGATE to git-manager.md (MANDATORY for all git changes)

Need to update documentation?
  └─> DELEGATE to documentation.md

Need implementation advice for Vue code?
  └─> CONSULT vue-expert.md (load inline, don't delegate)

Need implementation advice for graphics code?
  └─> CONSULT graphics-expert.md (load inline, don't delegate)

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
**Why Agent**: Executes stateful git workflows (branch creation, commits, merges)

- All git commits, branches, tags
- GitHub integration (PRs, issues)
- Educational commit message formatting
- **Mandatory** - never do git operations without delegating to this agent

### documentation.md
**Type**: Agent (delegate via Task tool)
**Why Agent**: Coordinates updates across multiple files

- Updating learning-progress.md
- Maintaining curriculum completion status
- Recording decisions and rationale
- Coordinating doc updates with code changes

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
