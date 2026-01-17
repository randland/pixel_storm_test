# CLAUDE.md

Core project guidance for Claude Code. Additional modules auto-load based on context.

@docs/core/project-essence.md
@docs/operations/context-management.md

## Specialized Agent Access

Load additional context based on task requirements:
- **Git Operations**: @.claude/agents/git-manager.md
- **Documentation Updates**: @.claude/agents/documentation.md
- **Teaching Guidance**: @docs/teaching-personality.md
- **Git Workflow**: @docs/git-complete-guide.md

## Modular Documentation

**Core Modules** (always loaded):
- `docs/core/project-essence.md` - Essential project context and constraints
- `docs/operations/context-management.md` - Agent coordination and workflow rules

**Contextual Modules** (load as needed):
- Git operations → `@docs/git-complete-guide.md`
- Teaching guidance → `@docs/teaching-personality.md`
- Learning progression → `@docs/curriculum.md`
- Implementation patterns → `@docs/implementation-strategies.md`
- Agent coordination → `@.claude/agents/[specific-agent].md`

## Quick Reference

**Tech Stack**: Vue 3 + TresJS + Three.js + WebGPU  
**Learning Path**: Foundation → Advanced → Shaders → WebGPU  
**Implementation**: JS for <500 elements, GPU for complex operations  
**Git Strategy**: main branch + learn/* + experiment/* branches  
**Context Rule**: Use subagents liberally to preserve main context  

For detailed information, load relevant modules above.