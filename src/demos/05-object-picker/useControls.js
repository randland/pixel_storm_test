import { ref } from 'vue'
import useObject from './useObject'
import useBooleanParam from '@/composables/useBooleanParam'

const controls = {
  manual: useBooleanParam(false, { label: 'Manual Raycast' }),
}

const objects = ref(
  Array.from({ length: 4 }, (_, x) =>
    Array.from({ length: 4 }, (_, z) =>
      useObject(x, z)
    )
  ).flat()
)

export default function useControls() {
  return {
    objects,
    controls,
  }
}
