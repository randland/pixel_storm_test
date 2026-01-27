# .claude Directory Guide

> **This directory contains Claude Code configuration for the educational graphics project.**

## Directory Structure

| Directory | Purpose | Index |
|-----------|---------|-------|
| `agents/` | Agents & consultants for delegation | `agents/README.md` |
| `skills/` | Invokable skills (slash commands) | `skills/README.md` |
| `output-styles/` | Response style configurations | `teaching-mentor.md` |
| `rules/` | Workflow rules and patterns | `learning-workflow.md` |

## Quick Navigation

**Need to delegate a task?** → `agents/README.md`
**Need to invoke a skill?** → `skills/README.md`
**Need reference docs?** → `../docs/reference/README.md`

## Hooks (Configured in settings.json)

These are Claude Code hook system features, not separate script files:

| Hook Event | Trigger | Purpose |
|------------|---------|---------|
| `SessionStart` | Session begins | Loads learning progress automatically |
| `PostToolUse` | After Edit/Write on Vue/shader files | Reminds to run `/demo-test` |
| `PreToolUse` | Before `git commit` commands | Reminds to lint/test before commits |

> **Note**: Hooks are configured in `settings.json` or `settings.local.json`, not as standalone shell scripts.

## Configuration

`settings.local.json` contains:
- Permissions (allowed bash commands, web domains)
- Hook configuration
- Output style setting (`teaching-mentor`)

## Primary Reference

The main project configuration is in `/CLAUDE.md` at the project root.
