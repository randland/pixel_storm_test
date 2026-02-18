export function hexToRgb(hex = "#000000") {
  // Remove the leading '#' if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex string into RGB components
  let bigint = parseInt(hex, 16);
  let r, g, b;
  if (hex.length === 6) {
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (hex.length === 3) {
    r = ((bigint >> 8) & 15) * 17;
    g = ((bigint >> 4) & 15) * 17;
    b = (bigint & 15) * 17;
  } else {
    throw new Error('Invalid hex color format');
  }
  
  return { r, g, b };
}

export function rgbToHex({ r, g, b } = { r: 0, g: 0, b: 0 }) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')
}
