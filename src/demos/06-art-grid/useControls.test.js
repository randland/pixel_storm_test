import { describe, it, expect } from 'vitest'
import { X, Z, COUNT, getX, getZ, getY, getHue } from './useControls'

const firstCol = 0
const centerCol = Math.floor(X / 2)
const lastCol = X - 1

const firstRow = 0
const centerRow = Math.floor(Z / 2) * X
const lastRow = (Z - 1) * X

const nextRow = X
const centerNextRow = (Math.floor(Z / 2) + 1) * X

const gridCenter = Math.floor(Z / 2) * X + Math.floor(X / 2)

describe('getX', () => {
  it('returns the leftmost position for first column', () => {
    expect(getX(firstCol)).toBeCloseTo(-X / 10)
  })

  it('returns 0 for center column', () => {
    expect(getX(centerCol)).toBeCloseTo(0)
  })

  it('returns the rightmost position for last column', () => {
    expect(getX(lastCol)).toBeCloseTo((X - 2) / 10)
  })

  it('steps 0.2 between adjacent columns', () => {
    expect(getX(firstCol + 1) - getX(firstCol)).toBeCloseTo(0.2)
    expect(getX(centerCol + 1) - getX(centerCol)).toBeCloseTo(0.2)
  })
})

describe('getZ', () => {
  it('returns the frontmost position for first row', () => {
    expect(getZ(firstRow)).toBeCloseTo(-Z / 10)
  })

  it('returns 0 for center row', () => {
    expect(getZ(centerRow)).toBeCloseTo(0)
  })

  it('returns the rearmost position for last row', () => {
    expect(getZ(lastRow)).toBeCloseTo((Z - 2) / 10)
  })

  it('steps 0.2 between adjacent rows', () => {
    expect(getZ(nextRow) - getZ(firstRow)).toBeCloseTo(0.2)
    expect(getZ(centerNextRow) - getZ(centerRow)).toBeCloseTo(0.2)
  })

  it('is constant within a row', () => {
    expect(getZ(firstRow)).toBeCloseTo(getZ(lastCol))
  })
})

describe('getY', () => {
  it('returns 1 at grid center (x=0, z=0) at default params', () => {
    // getX(gridCenter) = 0, getZ(gridCenter) = 0
    // with default scales=1, adjusted=0: sin(0) + cos(0) = 0 + 1 = 1
    expect(getY(gridCenter)).toBeCloseTo(1)
  })

  it('varies between -2 and 2 across the grid at default scale', () => {
    let min = Infinity
    let max = -Infinity
    for (let i = 0; i < COUNT; i += Math.floor(COUNT / 100)) {
      const y = getY(i)
      min = Math.min(min, y)
      max = Math.max(max, y)
    }
    expect(min).toBeGreaterThanOrEqual(-2)
    expect(max).toBeLessThanOrEqual(2)
  })
})

describe('getHue', () => {
  it('returns 270 at grid center (y=1 maps to 75% of 360)', () => {
    // y=1, range [-2, 2] → normalized 0.75 → hue 270 (purple)
    expect(getHue(gridCenter)).toBeCloseTo(270)
  })

  it('varies across the grid', () => {
    const step = Math.floor(COUNT / 10)
    const hues = Array.from({ length: 10 }, (_, i) => getHue(i * step))
    const allSame = hues.every(h => Math.abs(h - hues[0]) < 0.01)
    expect(allSame).toBe(false)
  })
})
