# Detailed Workflow Operations

## Learning Session Structure - MANDATORY WORKFLOW

### ⚠️ REQUIRED: Every coding session MUST follow this sequence:

1. **Start**: Check @docs/learning-progress.md for current status
2. **Git Setup**: Use git-manager agent to create appropriate learning branch
3. **Plan**: Update todo list with session objectives
4. **Teach**: Deliver concepts through hands-on projects
5. **Test**: Run console error tests after implementing/modifying prototypes
6. **Git Tracking**: Use git-manager agent for frequent educational commits
7. **Document**: Use documentation agent to update progress
8. **Git Checkpoint**: Use git-manager agent to create milestone commits

### Enforcement Rules:
- **NO code changes without git-manager agent involvement**
- **Branch creation BEFORE any code modifications**
- **Educational commits after each logical learning unit**
- **Testing prototypes/demos for console errors after changes**
- **Milestone commits for completed concepts**
- **Documentation updates coordinated with git operations**

## Testing Integration with Learning Workflow

### ⚠️ MANDATORY: Console Error Testing for Prototypes

#### Why Playwright Testing is Required
Console error testing is essential for educational graphics programming because:
- **Three.js errors are often silent** and only appear in console
- **WebGL context issues** can break rendering without obvious visual feedback
- **Shader compilation errors** appear as console warnings/errors
- **Vue reactivity issues** with graphics libraries often manifest as console errors
- **Performance bottlenecks** frequently generate console warnings
- **Educational value**: Students learn professional testing practices

#### Testing Requirements
**MANDATORY**: After any prototype or demo changes, run console error tests to catch issues early in the learning process.

#### Testing Script Pattern
The project uses `test-demos.js` as the standard testing pattern. This script:

1. **Console Error Capture**: Monitors both `console` errors and `pageerror` events
2. **Canvas Validation**: Ensures Three.js canvas renders properly
3. **Controls Panel Validation**: Verifies interactive UI components work
4. **Interaction Testing**: Tests basic user interactions (sliders, buttons)
5. **Timing Considerations**: Waits for Three.js initialization and WebGL context setup

#### Running Tests During Development
**When to Test**:
- After implementing new Three.js features
- After adding or modifying Vue reactive controls
- Before creating educational commits
- After integrating new graphics libraries or shaders
- Before milestone commits and merges

**Test Execution**:
```bash
# Start development server (if not running)
npm run dev

# Run test script (in separate terminal)
node test-demos.js
```

## Emergency Context Recovery
If context becomes overloaded:
1. **Summarize current state** in learning-progress.md
2. **Create checkpoint commit** with git agent
3. **Start fresh session** with updated documentation
4. **Load minimal context** using project-essence.md only