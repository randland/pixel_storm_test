export const snapToGrid = (worldX, worldZ, cellSize) => ({
  gridX: Math.floor(worldX / cellSize + 0.5),
  gridZ: Math.floor(worldZ / cellSize + 0.5), 
})

export const gridToWorld = (gridX, gridZ, cellSize) => ({
  x: gridX * cellSize,
  z: gridZ * cellSize,
})
