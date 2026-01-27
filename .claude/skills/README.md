# Skills Index

> **Load this first** to see available skills and when to use them.

## Available Skills

| Skill | Command | When to Use |
|-------|---------|-------------|
| Lesson Start | `/lesson-start` | Beginning a learning session |
| Demo Test | `/demo-test` | Testing demos for console errors (Playwright) |
| Progress Review | `/progress-review` | Spaced repetition review of learned concepts |
| Commit Learning | `/commit-learning` | Creating educational git commits |
| Graphics Teaching | `/graphics-teaching` | Three.js/WebGPU teaching patterns |
| Testing Patterns | `/testing-patterns` | Testing standards reference |
| Educational Workflow | `/educational-workflow` | Structured workflow for sessions |
| Docs Audit | `/docs-audit` | Audit documentation for broken references and orphans |

## Skill Descriptions

### /lesson-start
**Purpose**: Full session initialization
**Usage**: `/lesson-start [topic]`
**Examples**: `/lesson-start`, `/lesson-start particle-systems`
**Does**: Loads learning progress, identifies next lesson, sets up context

### /demo-test
**Purpose**: Test demos for console errors using Playwright
**Usage**: `/demo-test [demo-name]`
**Examples**: `/demo-test`, `/demo-test hello-cube`
**Does**: Launches browser, navigates to demo, checks for console errors

### /progress-review
**Purpose**: Spaced repetition session for reinforcing learned concepts
**Usage**: `/progress-review`
**Does**: Checks progress-tracking.md for concepts due for review, generates questions

### /commit-learning
**Purpose**: Create educational git commits with learning context
**Usage**: `/commit-learning [milestone-type]`
**Examples**: `/commit-learning`, `/commit-learning checkpoint`, `/commit-learning experiment`
**Does**: Runs lint/test, stages changes, creates properly formatted commit

### /graphics-teaching
**Purpose**: Three.js and WebGPU teaching patterns for Vue 3 graphics education
**Usage**: `/graphics-teaching`
**Does**: Loads teaching patterns, provides A.C.G.C.E. framework

### /testing-patterns
**Purpose**: Testing patterns and standards for educational graphics projects
**Usage**: `/testing-patterns`
**Does**: Loads testing standards, provides patterns for visual testing

### /educational-workflow
**Purpose**: Structured workflow patterns for educational graphics sessions
**Usage**: `/educational-workflow`
**Does**: Provides session structure, checkpoint patterns, progress tracking

### /docs-audit
**Purpose**: Audit documentation for broken references, orphaned files, and duplicates
**Usage**: `/docs-audit [scope]`
**Examples**: `/docs-audit`, `/docs-audit agents`, `/docs-audit full`
**Does**: Checks @ references exist, finds orphaned files, identifies duplicate content

## Proactive Skill Usage

Claude can invoke these skills proactively when:
- Starting a session → `/lesson-start`
- After code changes to demos → `/demo-test`
- Before committing → `/commit-learning`
- When reviewing older concepts → `/progress-review`
- Monthly or after major doc changes → `/docs-audit`
