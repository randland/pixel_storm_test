import { watch } from 'vue'
import { tryOnBeforeUnmount } from '@vueuse/core'
import { useTres } from '@tresjs/core'

export default function useLightHelper(lightRef, toggleParam, HelperClass) {
  const { scene } = useTres()
  let helperObj = null

  const stopWatch = watch([lightRef, () => toggleParam.value], ([light, showHelper]) => {
    if (!light) return

    if (!helperObj) {
      helperObj = new HelperClass(light)
      scene.value.add(helperObj)
    }

    helperObj.visible = showHelper
  })

  tryOnBeforeUnmount(stopWatch)
}


