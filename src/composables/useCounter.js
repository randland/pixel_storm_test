import { ref } from 'vue'

/**
 * Simple counter composable - placeholder to verify test setup works.
 * Will be replaced with graphics composables as we learn.
 */
export function useCounter(initial = 0) {
  const count = ref(initial)

  function increment() {
    count.value++
  }

  function reset() {
    count.value = initial
  }

  return { count, increment, reset }
}
