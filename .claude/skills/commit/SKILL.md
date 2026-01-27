---
name: commit
description: Quick git commits with conversation context
usage: /commit [type]
examples:
  - /commit
  - /commit checkpoint
  - /commit experiment
allowed-tools:
  - Bash(git:*)
  - Bash(npm run lint:*)
  - Bash(npm run test:*)
  - Read
---

# Commit Skill

Quick commits that leverage conversation context. For complex git operations (merge conflicts, rebasing, branch strategy), delegate to git-manager agent instead.

## When to Use

| Situation | Use This | Use git-manager Agent |
|-----------|----------|----------------------|
| Simple commit after work | ✅ | ❌ |
| Checkpoint/milestone | ✅ | ❌ |
| Merge conflict | ❌ | ✅ |
| Rebase/history rewrite | ❌ | ✅ |
| Branch strategy decisions | ❌ | ✅ |

## Quick Workflow

### 1. Check Status
```bash
git status
git diff --stat
```

### 2. Run Pre-Commit (if available)
```bash
npm run lint 2>/dev/null || true
npm run test:run 2>/dev/null || true
```

### 3. Stage & Commit
```bash
git add [files]
git commit -m "$(cat <<'EOF'
type: subject - brief description

- Key change 1
- Key change 2
EOF
)"
```

## Commit Types

| Type | When to Use |
|------|-------------|
| `learn` | New concept or skill demonstrated |
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `refactor` | Code improvement without behavior change |
| `docs` | Documentation updates |
| `checkpoint` | Major milestone completion |
| `experiment` | Exploratory work (may fail) |

## Message Guidelines

- **Use conversation context**: You know what was just discussed/built
- **Keep it concise**: 1-2 sentence summary, bullet points for details
- **Match branch type**: `learn/*` branches get `learn:` commits
- **No AI attribution**: Do not add co-author lines or reference Claude

## Examples

### After implementing a feature
```
feat: add particle system controls - slider for count and speed

- Added reactive sliders for particle count (100-10000)
- Speed control affects velocity multiplier
- Maintains 60fps up to 5000 particles
```

### After a teaching session
```
learn: WebGPU compute shaders - basic workgroup dispatch

- Implemented 8x8 workgroup for parallel computation
- Demonstrated buffer read/write patterns
- Visualized thread distribution

Curriculum: Section 08 - TSL & WebGPU
```

### Checkpoint
```
checkpoint: phase-1-complete - TresJS foundation working

Completed:
- Scene setup with reactive controls
- Camera and lighting presets
- Basic geometry rendering

Ready for: Phase 2 - GPU Computing Introduction
```
