import useParam from '@/composables/useParam'
import useColorParam from '@/composables/useColorParam'

const ambientLight = useParam(0.1, { min: 0, max: 1, step: 0.01, label: 'Ambient Light' })
const rotationSpeedX = useParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed X' })
const rotationSpeedY = useParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Y' })
const rotationSpeedZ = useParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Z' })
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
