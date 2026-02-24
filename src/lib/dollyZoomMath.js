/**
 * Compute the camera distance needed to keep the apparent size
 * of objects at the focal point constant when FOV changes.
 *
 * Formula: d_new = d_base * tan(baseFov/2) / tan(newFov/2)
 *
 * @param {number} baseDistance - original camera-to-target distance
 * @param {number} baseFovDeg - original FOV in degrees
 * @param {number} newFovDeg - new FOV in degrees
 * @returns {number} new camera-to-target distance
 */
export function dollyZoomDistance(baseDistance, baseFovDeg, newFovDeg) {
  const toRad = Math.PI / 180
  return baseDistance * Math.tan((baseFovDeg * toRad) / 2) / Math.tan((newFovDeg * toRad) / 2)
 }
