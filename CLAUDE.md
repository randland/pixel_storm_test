# CLAUDE.md

**Educational graphics project**: Vue 3 + TresJS + WebGPU learning platform

## Context Loading (On-Demand Only)
**Status**: @docs/learning-progress.md
**Curriculum**: @docs/lessons/00-curriculum-outline.md
**Git Guide**: @docs/git-complete-guide.md

## Agent Delegation (MANDATORY)
**Index**: @.claude/agents/README.md (selection guide)
**Git**: @.claude/agents/git-manager.md (ALL changes)
**Docs**: @.claude/agents/documentation.md
**Output Style**: @.claude/output-styles/teaching-mentor.md
**Teaching Rules**: @.claude/rules/learning-workflow.md (always active)

## Expert Consultants (Implementation Advice)
**Vue Expert**: @.claude/agents/vue-expert.md (composables, reactivity)
**Graphics Expert**: @.claude/agents/graphics-expert.md (Three.js, shaders, WebGPU)

## Reference Documentation (Load On-Demand)
**Index**: @docs/reference/README.md (load FIRST to pick correct reference)

| Reference | When to Load |
|-----------|--------------|
| `vue-composition-patterns.md` | Composable design, reactivity debugging |
| `vueuse-patterns.md` | VueUse-style utilities, animation patterns |
| `threejs-patterns.md` | Memory management, performance, disposal |
| `tresjs-patterns.md` | Vue + Three.js integration, TresJS composables |
| `tsl-patterns.md` | TSL shaders, custom materials |
| `webgpu-compute-patterns.md` | Compute shaders, particle systems |
| `webgl-patterns.md` | WebGL fallback, GLSL shaders |

## Automation (Hooks)
**SessionStart**: Learning progress auto-loaded at session start
**PostToolUse**: Test reminder after Vue/Three.js file edits
**PreToolUse**: Commit checklist before git commits

## Skills (Claude can invoke proactively or user can request)
**Index**: @.claude/skills/README.md (skill discovery)

| Command | Purpose |
|---------|---------|
| `/lesson-start` | Full session initialization |
| `/demo-test` | Test demos for console errors (Playwright) |
| `/progress-review` | Spaced repetition review |
| `/commit-learning` | Educational git commit |
| `/graphics-teaching` | Three.js/WebGPU teaching patterns |
| `/testing-patterns` | Testing standards reference |
| `/educational-workflow` | Session structure and checkpoint patterns |
| `/docs-audit` | Audit documentation architecture |

## Stack & Patterns
**Tech**: Vue 3 + TresJS + Three.js + WebGPU + TSL
**Style**: Three.js examples-inspired demo platform
**Workflow**: Subagent delegation + educational git commits

## Context Management
- Use subagents liberally to preserve main context
- Git operations → git-manager agent (ALL changes)
- Documentation → documentation agent
- Teaching protocols → rules (learning-workflow.md, always active)
- Load context modules only as needed

### Automated Workflow
1. ✅ **Session start**: Progress auto-loaded via SessionStart hook
2. ✅ **Code edits**: Test reminder injected after Vue/shader changes
3. ✅ **Commits**: Checklist injected before git commits
4. 🤖 **Skills**: Claude can invoke proactively based on context

### Recovery
If overloaded: checkpoint via git-manager, fresh session with minimal context

## Detailed Context Modules
**Index**: @docs/context-modules/README.md (module selection)
- @docs/context-modules/progress-tracking.md - Spaced repetition tracking
- @docs/context-modules/learning-phases.md - Phase definitions
- @docs/context-modules/platform-specs.md - Architecture + setup + tech specs

## Session Behavior
**Rules**: @.claude/rules/learning-workflow.md (teaching protocols, note-taking, lesson delivery)
**Lessons**: @docs/lessons/README.md (lesson navigation and structure)
