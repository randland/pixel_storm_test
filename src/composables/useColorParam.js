import { rgbToHex, hexToRgb } from '@/lib/colorUtils'
import { computed, reactive } from 'vue'
import { Color } from 'three'

export default function useColorParam(value = "", opts = {}) {
  const rgb = reactive({ r: 0, g: 0, b: 0 })
  const hex = computed({
    get: () => rgbToHex(rgb),
    set: (newHex) => {
      const tmp = hexToRgb(newHex);
      rgb.r = tmp.r;
      rgb.g = tmp.g;
      rgb.b = tmp.b;
    }
  })
  const color = computed({
    get: () => new Color(rgb.r / 255, rgb.g / 255, rgb.b / 255),
    set: (value) => {
      rgb.r = value.r * 255
      rgb.g = value.g * 255
      rgb.b = value.b * 255
    }
  })
  

  const decodeValue = () => {
    if (typeof value === 'string') {
      hex.value = value
    } else if (typeof value === 'object' && value.r !== undefined && value.g !== undefined && value.b !== undefined) {
      rgb.r = value.r;
      rgb.g = value.g;
      rgb.b = value.b;
    } else {
      throw new Error('Invalid color value. Must be a hex string or an RGB object.');
    }
  }

  decodeValue()

  const defaults = {
    type: 'color',
    label: '',
    ...opts
  }
  
  const param = reactive({
    ...defaults,
    rgb,
    hex,
    color,
    reset() {
      Object.assign(this, { value, ...defaults })
      decodeValue()
    }
  })

  return param
}

