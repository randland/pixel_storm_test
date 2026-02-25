import useNumericParam from '@/composables/useNumericParam'
import useOptionParam from '@/composables/useOptionParam'
import useColorParam from '@/composables/useColorParam'
import useBooleanParam from '@/composables/useBooleanParam'

const controls = {
  shadowBias: useNumericParam(-0.00008, { min: -0.001, max: 0.001, step: 0.00001, label: 'Shadow Bias' }),
  shadowMapSize: useOptionParam(1024, { options: [256, 512, 1024, 2048, 4096, 8192], label: 'Shadow Map Size' }),
  shadowFrustum: useNumericParam(10, { min: 1, max: 100, step: 1, label: 'Shadow Frustum' }),
  roughness: useNumericParam(0.0, { min: 0, max: 1, step: 0.01, label: 'Roughness' }),
  metalness: useNumericParam(0.3, { min: 0, max: 1, step: 0.01, label: 'Metalness' }),
  transmission: useNumericParam(1.0, { min: 0, max: 1, step: 0.01, label: 'Transmission' }),
  emissiveIntensity: useNumericParam(1, { min: 0, max: 10, step: 0.1, label: 'Emissive Intensity' }),
  emissiveColor: useColorParam('#ffffff', { label: 'Emissive Color' }),
  ior: useNumericParam(1.5, { min: 1, max: 2.5, step: 0.01, label: 'Index of Refraction' }),
  thickness: useNumericParam(0.5, { min: 0, max: 5, step: 0.01, label: 'Thickness' }),
  preset: useOptionParam('custom', { options: ['custom', 'city', 'dawn', 'night', 'studio', 'sunset'], label: 'Material Preset' }),
  background: useBooleanParam(false, { label: 'Show Background' }),
}

export default function useControls() {
  return controls
}
