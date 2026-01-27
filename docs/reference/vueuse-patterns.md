# VueUse Patterns Reference

> **Load this reference when**: Building composables, needing animation/input utilities, or learning from VueUse's design.

## Key Composables for Graphics

### Animation
| Composable | Purpose |
|------------|---------|
| `useRafFn` | requestAnimationFrame wrapper with `delta`, `fpsLimit`, pause/resume |
| `useIntervalFn` | setInterval wrapper, pausable |
| `useTransition` | Smooth value transitions with 20+ easing presets |

### Input/Sensors
| Composable | Purpose |
|------------|---------|
| `useMouse` | Reactive mouse position (x/y, coordinate systems) |
| `usePointer` | Full pointer state (pressure, tilt, twist) |
| `onClickOutside` | Click outside detection |

### Elements
| Composable | Purpose |
|------------|---------|
| `useResizeObserver` | Element size changes |
| `useElementSize` | Reactive element dimensions |
| `useWindowSize` | Reactive window size (SSR-safe) |

### Persistence
| Composable | Purpose |
|------------|---------|
| `useStorage` | Reactive localStorage/sessionStorage |

### Utilities
| Composable | Purpose |
|------------|---------|
| `useEventListener` | Auto-cleanup event listeners |
| `refDebounced` / `refThrottled` | Input optimization |

---

## VueUse Design Patterns

### 1. MaybeRefOrGetter (Flexible Inputs)
```javascript
import { toValue } from 'vue'

function useMyComposable(input) {
  // Works with: 42, ref(42), () => 42
  const value = computed(() => toValue(input) * 2)
  return value
}
```

### 2. Options Object Pattern
```javascript
function useMyComposable(callback, options = {}) {
  const { immediate = true, fpsLimit } = options
}
```

### 3. Pausable/Stoppable Return
```javascript
function useAnimation(callback) {
  const isActive = ref(true)

  return {
    isActive: readonly(isActive),
    pause: () => { isActive.value = false },
    resume: () => { isActive.value = true }
  }
}
```

### 4. isSupported Pattern
```javascript
function useWebGPU() {
  const isSupported = computed(() =>
    typeof navigator !== 'undefined' && 'gpu' in navigator
  )
  return { isSupported }
}
```

### 5. tryOnScopeDispose for Cleanup
```javascript
import { tryOnScopeDispose } from '@vueuse/core'

function useAnimation() {
  let animationId

  tryOnScopeDispose(() => {
    cancelAnimationFrame(animationId)
  })
}
```

### 6. Configurable Window/Document (SSR)
```javascript
import { defaultWindow } from '@vueuse/core'

function useMyComposable(options = {}) {
  const { window = defaultWindow } = options
  if (!window) return { /* fallback */ }
}
```

---

## Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `use` | Standard composables | `useMouse` |
| `create` | Factory functions | `createSharedComposable` |
| `on` | Event listeners | `onClickOutside` |
| `try` | Safe operations | `tryOnScopeDispose` |

---

## Graphics Composable Template

```javascript
import { ref, shallowRef, readonly } from 'vue'
import { tryOnScopeDispose, defaultWindow } from '@vueuse/core'

export function useAnimationLoop(callback, options = {}) {
  const {
    immediate = true,
    fpsLimit,
    window = defaultWindow,
  } = options

  const isActive = shallowRef(immediate)
  const frameCount = shallowRef(0)

  let animationId = null
  let lastTime = 0
  const minFrameTime = fpsLimit ? 1000 / fpsLimit : 0

  const tick = (time) => {
    if (!isActive.value) return

    const delta = time - lastTime
    if (delta < minFrameTime) {
      animationId = window?.requestAnimationFrame(tick)
      return
    }

    lastTime = time
    frameCount.value++
    callback(delta, time)
    animationId = window?.requestAnimationFrame(tick)
  }

  const pause = () => {
    isActive.value = false
    if (animationId && window) {
      window.cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  const resume = () => {
    if (isActive.value) return
    isActive.value = true
    lastTime = performance.now()
    animationId = window?.requestAnimationFrame(tick)
  }

  if (immediate && window) resume()
  tryOnScopeDispose(pause)

  return {
    isActive: readonly(isActive),
    frameCount: readonly(frameCount),
    pause,
    resume,
  }
}
```

---

## Sources
- [VueUse Documentation](https://vueuse.org/)
- [VueUse Guidelines](https://vueuse.org/guidelines.html)
- [VueUse GitHub](https://github.com/vueuse/vueuse)
