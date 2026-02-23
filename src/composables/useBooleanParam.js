import { reactive } from 'vue'

export default function useBoolParam(value, opts = {}) {
  const defaults = {
    value: false,
    type: 'boolean',
    label: '',
    ...opts
  }
  
  const param = reactive({
    ...defaults,
    reset() { Object.assign(this, defaults) }
  })

  return param
}

