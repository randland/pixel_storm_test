import { computed } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

export default function useDemoRouter() {
  const searchParams = useUrlSearchParams('history', {writeMode: 'push'})

  const currentDemo = computed({
    get: () => searchParams.demo || null,
    set: (demoName) => (searchParams.demo = demoName)
  })

  return {
    currentDemo,
  }
}
