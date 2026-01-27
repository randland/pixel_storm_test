# CLAUDE.md

**Educational graphics project**: Vue 3 + TresJS + WebGPU learning platform

## Context Loading (On-Demand Only)
**Status**: @docs/learning-progress.md
**Curriculum**: @docs/curriculum.md
**Git Guide**: @docs/git-complete-guide.md

## Agent Delegation (MANDATORY)
**Git**: @.claude/agents/git-manager.md (ALL changes)
**Teaching**: @.claude/agents/teaching-assistant.md (Socratic guidance)
**Docs**: @.claude/agents/documentation.md
**Output Style**: @.claude/output-styles/teaching-mentor.md

## Automation (Hooks)
**SessionStart**: Learning progress auto-loaded at session start
**PostToolUse**: Test reminder after Vue/Three.js file edits
**PreToolUse**: Commit checklist before git commits

## Skills (Claude can invoke proactively or user can request)
| Command | Purpose |
|---------|---------|
| `/lesson-start` | Full session initialization |
| `/demo-test` | Test demos for console errors (Playwright) |
| `/progress-review` | Spaced repetition review |
| `/commit-learning` | Educational git commit |
| `/graphics-teaching` | Three.js/WebGPU teaching patterns |
| `/testing-patterns` | Testing standards reference |

## Stack & Patterns
**Tech**: Vue 3 + TresJS + Three.js + WebGPU + TSL
**Style**: Three.js examples-inspired demo platform
**Workflow**: Subagent delegation + educational git commits

## Context Management
- Use subagents liberally to preserve main context
- Git operations → git-manager agent (ALL changes)
- Teaching guidance → teaching-assistant agent
- Documentation → documentation agent
- Load context modules only as needed

### Automated Workflow
1. ✅ **Session start**: Progress auto-loaded via SessionStart hook
2. ✅ **Code edits**: Test reminder injected after Vue/shader changes
3. ✅ **Commits**: Checklist injected before git commits
4. 🤖 **Skills**: Claude can invoke proactively based on context

### Recovery
If overloaded: checkpoint via git-manager, fresh session with minimal context

## Detailed Context Modules
- @docs/context-modules/progress-tracking.md - Spaced repetition tracking
- @docs/context-modules/learning-phases.md - Phase definitions
- @docs/context-modules/platform-specs.md - Architecture + setup + tech specs
