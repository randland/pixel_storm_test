<script setup>
import { useDark, useToggle } from '@vueuse/core'
import useDemoRegistry from '@/composables/useDemoRegistry'
import useDemoRouter from '@/composables/useDemoRouter'

const { demoNames } = useDemoRegistry()
const { currentDemo } = useDemoRouter()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="demo-selector">
    <label for="demo-select">Select Demo:</label>
    <select
      id="demo-select"
      v-model="currentDemo"
    >
      <option
        :value="null"
        disabled
      >
        -- Select a demo --
      </option>
      <option
        v-for="demo in demoNames"
        :key="demo"
        :value="demo"
      >
        {{ demo }}
      </option>
    </select>
  </div>
  <button
    class="toggle-theme"
    @click="toggleDark()"
  >
    {{ isDark ? 'Light' : 'Dark' }}
  </button>
</template>
