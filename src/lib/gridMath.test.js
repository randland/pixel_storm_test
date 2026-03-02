import { describe, it, expect } from 'vitest'
import { snapToGrid, gridToWorld } from './gridMath'

describe('snapToGrid', () => {
  it('snaps to nearest integer grid position', () => {
    expect(snapToGrid(2.3, -1.7, 1)).toEqual({ gridX: 2, gridZ: -2 })
  })

  it('snaps exactly at cell center', () => {
    expect(snapToGrid(3.0, 4.0, 1)).toEqual({ gridX: 3, gridZ: 4 })
  })

  it('rounds at cell boundary (0.5 rounds up)', () => {
    expect(snapToGrid(1.5, 2.5, 1)).toEqual({ gridX: 2, gridZ: 3 })
  })

  it('works with non-unit cell size', () => {
    // 1.3 / 0.5 = 2.6 → round to 3
    // 2.8 / 0.5 = 5.6 → round to 6
    expect(snapToGrid(1.3, 2.8, 0.5)).toEqual({ gridX: 3, gridZ: 6 })
  })

  it('snaps negative coordinates', () => {
    expect(snapToGrid(-0.3, -0.7, 1)).toEqual({ gridX: 0, gridZ: -1 })
  })

  it('snaps to origin', () => {
    expect(snapToGrid(0.1, -0.1, 1)).toEqual({ gridX: 0, gridZ: 0 })
  })
})

describe('gridToWorld', () => {
  it('converts grid origin to world origin', () => {
    expect(gridToWorld(0, 0, 1)).toEqual({ x: 0, z: 0 })
  })

  it('converts positive grid coordinates', () => {
    expect(gridToWorld(3, 4, 1)).toEqual({ x: 3, z: 4 })
  })

  it('scales by cell size', () => {
    expect(gridToWorld(3, 6, 0.5)).toEqual({ x: 1.5, z: 3.0 })
  })

  it('converts negative grid coordinates', () => {
    expect(gridToWorld(-2, -3, 1)).toEqual({ x: -2, z: -3 })
  })
})

describe('round trip', () => {
  it('gridToWorld(snapToGrid(x, z)) returns snapped world position', () => {
    const snapped = snapToGrid(2.3, -1.7, 1)
    const world = gridToWorld(snapped.gridX, snapped.gridZ, 1)
    expect(world).toEqual({ x: 2, z: -2 })
  })

  it('round trip is idempotent', () => {
    const cellSize = 0.5
    const first = snapToGrid(1.3, 2.8, cellSize)
    const world = gridToWorld(first.gridX, first.gridZ, cellSize)
    const second = snapToGrid(world.x, world.z, cellSize)
    expect(second).toEqual(first)
  })
})
