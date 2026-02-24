import useNumericParam from '@/composables/useNumericParam'
import useColorParam from '@/composables/useColorParam'
import useBooleanParam from '@/composables/useBooleanParam'

const controls = {
  ambientIntensity: useNumericParam(0.5, { label: 'Ambient Intensity', min: 0, max: 10, step: 0.1 }),
  ambientColor: useColorParam('#ffffff', { label: 'Ambient Color' }),
  directionalIntensity: useNumericParam(0.5, { label: 'Directional Intensity', min: 0, max: 10, step: 0.1 }),
  directionalColor: useColorParam('#ffffff', { label: 'Directional Color' }),
  directionalHelper: useBooleanParam(false, { label: 'Show Directional Helper' }),
  pointIntensity: useNumericParam(15, { label: 'Point Intensity', min: 0, max: 100, step: 0.1 }),
  pointColor: useColorParam('#ffffff', { label: 'Point Color' }),
  pointDistance: useNumericParam(0, { label: 'Point Distance', min: 0, max: 100, step: 0.1 }),
  pointDecay: useNumericParam(2.0, { label: 'Point Decay', min: 0, max: 5, step: 0.01 }),
  pointHelper: useBooleanParam(false, { label: 'Show Point Helper' }),
  spotIntensity: useNumericParam(1, { label: 'Spot Intensity', min: 0, max: 100, step: 0.1 }),
  spotColor: useColorParam('#ffffff', { label: 'Spot Color' }),
  spotDistance: useNumericParam(0, { label: 'Spot Distance', min: 0, max: 100, step: 0.1 }),
  spotDecay: useNumericParam(2.0, { label: 'Spot Decay', min: 0, max: 5, step: 0.01 }),
  spotAngle: useNumericParam(Math.PI / 6, { label: 'Spot Angle', min: 0, max: 2 * Math.PI, step: 0.1 }),
  spotPenumbra: useNumericParam(0, { label: 'Spot Penumbra', min: 0, max: 1, step: 0.01 }),
  spotHelper: useBooleanParam(false, { label: 'Show Spot Helper' }),
}

export default function useControls() {
  return controls
}
