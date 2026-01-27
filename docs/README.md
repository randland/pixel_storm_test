# Project Documentation

**Modular Architecture**: Documentation is organized for context-efficient agent loading.

## Core Modules (Auto-loaded)
- `core/project-essence.md` - Essential project context and constraints
- `core/teaching-behavior.md` - Core teaching patterns and personality

## Operational Modules (Load as needed)
- `operations/context-management.md` - Agent coordination and context preservation
- `implementation-strategies.md` - JS vs GPU implementation decision framework

## Learning Materials
- `curriculum.md` - Progressive learning roadmap
- `projects-catalog.md` - Available learning projects with objectives
- `learning-progress.md` - Current progress tracking template

## Technical Reference
- `architecture.md` - System design decisions
- `setup.md` - Development environment configuration
- `project-decisions.md` - Historical decision log

## Agent Integration
Main agents auto-load relevant modules via CLAUDE.md imports. Specialized agents access specific instruction sets from `.claude/agents/` directory.