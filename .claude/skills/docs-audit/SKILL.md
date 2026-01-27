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
  - .claude/agents/README.md
  - .claude/skills/README.md
allowed-tools:
  - Glob
  - Grep
  - Read
  - Write
  - Edit
  - Bash(ls:*)
  - Bash(mkdir:*)
  - Task
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

### Registration Validation

#### Skills
| Skill | Directory | README | CLAUDE.md | Frontmatter |
|-------|-----------|--------|-----------|-------------|
| lesson-start | ✅ | ✅ | ✅ | ✅ |
| [name] | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |

#### Agents
| Agent | File | README | CLAUDE.md | References Valid |
|-------|------|--------|-----------|------------------|
| git-manager | ✅ | ✅ | ✅ | ✅ |
| [name] | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |

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

## Saving Audit Reports

**All audit reports should be saved** to `docs/audits/` for historical reference:

```
docs/audits/
├── 2026-01-27-full-audit.md
├── 2026-02-15-agents-audit.md
└── ...
```

**Filename format**: `YYYY-MM-DD-[scope]-audit.md`

**Report template**: Use the Output Format section above as the structure.

**Benefits**:
- Track documentation health over time
- Compare before/after major refactors
- Identify recurring issues
- Reference for future maintenance

## Registration Validation

A critical part of the audit is verifying that all skills and agents are properly registered.

### Skills Validation Checklist

For each skill directory in `.claude/skills/*/SKILL.md`:

1. **File exists**: Does `SKILL.md` exist in the directory?
2. **Frontmatter valid**: Does it have `name`, `description`, `usage` fields?
3. **Registered in README**: Is it listed in `.claude/skills/README.md`?
4. **Registered in CLAUDE.md**: Is it listed in the Skills table?
5. **Context files exist**: Do all files in `context:` frontmatter exist?

### Agents Validation Checklist

For each agent file in `.claude/agents/*.md` (excluding README.md):

1. **Has Core Reference section**: Does it declare what files it loads?
2. **Registered in README**: Is it listed in `.claude/agents/README.md`?
3. **Registered in CLAUDE.md**: Is it listed in Agent Delegation section?
4. **Referenced files exist**: Do all `@path` references point to real files?

### Validation Commands

```bash
# List all skill directories
ls -d .claude/skills/*/

# List all agent files
ls .claude/agents/*.md

# Compare against CLAUDE.md registrations
grep -E "^\\| \`/" CLAUDE.md  # Skills
grep -E "^\\*\\*" CLAUDE.md   # Agents
```

### Common Registration Issues

| Issue | Symptom | Fix |
|-------|---------|-----|
| Skill exists but not in CLAUDE.md | Users can't discover it | Add to Skills table |
| Agent exists but not in README | Delegation unclear | Add to agents/README.md |
| CLAUDE.md lists non-existent skill | `/command` fails | Remove from table or create skill |
| Frontmatter missing context | Hidden dependencies | Add required files to `context:` |

## Context Types Explained

| Type | Location | Purpose | Entry Point? |
|------|----------|---------|--------------|
| **Agent** | `.claude/agents/` | Specialized delegation target | Yes (via Task tool) |
| **Skill** | `.claude/skills/` | User/Claude-invokable command | Yes (via /command) |
| **Output Style** | `.claude/output-styles/` | Communication personality | Loaded into main context |
| **Reference Doc** | `docs/reference/` | Technical patterns | Loaded on-demand |
| **Context Module** | `docs/context-modules/` | Project state/specs | Loaded on-demand |
| **Rules** | `.claude/rules/` | Behavior protocols | Loaded into main context |

## Agent vs Skill Classification Audit

### Decision Criteria

**Should be an AGENT when:**
- Task requires **fresh context** (deep research, complex multi-step work)
- Work should be **offloaded** to preserve main conversation focus
- Output is a **single result** returned to main conversation
- Task is **self-contained** and doesn't need conversation history
- Benefits from **parallel execution** with other work

**Should be a SKILL when:**
- Task is a **repeatable workflow** (checklist, procedure)
- Needs **conversation context** to work properly
- Provides **formatting templates** or consistent structure
- Is **quick** and doesn't need deep exploration
- User should be able to **invoke by command**

**Should be RULES/OUTPUT STYLE when:**
- Defines **behavior patterns** that apply throughout conversation
- Describes **how to communicate**, not what to do
- Should be **always active**, not invoked on demand

### Classification Audit Questions

For each agent, ask:
1. Does it actually get delegated via Task tool, or just referenced?
2. Does it do multi-step work, or mainly provide advice?
3. Does it need fresh context, or does it need conversation history?
4. Is the output a result, or is the interaction itself the value?

For each skill, ask:
1. Is it a workflow/checklist, or complex exploration?
2. Does it need conversation context?
3. Could it benefit from fresh context instead?

### Red Flags

| Pattern | Suggests Wrong Classification |
|---------|------------------------------|
| Agent never actually spawned via Task | Should be rules/style or skill |
| Agent needs conversation history to work | Should be skill or rules |
| Skill does deep multi-step research | Should be agent |
| Skill output is advice, not formatted result | May be better as agent |
| "Agent" is really just guidelines | Should be rules or output style |
