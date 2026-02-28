import { computed, ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'

export default function useObject(x, z) {
  const position = ref([2 * (x - 1.5), 0, 2 * (z - 1.5)])
  const rotateX = Math.PI / 2
  const size = 1
  const selected = ref(false)
  const hovered = ref(false)
  const hue = computed(() => 18 * ( x * 4 + z))
  const saturation = computed(() => selected.value ? 80 : 10)
  const color = computed(() => `hsl(${hue.value}, ${saturation.value}%, 50%)`)
  const emissiveIntensity = computed(() => {
    return hovered.value
      ? 0.2
      : 0
  })

  const toggleSelect = useThrottleFn(() => selected.value = !selected.value, 10)

  return {
    color,
    emissiveIntensity,
    hovered,
    position,
    rotateX,
    selected,
    size,
    toggleSelect,
 }
}
