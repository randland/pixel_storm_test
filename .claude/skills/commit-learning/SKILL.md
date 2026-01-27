---
name: commit-learning
description: Educational git commits with learning context and curriculum alignment
usage: /commit-learning [milestone-type]
examples:
  - /commit-learning
  - /commit-learning checkpoint
  - /commit-learning experiment
  - /commit-learning milestone
context:
  - docs/git-complete-guide.md
  - docs/learning-progress.md
allowed-tools:
  - Bash(git:*)
---

# Commit Learning Skill

Creates educational git commits that document learning progress and align with curriculum objectives.

## Commit Message Format

### Standard Learning Commit
```
learn: [topic] - [what was accomplished]

- [Specific implementation detail]
- [Concept demonstrated]
- [Learning outcome achieved]

Curriculum: [Related curriculum item]
```

### Checkpoint Commit
```
checkpoint: [phase-name] - [milestone description]

Completed:
- [Major accomplishment 1]
- [Major accomplishment 2]

Skills demonstrated:
- [Skill 1]
- [Skill 2]

Next objectives:
- [Upcoming goal 1]
- [Upcoming goal 2]
```

### Experiment Commit
```
experiment: [topic] - [what was tested]

Hypothesis: [What was being explored]
Result: [What was discovered]
Learning: [Key takeaway]
```

## Commit Workflow

### 1. Review Changes
```bash
git status
git diff --staged
```

### 2. Verify Testing
Ensure /demo-test has been run with zero errors.

### 3. Compose Message
Follow the appropriate format based on commit type.

### 4. Create Commit
```bash
git add [specific files]
git commit -m "$(cat <<'EOF'
learn: topic - description

- Detail 1
- Detail 2

Curriculum: Related item

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### 5. Update Documentation
After significant commits, delegate to documentation agent to update:
- docs/learning-progress.md
- Any relevant curriculum items

## Milestone Types

### checkpoint
Major learning milestone completed. Use when:
- Completing a curriculum phase
- Achieving significant understanding
- Creating portfolio-worthy demonstration

### experiment
Exploratory work that may or may not succeed. Use when:
- Testing new approaches
- Learning through trial and error
- Documenting failed but instructive attempts

### milestone
Formal curriculum completion. Use when:
- Finishing a defined learning objective
- Ready to move to next curriculum phase
- Creating tagged release point

## Branch Naming Alignment
Commits should align with branch purpose:
- `learn/*` branches: Standard learning commits
- `experiment/*` branches: Experiment commits
- `main`/`master`: Only checkpoint/milestone commits
