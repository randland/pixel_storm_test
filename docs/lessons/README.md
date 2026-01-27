# Lessons Directory

This directory contains the structured curriculum for learning WebGPU, TresJS, and graphics programming.

## Structure

```
lessons/
├── 00-curriculum-outline.md    # Master progress tracker
├── tangents-queue.md           # Parking lot for exploration ideas
├── README.md                   # This file
│
├── 01-getting-started/         # Foundation (no artifacts)
├── 02-scene-fundamentals/      # Core Three.js concepts
├── 03-scene-organization/      # Structuring larger scenes
├── 04-platform-architecture/   # Demo platform infrastructure
├── 05-interactivity/           # User input and animation
├── 06-visual-effects/          # Particles, post-processing
├── 07-shader-foundations/      # GPU mindset and math
├── 08-tsl-webgpu/              # Three.js Shading Language
└── 09-advanced-patterns/       # Open-ended advanced topics
```

## Workflow

### Starting a Lesson
1. Open the lesson file and review objectives
2. Check prerequisites are complete
3. Work through exercises hands-on
4. Build the target artifact (if applicable)

### Completing a Lesson
1. Verify all learning objectives are checked
2. Ensure artifact tests pass (if applicable)
3. Update `00-curriculum-outline.md` status
4. Commit with `/commit`

### Adding a Lesson Request
If during learning you realize "we should cover X":
1. Add to "Lesson Request Queue" in `00-curriculum-outline.md`
2. Note which section it probably belongs in
3. We'll place it properly and create a stub file

### Adding a Tangent
If during learning you think "I wonder how X works":
1. Add to `tangents-queue.md`
2. Continue with the current lesson
3. Explore the tangent later when curious

## Numbering Scheme

- Sections: `01-getting-started`, `02-scene-fundamentals`, etc.
- Lessons within sections: `01-topic.md`, `02-topic.md`, etc.
- Adding a new lesson to Section 02 doesn't affect Section 03's numbering

## Git Workflow for Lessons

```bash
# Starting a new lesson
git checkout learn/fresh-architecture

# After completing a lesson
npm run lint && npm run test
/demo-test
/commit
```

## Progress Tracking

The `00-curriculum-outline.md` file is the source of truth for:
- Overall curriculum structure
- Completion status per lesson
- Lesson requests waiting to be placed
- Historical progress log
