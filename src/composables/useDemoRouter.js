import { computed } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

const searchParams = useUrlSearchParams('history', {writeMode: 'push'})

const currentDemo = computed({
  get: () => searchParams.demo || null,
  set: (demoName) => (searchParams.demo = demoName)
})

export default function useDemoRouter() {
  return {
    currentDemo,
  }
}
