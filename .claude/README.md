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

## Hooks (Shell scripts in `.claude/hooks/`)

These are standalone executable shell scripts in `.claude/hooks/`, wired up to Claude Code hook events via `settings.local.json`:

| Hook Event | Script | Trigger | Purpose |
|------------|--------|---------|---------|
| `SessionStart` | `session-init.sh` | Session begins | Loads learning progress automatically |
| `PostToolUse` | `auto-test-reminder.sh` | After Edit/Write | Reminds to run `/demo-test` |
| `PreToolUse` | `pre-commit-guard.sh` | Before Bash commands | Reminds to lint/test before commits |

> **Note**: The hook logic lives in the `.claude/hooks/*.sh` scripts; `settings.local.json` only maps each hook event to the script that runs it.

## Configuration

`settings.local.json` contains:
- `permissions` (`defaultMode`)
- `hooks` (maps hook events to the scripts in `.claude/hooks/`)
- `outputStyle` (`teaching-mentor`)

## Primary Reference

The main project configuration is in `/CLAUDE.md` at the project root.
