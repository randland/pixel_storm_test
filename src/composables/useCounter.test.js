import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('starts at initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments', () => {
    const { count, increment } = useCounter(0)
    increment()
    expect(count.value).toBe(1)
  })

  it('resets to initial', () => {
    const { count, increment, reset } = useCounter(10)
    increment()
    increment()
    reset()
    expect(count.value).toBe(10)
  })
})
