import { describe, it, expect } from 'vitest'
import useDynamicList from './useDynamicList'

describe('useDynamicList', () => {
  describe('initialization', () => {
    it('starts with empty items by default', () => {
      const { items } = useDynamicList()
      expect(items.length).toBe(0)
    })

    it('accepts initial items', () => {
      const { items } = useDynamicList(['a', 'b', 'c'])
      expect(items.length).toBe(3)
      expect(items[0]).toBe('a')
      expect(items[2]).toBe('c')
    })

    it('starts with empty dirty set', () => {
      const { dirty } = useDynamicList()
      expect(dirty.size).toBe(0)
    })
  })

  describe('add', () => {
    it('appends item and returns its index', () => {
      const { items, add } = useDynamicList()
      const index = add('first')
      expect(index).toBe(0)
      expect(items[0]).toBe('first')
    })

    it('marks the new index as dirty', () => {
      const { dirty, add } = useDynamicList()
      add('item')
      expect(dirty.has(0)).toBe(true)
    })

    it('adds multiple items sequentially', () => {
      const { items, add } = useDynamicList()
      expect(add('a')).toBe(0)
      expect(add('b')).toBe(1)
      expect(add('c')).toBe(2)
      expect(items.length).toBe(3)
    })
  })

  describe('remove', () => {
    it('swaps removed item with last and pops', () => {
      const { items, add, remove } = useDynamicList()
      add('a'); add('b'); add('c')
      remove(0)
      expect(items.length).toBe(2)
      expect(items[0]).toBe('c') // 'c' was last, swapped to index 0
      expect(items[1]).toBe('b') // 'b' unchanged
    })

    it('returns the removed item', () => {
      const { add, remove } = useDynamicList()
      add('a'); add('b'); add('c')
      expect(remove(1)).toBe('b')
    })

    it('marks the swapped index as dirty', () => {
      const { dirty, add, remove, flush } = useDynamicList()
      add('a'); add('b'); add('c')
      flush()
      remove(0)
      expect(dirty.has(0)).toBe(true)
    })

    it('removes the last item without marking dirty', () => {
      const { items, dirty, add, remove, flush } = useDynamicList()
      add('a'); add('b')
      flush()
      remove(1)
      expect(items.length).toBe(1)
      expect(items[0]).toBe('a')
      expect(dirty.size).toBe(0)
    })

    it('returns false for out-of-bounds index', () => {
      const { add, remove } = useDynamicList()
      add('a')
      expect(remove(5)).toBe(false)
    })

    it('returns false for negative index', () => {
      const { add, remove } = useDynamicList()
      add('a')
      expect(remove(-1)).toBe(false)
    })

    it('returns false on empty list', () => {
      const { remove } = useDynamicList()
      expect(remove(0)).toBe(false)
    })
  })

  describe('dirty tracking', () => {
    it('tracks multiple dirty indices from adds', () => {
      const { dirty, add } = useDynamicList()
      add('a'); add('b'); add('c')
      expect(dirty.has(0)).toBe(true)
      expect(dirty.has(1)).toBe(true)
      expect(dirty.has(2)).toBe(true)
    })

    it('flush clears all dirty entries', () => {
      const { dirty, add, flush } = useDynamicList()
      add('a'); add('b')
      expect(dirty.size).toBe(2)
      flush()
      expect(dirty.size).toBe(0)
    })

    it('add after remove reuses correct index', () => {
      const { items, add, remove } = useDynamicList()
      add('a'); add('b'); add('c')
      remove(0)          // ['c', 'b'], length = 2
      const idx = add('d')
      expect(idx).toBe(2) // appended at end
      expect(items[2]).toBe('d')
    })
  })
})
