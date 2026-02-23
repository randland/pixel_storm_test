export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function randomIntBetween(min, max) {
  return Math.floor(randomBetween(min, max));
}

export function randomChoice(array) {
  return array[randomIntBetween(0, array.length)];
}
