import useParam from '@/composables/useParam'
import useColorParam from '@/composables/useColorParam'

const toneMapExposure = useParam(1.0, { min: 0, max: 3, step: 0.01, label: 'Tone Map Exposure' })
const backgroundColor = useColorParam('#000000', { label: 'Background Color' })
const fogDensity = useParam(0.0, { min: 0, max: 0.15, step: 0.01, label: 'Fog Density' })

export default function useControls() {
  return {
    backgroundColor,
    fogDensity,
    toneMapExposure,
  };
}
