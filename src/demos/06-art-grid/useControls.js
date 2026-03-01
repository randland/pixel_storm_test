import { mapRange } from '@/lib/mathUtils'
import { PlaneGeometry, MeshBasicMaterial, InstancedMesh, Matrix4, Color } from 'three'
import useNumericParam from '@/composables/useNumericParam'

export const X = 100
export const Z = 100
export const COUNT = X * Z

export const SPACING = 0.2
export const SIZE = 0.2

export const SATURATION = 1
export const LIGHTNESS = 0.5

const controls = {
  speed: useNumericParam(1, { min: 0, max: 10, step: 0.1, label: 'Speed' }),
  xScale: useNumericParam(1, { min: 0.1, max: 5, step: 0.1, label: 'X Scale' }),
  yScale: useNumericParam(1, { min: 0.1, max: 5, step: 0.1, label: 'Y Scale' }),
  zScale: useNumericParam(1, { min: 0.1, max: 5, step: 0.1, label: 'Z Scale' }),
}

export const getX = (index) => ((index % X) - X / 2) * SPACING
export const getZ = (index) => (Math.floor(index / X) - Z / 2) * SPACING
export const getY = (index) => {
  return (
    Math.sin((getX(index) + adjusted) * controls.xScale.value) +
    Math.cos((getZ(index) + adjusted) * controls.zScale.value)
  ) * controls.yScale.value
}

export const getHue = (index) => {
  const minY = -2 * controls.yScale.value
  const maxY = 2 * controls.yScale.value
  return 360 * mapRange(getY(index), minY, maxY, 0, 1)
}

const color = new Color()
export const setColor = (index) => {
  color.setHSL(getHue(index) / 360, SATURATION, LIGHTNESS)
  mesh.setColorAt(index, color)
}

const setPosition = (index) => {
  matrix.setPosition(getX(index), getY(index), getZ(index))
  mesh.setMatrixAt(index, matrix)
}

let elapsed = 0
let adjusted = 0

const updateTime = (delta) => {
  elapsed += delta
  adjusted = elapsed * controls.speed.value
}

const geometry = new PlaneGeometry(SIZE, SIZE)
const material = new MeshBasicMaterial()
const mesh = new InstancedMesh(geometry, material, COUNT)
const matrix = new Matrix4()

geometry.rotateX(-Math.PI / 2)

const updateInstances = (delta = 0) => {
  updateTime(delta)

  for (let i = 0; i < COUNT; i++) {
    setPosition(i)
    setColor(i)
  }

  mesh.instanceMatrix.needsUpdate = true
  mesh.instanceColor.needsUpdate = true
}

export default function useControls() {
  return {
    controls,
    mesh,
    updateInstances,
  }
}
