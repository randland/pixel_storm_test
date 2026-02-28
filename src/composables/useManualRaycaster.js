import { useTres } from '@tresjs/core'
import { Raycaster } from 'three'

export default function useManualRaycaster() {
  const { camera, scene } = useTres()

  const caster = new Raycaster()

  const cast = (position, objects) => {
    objects ||= scene.value.children
    caster.setFromCamera(position, camera.value)

    return caster.intersectObjects(objects, true)
  }

  return { cast }
}
