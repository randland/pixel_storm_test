import { computed, watch } from 'vue'
import { tryOnBeforeUnmount } from '@vueuse/core'
import { dollyZoomDistance } from '@/lib/dollyZoomMath'

export default function useDollyZoom(camera, orbitControl, fov, dollyZoom) {
  let baseDistance = null

  const getTarget = () => orbitControl?.value?.instance?.target

  const getBaseDistance = () => {
    if (!camera.value) return 10

    const target = getTarget()
    if (!target) return 10

    return camera.value.position.distanceTo(target)
  }

  const moveCamera = (target, direction, distance) => {
    camera.value.position.copy(target).add(direction.multiplyScalar(distance))
  }

  const stopDolly = watch(() => dollyZoom.value, (newVal) => {
    if (!camera.value) return

    const target = getTarget()
    if (!target) return

    baseDistance ||= getBaseDistance()
    const direction = camera.value.position.clone().sub(target).normalize()

    if (newVal !== 1.0) {
      const newDistance = dollyZoomDistance(baseDistance, fov.value, effectiveFov.value)

      moveCamera(target, direction, newDistance)
    } else {
      moveCamera(target, direction, baseDistance)
      baseDistance = null
    }
  })
  tryOnBeforeUnmount(stopDolly)

  const stopFov = watch(() => fov.value, () => {
    dollyZoom.value = 1.0
  })
  tryOnBeforeUnmount(stopFov)

  const effectiveFov = computed(() => fov.value * dollyZoom.value)

  return {
    effectiveFov,
  }
}
