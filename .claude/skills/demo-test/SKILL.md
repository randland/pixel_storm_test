---
name: demo-test
description: Playwright-based testing for demo console errors and rendering
usage: /demo-test [url]
examples:
  - /demo-test
  - /demo-test http://localhost:5173/demo/particles
  - /demo-test /demo/noise
allowed-tools:
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_snapshot
  - mcp__playwright__browser_console_messages
  - mcp__playwright__browser_wait_for
  - mcp__playwright__browser_close
  - Bash(npm run dev:*)
---

# Demo Test Skill

Automated testing of demo pages for console errors using Playwright MCP tools.

## Workflow

### 1. Navigate to Demo
```
Use mcp__playwright__browser_navigate to open the demo URL.
Default: http://localhost:5173
```

### 2. Wait for Initialization
```
Use mcp__playwright__browser_wait_for with time: 3 (seconds)
This allows Three.js/WebGPU to initialize fully.
```

### 3. Capture Page State
```
Use mcp__playwright__browser_snapshot to capture current page accessibility tree.
Verify expected elements are present (canvas, controls, etc.).
```

### 4. Check Console Messages
```
Use mcp__playwright__browser_console_messages with level: "error"
Report any errors found.
```

### 5. Report Results
Summarize findings:
- Page loaded successfully: yes/no
- Console errors: count and details
- Expected elements present: list
- Recommendations for fixes

## Testing Standards

### Pass Criteria
- Zero console errors
- Canvas element present and rendering
- No WebGL context loss warnings
- Controls responsive (if applicable)

### Common Issues to Check
- Three.js initialization errors
- Shader compilation failures
- Resource loading failures (textures, models)
- Memory/disposal warnings
- Vue reactivity errors

## Usage Notes

If no URL is provided, test the root development server at http://localhost:5173.

For specific demo routes, provide the full URL or just the path (will be appended to localhost:5173).

Always close the browser after testing with mcp__playwright__browser_close.
