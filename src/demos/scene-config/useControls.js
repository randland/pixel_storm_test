import useNumericParam from '@/composables/useNumericParam'
import useColorParam from '@/composables/useColorParam'

const toneMappingExposure = useNumericParam(1.0, { min: 0, max: 3, step: 0.01, label: 'Tone Map Exposure' })
const backgroundColor = useColorParam('#000000', { label: 'Background Color' })
const fogDensity = useNumericParam(0.0, { min: 0, max: 0.15, step: 0.01, label: 'Fog Density' })
const fogColor = useColorParam('#000000', { label: "Fog Color" })

export default function useControls() {
  return {
    backgroundColor,
    toneMappingExposure,
    fogDensity,
    fogColor,
  };
}
