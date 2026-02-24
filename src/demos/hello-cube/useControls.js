import useNumericParam from '@/composables/useNumericParam'
import useColorParam from '@/composables/useColorParam'

const ambientLight = useNumericParam(0.1, { min: 0, max: 1, step: 0.01, label: 'Ambient Light' })
const rotationSpeedX = useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed X' })
const rotationSpeedY = useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Y' })
const rotationSpeedZ = useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Z' })
const cubeColor = useColorParam('#ff6600', { label: 'Cube Color' })

export default function useControls() {
  return {
    ambientLight,
    rotationSpeedX,
    rotationSpeedY,
    rotationSpeedZ,
    cubeColor,
  };
}
