# .claude Directory Guide

> **This directory contains Claude Code configuration for the educational graphics project.**

## Directory Structure

| Directory | Purpose | Index |
|-----------|---------|-------|
| `agents/` | Specialized agents for delegation | `agents/README.md` |
| `skills/` | Invokable skills (slash commands) | `skills/README.md` |
| `hooks/` | Automation hooks (session start, pre-commit) | See below |
| `output-styles/` | Response style configurations | `teaching-mentor.md` |
| `rules/` | Workflow rules and patterns | `learning-workflow.md` |

## Quick Navigation

**Need to delegate a task?** → `agents/README.md`
**Need to invoke a skill?** → `skills/README.md`
**Need reference docs?** → `../docs/reference/README.md`

## Hooks (Automated)

| Hook | Trigger | Purpose |
|------|---------|---------|
| `session-init.sh` | SessionStart | Loads learning progress at session start |
| `auto-test-reminder.sh` | PostToolUse (Edit/Write) | Reminds to test after Vue/shader changes |
| `pre-commit-guard.sh` | PreToolUse (Bash git commit) | Reminds to lint/test before commits |

## Configuration

`settings.local.json` contains:
- Permissions (allowed bash commands, web domains)
- Hook configuration
- Output style setting (`teaching-mentor`)

## Primary Reference

The main project configuration is in `/CLAUDE.md` at the project root.
