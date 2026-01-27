# Vue 3 Composition API Patterns

> **Load this reference when**: Designing composables, structuring components, or debugging reactivity issues.

## Key Principles

### 1. Prefer `ref()` Over `reactive()`
- `ref()` works with any type, maintains reactivity when destructured
- `reactive()` only for objects, loses reactivity when destructured

### 2. Think in Connections, Not Lifecycle
Vue's `setup()` runs once to establish reactive connections. Define relationships; Vue handles updates.

### 3. Extract Logic into Composables
Keep components lean. Move reusable stateful logic into `use*` functions.

---

## Composable Design Patterns

### Return Object of Refs
```javascript
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  return { x, y }  // Destructurable and reactive
}

// Usage
const { x, y } = useMouse()           // Destructured
const mouse = reactive(useMouse())     // Single object
```

### Options Object Pattern
```javascript
export function useFetch(url, options = {}) {
  const { immediate = true, timeout = 5000 } = options
  // Implementation
}
```

### Flexible Arguments with `toValue()`
```javascript
import { toValue } from 'vue'

export function useFetch(url) {
  const fetchData = () => {
    fetch(toValue(url))  // Works with ref, getter, or string
  }
  watchEffect(fetchData)
}

// All work:
useFetch('/api/users')
useFetch(ref('/api/users'))
useFetch(() => `/api/users/${id.value}`)
```

### Async-to-Sync Pattern
```javascript
export function useFetch(url) {
  const data = shallowRef(undefined)
  const isLoading = ref(true)

  fetch(toValue(url))
    .then(r => r.json())
    .then(r => { data.value = r; isLoading.value = false })

  return { data, isLoading }
}
```

### Side Effects Cleanup
```javascript
export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

---

## Reactivity Best Practices

### `ref` vs `reactive` Decision

| Use Case | Recommended |
|----------|-------------|
| Primitives | `ref()` |
| Values that may change type | `ref()` |
| Complex nested objects | Either, prefer `ref()` |
| Consistency | Always `ref()` |

### Computed vs Methods

| Feature | `computed` | Methods |
|---------|------------|---------|
| Caching | Yes | No |
| Parameters | No | Yes |
| Side effects | Never | Allowed |
| Async | No | Yes |

### Performance with `shallowRef`
```javascript
// Large dataset - only track top-level changes
const largeData = shallowRef([/* thousands of items */])

// To trigger update after deep mutation:
largeData.value[0].name = 'Updated'
triggerRef(largeData)
```

**Use cases**: Chart libraries, large datasets, external class instances.

---

## Anti-Patterns to Avoid

### 1. Destructuring Reactive Objects
```javascript
// BAD
const { name } = reactive({ name: '' })

// GOOD
const state = reactive({ name: '' })
const { name } = toRefs(state)
```

### 2. Side Effects in Computed
```javascript
// BAD
const fullName = computed(() => {
  someOtherRef.value = 'mutated'  // NO!
  return `${first.value} ${last.value}`
})

// GOOD - use watchEffect
watchEffect(() => { if (condition.value) doSomething() })
```

### 3. Making Everything a Composable
```javascript
// BAD - pure function doesn't need composable wrapper
export function useFormatDate(date) {
  return computed(() => date.toISOString())
}

// GOOD - just export utility
export function formatDate(date) {
  return date.toISOString()
}
```

---

## State Management: Composables vs Pinia

### Use Composables Only
- Small/medium apps, local state
- Need multiple instances
- Performance-critical

### Use Pinia
- Large apps, global state (auth, cart)
- Need devtools/time-travel
- SSR with global state

---

## Sources
- [Vue.js Composables Guide](https://vuejs.org/guide/reusability/composables.html)
- [VueUse Guidelines](https://vueuse.org/guidelines.html)
- [Michael Thiessen - Composable Patterns](https://michaelnthiessen.com/composable-design-patterns/)
