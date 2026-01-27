---
name: docs-audit
description: Audit documentation for broken references, orphaned files, and duplicates
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

Performs comprehensive audit of project documentation to identify broken references, orphaned content, and maintenance issues.

## Audit Scope Options

| Scope | What It Checks |
|-------|----------------|
| (default) | Quick check of main entry points and critical references |
| `agents` | All files in .claude/agents/ |
| `skills` | All files in .claude/skills/ |
| `full` | Complete audit of all documentation |

## Audit Checklist

### 1. Broken References
Check that all `@path/to/file.md` references point to existing files:
- CLAUDE.md references
- Agent file references (Core Reference sections)
- Skill context frontmatter
- Cross-references between docs

### 2. Orphaned Files
Find files that exist but aren't reachable from CLAUDE.md:
- Scan all .md files in docs/ and .claude/
- Trace reachability from CLAUDE.md
- Report unreachable files

### 3. Duplicate Content
Identify content that appears in multiple places:
- Framework definitions (like A.C.G.C.E.)
- Error recovery procedures
- File structure listings
- Workflow descriptions

### 4. Circular References
Detect files that reference each other without clear hierarchy:
- A references B, B references A
- Long reference chains (A → B → C → D → A)

### 5. Stale Information
Check for outdated content:
- File paths that don't match current structure
- References to removed features
- Outdated command examples

## Execution Pattern

### Quick Audit (default)
```
1. Read CLAUDE.md
2. Verify all @ references exist
3. Check critical agent references
4. Report issues found
```

### Full Audit
```
1. Glob all .md files in project
2. Parse all @ references from each file
3. Build reference graph
4. Find orphaned nodes
5. Detect duplicate content patterns
6. Report comprehensive findings
```

## Output Format

```markdown
## Documentation Audit Report

### Summary
- Files checked: X
- Broken references: X
- Orphaned files: X
- Duplicates found: X

### Broken References
| File | Line | Reference | Issue |
|------|------|-----------|-------|
| path/file.md | 12 | @docs/missing.md | File not found |

### Orphaned Files
- docs/forgotten-file.md (not linked from anywhere)

### Duplicate Content
| Content | Location 1 | Location 2 | Recommendation |
|---------|-----------|-----------|----------------|
| Error recovery | git-manager.md | git-guide.md | Consolidate |

### Recommendations
1. Priority fixes...
2. ...
```

## When to Run

- **Monthly**: Full audit for comprehensive maintenance
- **After major changes**: Quick audit to verify nothing broke
- **Before milestones**: Ensure documentation is clean

## Integration with Other Skills

- Run `/docs-audit` before `/commit-learning` for major doc changes
- Combine with git-manager for documentation cleanup commits
