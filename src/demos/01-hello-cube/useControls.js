import useNumericParam from '@/composables/useNumericParam'
import useColorParam from '@/composables/useColorParam'

const controls = {
  ambientLight: useNumericParam(0.1, { min: 0, max: 1, step: 0.01, label: 'Ambient Light' }),
  rotationSpeedX: useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed X' }),
  rotationSpeedY: useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Y' }),
  rotationSpeedZ: useNumericParam(0.0, { min: -10, max: 10, step: 0.1, label: 'Rotation Speed Z' }),
  cubeColor: useColorParam('#ff6600', { label: 'Cube Color' }),
}

export default function useControls() {
  return {
    controls
  }
}
