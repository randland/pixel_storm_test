/**
 * Convert viewport pixel coordinates to canvas-relative coordinates.
 * Subtracts the canvas position so (0, 0) is the canvas top-left.
 */
export function toCanvasPoint(clientX, clientY, rect) {
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

/**
 * Convert canvas-relative coordinates to NDC (Normalized Device Coordinates).
 * NDC range: x [-1, 1] left-to-right, y [-1, 1] bottom-to-top.
 */
export function toNdc(canvasX, canvasY, width, height) {
  return {
    x: (canvasX / width) * 2 - 1,
    y: -(canvasY / height) * 2 + 1,
  }
}
