import { describe, it, expect } from 'vitest'
import { toCanvasPoint, toNdc } from './screenMath'

describe('toCanvasPoint', () => {
  it('returns (0, 0) when clicking top-left of canvas', () => {
    const rect = { left: 100, top: 50 }
    const point = toCanvasPoint(100, 50, rect)
    expect(point.x).toBe(0)
    expect(point.y).toBe(0)
  })

  it('offsets by canvas position', () => {
    const rect = { left: 100, top: 50 }
    const point = toCanvasPoint(250, 150, rect)
    expect(point.x).toBe(150)
    expect(point.y).toBe(100)
  })

  it('handles canvas at viewport origin', () => {
    const rect = { left: 0, top: 0 }
    const point = toCanvasPoint(400, 300, rect)
    expect(point.x).toBe(400)
    expect(point.y).toBe(300)
  })
})

describe('toNdc', () => {
  it('returns (0, 0) at canvas center', () => {
    const ndc = toNdc(400, 300, 800, 600)
    expect(ndc.x).toBeCloseTo(0)
    expect(ndc.y).toBeCloseTo(0)
  })

  it('returns (-1, 1) at top-left corner', () => {
    const ndc = toNdc(0, 0, 800, 600)
    expect(ndc.x).toBeCloseTo(-1)
    expect(ndc.y).toBeCloseTo(1)
  })

  it('returns (1, -1) at bottom-right corner', () => {
    const ndc = toNdc(800, 600, 800, 600)
    expect(ndc.x).toBeCloseTo(1)
    expect(ndc.y).toBeCloseTo(-1)
  })

  it('flips Y axis (screen down = NDC negative)', () => {
    const top = toNdc(400, 100, 800, 600)
    const bottom = toNdc(400, 500, 800, 600)
    expect(top.y).toBeGreaterThan(bottom.y)
  })

  it('maps quarter points correctly', () => {
    const ndc = toNdc(200, 150, 800, 600)
    expect(ndc.x).toBeCloseTo(-0.5)
    expect(ndc.y).toBeCloseTo(0.5)
  })
})
