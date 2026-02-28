import { tryOnBeforeUnmount } from '@vueuse/core'
import useScenePoint from '@/composables/useScenePoint'
import useCanvas from '@/composables/useCanvas'

export default function use3dCanvasClick(callback) {
  const { getPoint } = useScenePoint()
  const canvas = useCanvas()

  const handler = (event) => callback({ event, position: getPoint(event) })
  const start = () => canvas.addEventListener('click', handler)
  const stop = () => canvas.removeEventListener('click', handler)

  start()
  tryOnBeforeUnmount(stop)

  return { start, stop }
}
