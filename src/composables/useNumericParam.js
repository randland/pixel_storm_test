import { reactive } from 'vue'

export default function useNumericParam(value = 0, opts = {}) {
  const defaults = {
    value,
    type: 'number',
    min: 0.0,
    max: 1.0,
    step: 0.01,
    label: '',
    ...opts
  }
  
  const param = reactive({
    ...defaults,
    reset() { Object.assign(this, defaults) }
  })

  return param
}

