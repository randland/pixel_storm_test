import { reactive } from 'vue'

export default function useOptionParam(value, opts = {}) {
  const defaults = {
    value,
    type: 'option',
    options: [],
    label: '',
    ...opts
  }
  
  const param = reactive({
    ...defaults,
    reset() { Object.assign(this, defaults) }
  })

  return param
}

