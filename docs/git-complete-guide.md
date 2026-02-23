# Complete Git Guide for Educational Projects

## Overview
This guide outlines the git workflow specifically designed for the pixel_storm_test educational project. Unlike traditional software development workflows, this system prioritizes learning progression, safe experimentation, and educational milestone tracking.

## Core Principles

### 1. Learning-First Commits
- Commit after understanding each concept, not just after working features
- Include "why" explanations in commit messages
- Small, logical commits that show progression
- Document learning moments and breakthroughs

### 2. Safe Experimentation
- Always use experiment branches for tangents and exploration
- Never fear breaking things - git keeps everything safe
- Encourage trying different approaches without consequence
- Easy recovery from failed experiments

### 3. Progressive Milestones
- Clear checkpoints for major learning achievements
- Milestone branches for phase completions
- Portfolio-ready commits for showcase projects
- Progress tracking integration with learning documentation

## Branch Strategy

### Core Branches

#### `main`
- **Purpose**: Production-ready, portfolio-quality code only
- **Content**: Completed learning milestones and polished projects
- **Protection**: Protected branch - no direct commits
- **Merge Source**: Only from completed milestone checkpoints
- **Quality Standards**: Full documentation, clean code, working features

### Learning Branches

#### `learn/[module-name]`
**Examples**: `learn/three-basics`, `learn/shader-fundamentals`, `learn/webgpu-intro`
- **Purpose**: Master specific curriculum concepts
- **Scope**: Single learning module or concept area
- **Duration**: 1-2 weeks typically
- **Merge Target**: main (after completion and review)
- **⚠️ Divergence Warning**: These branches intentionally diverge far from `main`. Never merge or rebase `main` into a `learn/` branch — use cherry-pick instead (see below).

#### `experiment/[topic]`
**Examples**: `experiment/webgpu-compute-shaders`, `experiment/particle-physics`
- **Purpose**: Safe exploration of new ideas or tangent investigations
- **Scope**: Specific technical experiment or proof-of-concept
- **Risk Level**: High - expected to potentially fail
- **Merge Strategy**: Cherry-pick successful concepts to learning branches

#### `checkpoint/[phase-milestone]`
**Examples**: `checkpoint/phase-1-complete`, `checkpoint/led-grid-working`
- **Purpose**: Mark major learning achievements
- **Content**: Significant milestone completion with full documentation
- **Quality**: Portfolio-ready code with comprehensive documentation
- **Usage**: Tagged releases for easy reference

## Commit Message Standards for Educational Progress

### Format
```
[type]: [concept] - [brief description]

[Optional longer explanation of learning context]
```

### Types
- **learn**: New concept mastery or skill development
- **experiment**: Exploratory work or proof-of-concept
- **checkpoint**: Major milestone completion
- **fix**: Bug resolution with learning explanation
- **docs**: Documentation updates related to learning progress
- **refactor**: Code improvement while maintaining learning objectives

### Examples
```
learn: three.js scene setup - basic camera and lighting configuration

Added perspective camera with proper aspect ratio calculation and basic
ambient + directional lighting. This establishes the foundation for all
future 3D rendering work. Next: geometry creation and material systems.
```

```
experiment: perlin noise - testing different octave configurations

Explored 3-6 octave combinations for storm clouds. 4 octaves provides
best balance of detail and performance. Higher octaves add minimal
visual benefit but significant computation cost.
```

```
checkpoint: LED grid phase complete - working 15x30 triangular layout

Completed basic LED grid visualization with:
- Triangular positioning algorithm
- Color interpolation system
- Vue reactive parameter controls
- Performance optimization for 450 LEDs

Ready for phase 2: advanced lighting effects and diffusion simulation.
```

## Workflow Operations

### Starting New Learning Module
```bash
git checkout main
git pull origin main
git checkout -b learn/[module-name]
git push -u origin learn/[module-name]
```

### Creating Experiment Branch
```bash
git checkout learn/[current-module]
git checkout -b experiment/[specific-topic]
# ... experimental work ...
git add .
git commit -m "experiment: [topic] - [description]"
```

### Merging Successful Experiment
```bash
git checkout learn/[module-name]
git cherry-pick [experiment-commit-hash]
# OR for full merge:
git merge experiment/[topic]
```

### Bringing a Main Change into a Learning Branch
`learn/` branches diverge significantly from `main` by design. Merging or rebasing `main` into a `learn/` branch will always produce large numbers of conflicts. Use cherry-pick instead:

```bash
# Find the commit hash on main
git log main --oneline

# Cherry-pick just that commit onto the learning branch
git checkout learn/[module-name]
git cherry-pick [commit-hash]
```

This applies cleanly when the commit touches files that don't conflict (e.g. a new config file). Only reach for merge/rebase if you genuinely need the full history reconciled.

### Creating Learning Checkpoint
```bash
git checkout learn/[module-name]
# Ensure all work is committed and documented
git checkout main
git merge learn/[module-name]
git tag "checkpoint-[milestone]"
git push origin main --tags
```

### Daily Learning Session
```bash
# Start session
git checkout learn/[current-module]
git pull origin learn/[current-module]

# Work and commit frequently
git add .
git commit -m "learn: [concept] - [what was accomplished]"

# End session
git push origin learn/[current-module]
# Update learning-progress.md with session notes
```

## Integration with Learning Documentation

### Before Each Session
- Check `docs/learning-progress.md` for current status and objectives
- Review last commit messages for context
- Plan session goals based on curriculum phase

### During Development
- Commit frequently with educational context in messages
- Use branches to isolate different learning approaches
- Document decision-making process in commit messages

### After Each Session
- Update `docs/learning-progress.md` with accomplishments and challenges
- Push all work to remote branches for backup
- Tag significant milestones for easy reference

## Repository Management

### GitHub Integration
- **User**: randland
- **Repository**: Public for portfolio showcase
- **Issues**: Track learning goals and technical challenges
- **Projects**: Curriculum progress tracking
- **Wiki**: Extended documentation and resources

### Branch Protection Rules
- **main**: Require pull request reviews before merging
- **learn/***: Allow direct pushes for rapid iteration
- **experiment/***: No restrictions - full experimental freedom

### Cleanup Strategy
- **Completed learn/ branches**: Keep for reference, can archive after milestones
- **Failed experiment/ branches**: Delete after extracting lessons learned
- **checkpoint/ branches**: Keep permanently for portfolio reference

## Error Recovery

### Experimental Branch Gone Wrong
```bash
git checkout learn/[module-name]  # Return to safe state
git branch -D experiment/[failed-topic]  # Delete failed experiment
git checkout -b experiment/[new-approach]  # Try different approach
```

### Accidental Main Branch Commits
```bash
git checkout main
git reset --soft HEAD~1  # Undo commit but keep changes
git checkout learn/[appropriate-branch]
git add .
git commit -m "learn: [proper commit message]"
```

### Recovery from Learning Plateau
```bash
git checkout checkpoint/[last-working-milestone]
git checkout -b learn/[simplified-approach]
# Start with simpler version of concept
```

## Teaching Integration

### For Instructors/Agents
- Use commit history to assess learning progression
- Identify struggle points from commit frequency and messages
- Review branch structure to understand exploration patterns
- Use tags to quickly navigate to portfolio-ready work

### Student Self-Assessment
- Regular review of commit messages for learning reflection
- Use git log to track progression through curriculum
- Branch visualization shows exploration breadth and depth
- Tag history demonstrates major achievement milestones

This git strategy transforms version control from a development tool into an active learning and teaching aid, making visible the entire educational journey from first concepts to advanced implementations.