import { ref } from 'vue'
import useObject from './useObject'

const controls = {}

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
