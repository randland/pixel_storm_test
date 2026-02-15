import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  presets: [presetWind4()],
  shortcuts: {
    'control-input': 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded px-2 py-1 mt-0.5 block',
    'control-label': 'text-gray-600 dark:text-gray-400 shrink-0',
  }
})
