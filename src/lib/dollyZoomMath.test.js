import { describe, it, expect } from 'vitest'
import { dollyZoomDistance } from './dollyZoomMath'

describe('dollyZoomDistance', () => {
  it('returns the same distance when FOV is unchanged', () => {
    expect(dollyZoomDistance(10, 45, 45)).toBeCloseTo(10)
    expect(dollyZoomDistance(5, 90, 90)).toBeCloseTo(5)
  })

  it('moves camera farther when FOV narrows', () => {
    const dist = dollyZoomDistance(10, 45, 30)
    expect(dist).toBeGreaterThan(10)
  })

  it('moves camera closer when FOV widens', () => {
    const dist = dollyZoomDistance(10, 45, 60)
    expect(dist).toBeLessThan(10)
  })

  it('preserves visible height at the focal point (the invariant)', () => {
    // Visible height at distance d with FOV f: h = 2 * d * tan(f/2)
    const visibleHeight = (dist, fovDeg) => 2 * dist * Math.tan((fovDeg * Math.PI / 180) / 2)

    const baseDist = 10
    const baseFov = 45
    const baseHeight = visibleHeight(baseDist, baseFov)

    for (const newFov of [20, 30, 60, 90, 110]) {
      const newDist = dollyZoomDistance(baseDist, baseFov, newFov)
      expect(visibleHeight(newDist, newFov)).toBeCloseTo(baseHeight)
    }
  })
})
