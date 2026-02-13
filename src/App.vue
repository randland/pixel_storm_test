<script setup>
import { computed, defineAsyncComponent, markRaw } from 'vue'
import useDemoRegistry from '@/composables/useDemoRegistry'
import useDemoRouter from '@/composables/useDemoRouter'
import DemoSelector from '@/components/DemoSelector.vue'

const { currentDemo } = useDemoRouter()
const { getComponent } = useDemoRegistry()

const demoComponent = computed(() => {
  if (!currentDemo.value) return null

  return markRaw(defineAsyncComponent(getComponent(currentDemo.value)))
})
</script>

<template>
  <div class="app h-screen w-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <DemoSelector />
    <component
      :is="demoComponent"
      v-if="demoComponent"
      :key="currentDemo"
    />
    <div
      v-else
      class="placeholder"
    >
      Please select a demo from the dropdown above.
    </div>
  </div>
</template>
