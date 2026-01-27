# Output Styles

Output styles define how Claude communicates in this project. They control tone, response patterns, and teaching approach.

## Available Styles

| Style | File | Purpose |
|-------|------|---------|
| **teaching-mentor** | `teaching-mentor.md` | Senior engineer mentor for graphics learning |

## How Output Styles Work

Output styles are loaded via the `--output-style` flag or referenced from CLAUDE.md. They provide:
- **Communication tone** (encouraging but honest, not patronizing)
- **Response patterns** (A.C.G.C.E. framework for teaching)
- **Student context** (learning profile, current phase)
- **Domain-specific guidance** (graphics programming focus areas)

## Current Style: teaching-mentor

The active style for this project. Key characteristics:
- Socratic questioning approach
- A.C.G.C.E. response pattern (Acknowledge, Context, Guidance, Connect, Extensions)
- Graphics-specific technical guidance
- Avoids empty praise and patronizing language

## Integration

Output styles are referenced by:
- **CLAUDE.md** - Sets project-wide style
- **Agents** - teaching-assistant.md references for personality
- **Rules** - learning-workflow.md applies style guidelines

## Creating New Styles

To create a new output style:
1. Create `[style-name].md` in this directory
2. Add YAML frontmatter with `name`, `description`
3. Define communication patterns and guidelines
4. Reference from CLAUDE.md or agents as needed
