import { useTres } from '@tresjs/core'

export default function useCanvas() {
  const { renderer } = useTres()
  return renderer.domElement
}
