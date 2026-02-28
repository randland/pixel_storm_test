import useCanvasPoint from '@/composables/useCanvasPoint'
import useCanvas from '@/composables/useCanvas'
import { toNdc } from '@/lib/screenMath'

export default function useScenePoint() {
  const { getPoint: getCanvasPoint } = useCanvasPoint()
  const canvas = useCanvas()

  const getPoint = (event) => {
    const { x, y } = getCanvasPoint(event)
    if (x === undefined || y === undefined) return null

    const rect = canvas.getBoundingClientRect()
    if (!rect) return null

    return toNdc(x, y, rect.width, rect.height)
  }

  return { getPoint }
}
