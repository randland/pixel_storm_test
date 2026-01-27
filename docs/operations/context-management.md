# Context Management Operations

## Core Protocol
**Use subagents liberally to preserve main context**

### Mandatory Delegation
- **Git operations** → git-manager agent (ALL changes)
- **Documentation** → documentation agent
- **Research** → research agent
- **Teaching** → teaching-assistant agent

### Session Pattern
1. Check **@docs/learning-progress.md** for current state
2. Use **git-manager** for branches/commits
3. Use **documentation agent** for progress updates
4. Load context modules **only as needed**

### Quick Skills Access
- **Educational workflows**: @.claude/skills/educational-workflow.md
- **Graphics teaching**: @.claude/skills/graphics-teaching.md
- **Testing patterns**: @.claude/skills/testing-patterns.md

### Recovery
If overloaded: checkpoint via git-manager, fresh session with minimal context

**Detailed workflows**: @docs/context-modules/