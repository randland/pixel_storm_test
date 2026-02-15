import useParam from '@/composables/useParam'

const ambientLight = useParam(0.1, { min: 0, max: 1, step: 0.01, label: 'Ambient Light' })
const rotationSpeed = useParam(1, { min: 0, max: 10, step: 0.1, label: 'Rotation Speed' })

export default function useControls() {
  return {
    ambientLight,
    rotationSpeed 
  };
}
