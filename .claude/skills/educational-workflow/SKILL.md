---
name: educational-workflow
description: Structured workflow patterns for educational graphics sessions
usage: /educational-workflow [phase]
examples:
  - /educational-workflow start
  - /educational-workflow implement
  - /educational-workflow close
context:
  - docs/learning-progress.md
---

# Educational Workflow Skill

Provides structured patterns for managing educational graphics development sessions.

## Quick Teaching Patterns

### Learning Session Start
1. Check @docs/learning-progress.md for context
2. Delegate to git-manager: create/switch to learning branch
3. Plan session objectives with student
4. Load specific context modules as needed

### Implementation Cycle
1. Explain concept with immediate visual example
2. Build working prototype step-by-step
3. Test for console errors using /demo-test skill
4. Git commit with educational context via /commit-learning
5. Extend example to show variation/complexity

### Session Close
1. Test all prototypes for console errors
2. Git checkpoint via git-manager with milestone tag
3. Update learning-progress.md via documentation agent
4. Preview next session objectives

## Agent Coordination
- **All code changes**: git-manager (no exceptions)
- **Progress updates**: documentation agent
- **Complex research**: research agent
- **Teaching delivery**: teaching-assistant agent

## Context Management
- Load modules **on-demand only**
- Delegate liberally to preserve main context
- Use emergency recovery if overloaded
- Keep CLAUDE.md as single source of truth

## Testing Integration
**MANDATORY**: Run /demo-test after:
- Three.js feature additions
- Vue reactivity changes
- Shader implementations
- WebGPU integrations

## Phase-Specific Instructions

### start
Initialize a new learning session by checking progress status and preparing the development environment.

### implement
Execute the core implementation cycle with testing and commits at each milestone.

### close
Properly close the session with testing, documentation updates, and milestone tags.
