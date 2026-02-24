import { ref } from 'vue';

const fps = ref(0)
const threshold = 0.5
let frameCount = 0
let accumulatedTime = 0

const update = (delta) =>{
  frameCount++;
  accumulatedTime += delta;

  if (accumulatedTime >= threshold) {
    fps.value = Math.round(frameCount / accumulatedTime);
    frameCount = 0;
    accumulatedTime = 0;
  }
}

export default function useFPS() {
  return {
    fps,
    update,
  }
}
