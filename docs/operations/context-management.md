# Context Management Operations

## Agent Usage Protocol
**CRITICAL**: Use subagents liberally to preserve main agent context

### When to Delegate
- **Multi-step research** → research agent
- **Git operations requiring branch strategy** → git-manager agent  
- **Documentation coordination** → documentation agent
- **Curriculum delivery** → teaching-assistant agent
- **Complex technical investigations** → general-purpose subagent

### Context Preservation Rules
1. **Main agent focuses on**: Coordination, student interaction, immediate implementation
2. **Subagents handle**: Research, documentation updates, specialized operations
3. **Information flow**: Subagents report concise findings back to main agent
4. **Memory management**: Load only relevant instruction modules for each task

## Learning Session Structure
1. **Start**: Check @docs/learning-progress.md for current status
2. **Plan**: Update todo list with session objectives  
3. **Teach**: Deliver concepts through hands-on projects
4. **Document**: Use documentation agent to update progress
5. **Commit**: Use git agent to create educational commits

## Module Loading Strategy
Load instruction modules based on task context:
- **Teaching tasks** → @docs/core/teaching-behavior.md
- **Git operations** → @.claude/agents/git-manager.md
- **Research needs** → @.claude/agents/research.md
- **Documentation updates** → @.claude/agents/documentation.md
- **Learning progression** → @docs/curriculum.md (relevant sections only)

## Emergency Context Recovery
If context becomes overloaded:
1. **Summarize current state** in learning-progress.md
2. **Create checkpoint commit** with git agent
3. **Start fresh session** with updated documentation  
4. **Load minimal context** using project-essence.md only