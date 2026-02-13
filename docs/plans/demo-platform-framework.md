# Demo Platform Framework

## Context
We need a minimal platform shell before building demos. The student wants a demo selector dropdown, URL-based navigation (back/forward support), dynamic mount/unmount for Three.js memory safety, dark/light mode, and a CSS foundation. This is infrastructure for Lesson 01-03 (Hello Cube) and everything after.

## Approach

### CSS: UnoCSS with preset-wind4
- Install `unocss` + `@unocss/preset-wind4` (2 dev deps)
- Vite plugin + `uno.config.js` — zero additional config
- Built-in CSS reset replaces the inline `<style>` in `index.html`
- Tailwind-compatible utility classes (`flex`, `gap-2`, `dark:bg-gray-800`, etc.)

### Demo Discovery: Convention-based via `import.meta.glob`
- Pattern: `src/demos/{name}/index.vue` — drop a folder, it appears in the dropdown
- `import.meta.glob` gives lazy-loaded dynamic imports (code splitting for free)
- Composable: `useDemoRegistry()` → `{ demoNames, getComponent }`

### URL Routing: VueUse `useUrlSearchParams` (no Vue Router)
- URL format: `?demo=hello-cube`
- `writeMode: 'push'` → back/forward buttons work (confirmed in VueUse 14.1.0 types)
- Composable: `useDemoRouter()` → `{ currentName, currentDemo, navigateTo }`

### Dark Mode: VueUse `useDark` + UnoCSS `dark:` prefix
- `useDark()` toggles `class="dark"` on `<html>` (persists to localStorage)
- UnoCSS class-based dark mode matches automatically

### Mount/Unmount: Vue `<component :is="" :key="">`
- `:key="currentName"` forces full destroy+recreate on demo switch
- Three.js cleanup happens naturally via Vue unmount lifecycle

## Files to Create/Modify

### New Files
| File | Purpose |
|------|---------|
| `uno.config.js` | UnoCSS config with preset-wind4 |
| `src/composables/useDemoRegistry.js` | Auto-discover demos via import.meta.glob |
| `src/composables/useDemoRouter.js` | URL param routing with history support |
| `src/components/DemoSelector.vue` | Floating dropdown + dark mode toggle |
| `src/demos/hello-cube/index.vue` | Minimal placeholder demo (TresJS cube) |
| `src/composables/useDemoRegistry.test.js` | Registry unit tests |
| `src/composables/useDemoRouter.test.js` | Router unit tests |

### Modified Files
| File | Change |
|------|--------|
| `vite.config.js` | Add UnoCSS plugin (before vue plugin) |
| `src/main.js` | Add `import 'virtual:uno.css'` |
| `index.html` | Remove inline `<style>` block (UnoCSS reset handles it) |
| `src/App.vue` | Layout shell wiring registry + router + selector |

### Removed Files
| File | Reason |
|------|--------|
| `src/demos/.gitkeep` | Replaced by actual demo folder |

## Implementation Order
1. `npm install -D unocss @unocss/preset-wind4`
2. Create `uno.config.js`
3. Modify `vite.config.js` — add UnoCSS plugin
4. Modify `src/main.js` — add virtual CSS import
5. Modify `index.html` — remove inline styles
6. Create `src/composables/useDemoRegistry.js`
7. Create `src/composables/useDemoRouter.js`
8. Create `src/components/DemoSelector.vue`
9. Create `src/demos/hello-cube/index.vue`
10. Modify `src/App.vue` — wire everything together
11. Delete `src/demos/.gitkeep`
12. Create test files
13. Run lint + tests

## Verification
1. `npm run dev` — app loads, dark background, "Select a demo" message visible
2. Dropdown shows "hello-cube" option
3. Selecting it renders a TresJS cube
4. URL updates to `?demo=hello-cube`
5. Refresh keeps the demo loaded
6. Back button returns to empty state
7. Dark/light toggle works on dropdown and welcome text
8. `npm run lint` passes
9. `npm run test:run` passes

## Intentionally Deferred
- Prev/next navigation (Lesson 04-04)
- Control panels (Lesson 04-03)
- Category grouping (not needed until many demos)
- Loading/error states for async components
- Demo transitions
