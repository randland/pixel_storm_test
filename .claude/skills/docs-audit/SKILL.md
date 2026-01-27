---
name: docs-audit
description: Audit documentation architecture for proper information partitioning
usage: /docs-audit [scope]
examples:
  - /docs-audit
  - /docs-audit agents
  - /docs-audit skills
  - /docs-audit full
context:
  - CLAUDE.md
---

# Documentation Audit Skill

Audits the documentation architecture to ensure each context (agent, skill, output style) has access to exactly the information it needs—no more, no less.

## Philosophy

Good documentation architecture means:
- **Each context is self-sufficient** for its specific job
- **No unnecessary loading** of irrelevant information
- **Clear hierarchy** where specialized contexts reference authoritative sources
- **No duplication** that could drift out of sync
- **Discoverable paths** from entry points to needed information

## Audit Execution

**This skill uses subagents** to deeply analyze each context type. Each subagent evaluates a specific domain.

### Scope Options

| Scope | Subagents Spawned |
|-------|-------------------|
| (default) | Entry point analysis only |
| `agents` | One subagent per agent file |
| `skills` | One subagent per skill file |
| `output-styles` | One subagent for output styles |
| `full` | All of the above + cross-cutting analysis |

## Per-Context Analysis

For each agent/skill/style, the subagent evaluates:

### 1. Information Accessibility
**Question**: Can this context reach everything it needs to do its job?

- What is this context's **purpose**?
- What **information** does it need to fulfill that purpose?
- Can it **reach** that information via its references?
- Are there **gaps** where it needs info but can't access it?

### 2. Information Efficiency
**Question**: Does this context load only what it needs?

- What does it **actually reference**?
- Is each reference **necessary** for its purpose?
- Could any references be **removed** without impacting function?
- Does it load **broad context** when it only needs **specific info**?

### 3. Source of Truth
**Question**: Does this context define things it shouldn't, or properly defer?

- Does it **duplicate** content that exists elsewhere?
- Does it **reference** authoritative sources instead of copying?
- If it defines something, is it the **right place** for that definition?
- Could changes elsewhere cause this context to become **stale**?

### 4. Self-Containment
**Question**: Can this context operate independently or does it have hidden dependencies?

- Are all **required references** declared (in frontmatter or Core Reference)?
- Does it **assume context** that isn't explicitly loaded?
- Could a fresh session **use this context** without prior knowledge?
- Does it reference files that **reference it back** (circular)?

## Subagent Prompts

### For Agent Analysis
```
Analyze [agent-file.md] as a context window entry point:

1. PURPOSE: What is this agent supposed to do?
2. NEEDS: What information does it need to do that job?
3. HAS: What does it actually reference/load?
4. GAPS: What's missing that it needs?
5. EXCESS: What does it load that it doesn't need?
6. DUPLICATES: What does it define that exists elsewhere?
7. DEPENDENCIES: What does it assume without declaring?

Provide specific file paths and line numbers for all findings.
```

### For Skill Analysis
```
Analyze [skill/SKILL.md] as a context window entry point:

1. PURPOSE: What does this skill do when invoked?
2. CONTEXT FRONTMATTER: What files does it declare loading?
3. BODY REFERENCES: What files does it reference in the body?
4. MISMATCH: Are body references not in frontmatter (hidden deps)?
5. UNUSED: Are frontmatter items never used in the body?
6. COMPLETENESS: Can this skill execute with only declared context?

Provide specific findings with line numbers.
```

### For Cross-Cutting Analysis
```
Analyze the overall documentation architecture:

1. ENTRY POINTS: List all context entry points (CLAUDE.md, agents, skills, styles)
2. REFERENCE GRAPH: Map what references what
3. ORPHANS: Files not reachable from any entry point
4. HOTSPOTS: Files referenced by many contexts (risk of change impact)
5. PARTITIONING: Is information properly separated by concern?
6. HIERARCHY: Is there clear authority (who defines what)?

Provide a visual graph and specific recommendations.
```

## Output Format

```markdown
## Documentation Architecture Audit

### Executive Summary
- Contexts analyzed: X
- Well-partitioned: X
- Needs attention: X
- Critical issues: X

### Per-Context Findings

#### [context-name]
**Purpose**: [what it does]
**Verdict**: ✅ Well-partitioned | ⚠️ Needs attention | ❌ Critical issues

| Aspect | Status | Finding |
|--------|--------|---------|
| Accessibility | ✅/⚠️/❌ | [can reach what it needs?] |
| Efficiency | ✅/⚠️/❌ | [loads only what it needs?] |
| Source of Truth | ✅/⚠️/❌ | [defers appropriately?] |
| Self-Containment | ✅/⚠️/❌ | [declares all dependencies?] |

**Issues**:
1. [specific issue with file:line]

**Recommendations**:
1. [specific fix]

### Architecture-Wide Findings

#### Information Hotspots
Files referenced by 3+ contexts (high change impact):
- [file] → referenced by [list of contexts]

#### Orphaned Content
Files not reachable from any entry point:
- [file]

#### Partitioning Issues
Information that should be separated but isn't:
- [description]

### Priority Fixes
1. [Critical] ...
2. [High] ...
3. [Medium] ...
```

## When to Run

| Trigger | Scope | Why |
|---------|-------|-----|
| Monthly maintenance | `full` | Catch drift before it accumulates |
| After adding agent/skill | `agents` or `skills` | Verify new context is well-integrated |
| After major refactor | `full` | Ensure partitioning wasn't broken |
| Before milestone | (default) | Quick sanity check |

## Context Types Explained

| Type | Location | Purpose | Entry Point? |
|------|----------|---------|--------------|
| **Agent** | `.claude/agents/` | Specialized delegation target | Yes (via Task tool) |
| **Skill** | `.claude/skills/` | User/Claude-invokable command | Yes (via /command) |
| **Output Style** | `.claude/output-styles/` | Communication personality | Loaded into main context |
| **Reference Doc** | `docs/reference/` | Technical patterns | Loaded on-demand |
| **Context Module** | `docs/context-modules/` | Project state/specs | Loaded on-demand |
| **Rules** | `.claude/rules/` | Behavior protocols | Loaded into main context |
