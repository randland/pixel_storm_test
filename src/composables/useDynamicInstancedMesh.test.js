import { describe, it, expect } from 'vitest'
import { BoxGeometry, MeshBasicMaterial, Matrix4, Color } from 'three'
import useDynamicInstancedMesh from './useDynamicInstancedMesh'

const createTestMesh = (capacity = 10) => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  return useDynamicInstancedMesh(geometry, material, capacity)
}

const getPosition = (mesh, index) => {
  const m = new Matrix4()
  mesh.getMatrixAt(index, m)
  return { x: m.elements[12], y: m.elements[13], z: m.elements[14] }
}

const getColor = (mesh, index) => {
  const c = new Color()
  mesh.getColorAt(index, c)
  return c
}

describe('useDynamicInstancedMesh', () => {
  describe('initialization', () => {
    it('starts with count 0', () => {
      const { mesh } = createTestMesh(100)
      expect(mesh.value.count).toBe(0)
    })

    it('exposes an InstancedMesh via shallowRef', () => {
      const { mesh } = createTestMesh()
      expect(mesh.value).toBeDefined()
      expect(mesh.value.isInstancedMesh).toBe(true)
    })
  })

  describe('add', () => {
    it('returns the instance index', () => {
      const { add } = createTestMesh()
      expect(add({ x: 0, y: 0, z: 0, color: '#ff0000' })).toBe(0)
      expect(add({ x: 1, y: 0, z: 0, color: '#00ff00' })).toBe(1)
    })

    it('increments mesh count', () => {
      const { mesh, add } = createTestMesh()
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      add({ x: 1, y: 0, z: 0, color: '#00ff00' })
      expect(mesh.value.count).toBe(2)
    })
  })

  describe('remove', () => {
    it('decrements mesh count', () => {
      const { mesh, add, remove } = createTestMesh()
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      add({ x: 1, y: 0, z: 0, color: '#00ff00' })
      remove(0)
      expect(mesh.value.count).toBe(1)
    })

    it('returns the removed props', () => {
      const { add, remove } = createTestMesh()
      add({ x: 5, y: 0, z: 0, color: '#ff0000' })
      add({ x: 9, y: 0, z: 1, color: '#00ff00' })
      const removed = remove(0)
      expect(removed.x).toBe(5)
      expect(removed.color).toBe('#ff0000')
    })

    it('returns false for invalid index', () => {
      const { remove } = createTestMesh()
      expect(remove(0)).toBe(false)
      expect(remove(-1)).toBe(false)
    })
  })

  describe('update', () => {
    it('partial update is reflected after flush', () => {
      const { mesh, add, update, flush } = createTestMesh()
      add({ x: 1, y: 2, z: 3, color: '#ff0000' })
      flush()
      update(0, { y: 99 })
      flush()
      const pos = getPosition(mesh.value, 0)
      expect(pos.x).toBeCloseTo(1)
      expect(pos.y).toBeCloseTo(99)
      expect(pos.z).toBeCloseTo(3)
    })
  })

  describe('flush', () => {
    it('applies position to instance matrix', () => {
      const { mesh, add, flush } = createTestMesh()
      add({ x: 3, y: 1, z: -2, color: '#ffffff' })
      flush()
      const pos = getPosition(mesh.value, 0)
      expect(pos.x).toBeCloseTo(3)
      expect(pos.y).toBeCloseTo(1)
      expect(pos.z).toBeCloseTo(-2)
    })

    it('applies color to instance', () => {
      const { mesh, add, flush } = createTestMesh()
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      flush()
      const c = getColor(mesh.value, 0)
      expect(c.r).toBeCloseTo(1)
      expect(c.g).toBeCloseTo(0)
      expect(c.b).toBeCloseTo(0)
    })

    it('increments buffer version (needsUpdate is write-only in Three.js)', () => {
      const { mesh, add, flush } = createTestMesh()
      const versionBefore = mesh.value.instanceMatrix.version
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      flush()
      expect(mesh.value.instanceMatrix.version).toBeGreaterThan(versionBefore)
    })

    it('skips when nothing is dirty', () => {
      const { mesh, add, flush } = createTestMesh()
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      flush()
      const versionAfterFirstFlush = mesh.value.instanceMatrix.version
      flush()
      expect(mesh.value.instanceMatrix.version).toBe(versionAfterFirstFlush)
    })

    it('handles multiple dirty indices', () => {
      const { mesh, add, flush } = createTestMesh()
      add({ x: 1, y: 0, z: 0, color: '#ff0000' })
      add({ x: 2, y: 0, z: 0, color: '#00ff00' })
      add({ x: 3, y: 0, z: 0, color: '#0000ff' })
      flush()
      expect(getPosition(mesh.value, 0).x).toBeCloseTo(1)
      expect(getPosition(mesh.value, 1).x).toBeCloseTo(2)
      expect(getPosition(mesh.value, 2).x).toBeCloseTo(3)
    })
  })

  describe('resize', () => {
    it('creates a new mesh when capacity exceeded', () => {
      const { mesh, add } = createTestMesh(2)
      add({ x: 0, y: 0, z: 0, color: '#ff0000' })
      add({ x: 1, y: 0, z: 0, color: '#00ff00' })
      const oldMesh = mesh.value
      add({ x: 2, y: 0, z: 0, color: '#0000ff' })
      expect(mesh.value).not.toBe(oldMesh)
      expect(mesh.value.count).toBe(3)
    })

    it('preserves all data after resize and flush', () => {
      const { mesh, add, flush } = createTestMesh(2)
      add({ x: 1, y: 0, z: 0, color: '#ff0000' })
      add({ x: 2, y: 0, z: 0, color: '#00ff00' })
      flush()
      add({ x: 3, y: 0, z: 0, color: '#0000ff' })
      flush()
      expect(getPosition(mesh.value, 0).x).toBeCloseTo(1)
      expect(getPosition(mesh.value, 1).x).toBeCloseTo(2)
      expect(getPosition(mesh.value, 2).x).toBeCloseTo(3)
    })
  })
})
