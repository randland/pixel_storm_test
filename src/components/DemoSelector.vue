<script setup>
import { useDark, useToggle } from '@vueuse/core'
import useDemoRegistry from '@/composables/useDemoRegistry'
import useDemoRouter from '@/composables/useDemoRouter'
import useFPS from '@/composables/useFPS'

const { demoNames } = useDemoRegistry()
const { currentDemo } = useDemoRouter()
const { fps } = useFPS()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="flex items-center justify-between px-4 h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
    <div class="flex items-center gap-3">
      <label
        for="demo-select"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        Demo
      </label>
      <select
        id="demo-select"
        v-model="currentDemo"
        class="control-input text-sm"
      >
        <option
          :value="null"
          disabled
        >
          -- Select --
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
    <div class="flex items-center gap-4">
      <span class="text-xs font-mono text-gray-400 dark:text-gray-500 tabular-nums">{{ fps }} fps</span>
      <button
        class="w-8 h-8 flex items-center justify-center rounded text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Toggle dark mode"
        @click="toggleDark()"
      >
        {{ isDark ? '☀' : '☽' }}
      </button>
    </div>
  </header>
</template>
