import { ref } from 'vue';

const ambientLightIntensity = ref(0.1);

export default function useControls() {
  return {
    ambientLightIntensity,
  };
}
