import useCanvas from '@/composables/useCanvas'
import { toCanvasPoint } from '@/lib/screenMath'

export default function useCanvasPoint() {
  const canvas = useCanvas()

  const getPoint = (event) => {
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    if (!rect) return null

    return toCanvasPoint(event.clientX, event.clientY, rect)
  }

  return { getPoint }
}
