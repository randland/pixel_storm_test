import useNumericParam from '@/composables/useNumericParam'
import useColorParam from '@/composables/useColorParam'

const controls = {
  toneMappingExposure: useNumericParam(1.0, { min: 0, max: 3, step: 0.01, label: 'Tone Map Exposure' }),
  backgroundColor: useColorParam('#000000', { label: 'Background Color' }),
  fogDensity: useNumericParam(0.0, { min: 0, max: 0.15, step: 0.01, label: 'Fog Density' }),
  fogColor: useColorParam('#000000', { label: "Fog Color" }),
  fov: useNumericParam(45, { min: 10, max: 120, step: 1, label: 'Field of View' }),
  near: useNumericParam(0.1, { min: 0.01, max: 10, step: 0.01, label: 'Camera Near' }),
  far: useNumericParam(1000, { min: 10, max: 2000, step: 10, label: 'Camera Far' }),
  dollyZoom: useNumericParam(1.0, { min: 0.2, max: 3.0, step: 0.01, label: 'Dolly Zoom' }),
}

export default function useControls() {
  return controls
}
