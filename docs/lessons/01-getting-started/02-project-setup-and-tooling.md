# Lesson 01-02: Project Setup & Tooling

> **Section**: Getting Started
> **Status**: `[ ]` Planned
> **Estimated Time**: 1-2 hours

## Learning Objectives

By the end of this lesson, you will:
- [ ] Have TresJS and dependencies installed and working
- [ ] Understand the project structure for a graphics learning platform
- [ ] Have ESLint configured for Vue 3 code quality
- [ ] Have Vitest ready for testing composables
- [ ] Know the development workflow: code → lint → test → commit

## Prerequisites

- Lesson 01-01: 3D Graphics Concepts (mental models)
- Node.js 18+ installed
- Familiarity with npm/package.json

## Target Artifacts

This lesson produces working project infrastructure:

```
package.json          # Updated with lint/test scripts
eslint.config.js      # Vue 3 ESLint flat config
vitest.config.js      # Test configuration
src/
  components/         # Vue components
  composables/        # Reusable logic (our toolkit)
  demos/              # Learning demo components
```

## Key Concepts

### TresJS Dependencies
```bash
npm install @tresjs/core three
npm install @tresjs/cientos  # Helpful abstractions
```

### ESLint for Vue 3
- Catches common mistakes before they become bugs
- Enforces consistent code style
- Vue-specific rules for template and script

### Vitest for Testing
- Fast, Vite-native test runner
- Perfect for testing composables
- Instant feedback during development

### Development Workflow
```
┌──────────────────────────────────────┐
│  1. Write/edit code                  │
│  2. npm run lint (fix issues)        │
│  3. npm run test (verify behavior)   │
│  4. /demo-test (check visuals)       │
│  5. /commit-learning (document)      │
└──────────────────────────────────────┘
```

## Exercises

*To be completed during lesson*

1. **Install TresJS**: Add dependencies and verify installation
2. **Configure ESLint**: Set up flat config for Vue 3
3. **Configure Vitest**: Create first passing test
4. **Run the workflow**: Practice the full lint → test → commit cycle

## npm Scripts Target

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --fix",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Resources

- [TresJS Installation Guide](https://docs.tresjs.org/guide/getting-started.html)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [Vitest Getting Started](https://vitest.dev/guide/)

## Notes

*Space for observations during the lesson*
