export function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max : number) {
  return Math.floor(randomFloat(min, max));
}

export function screenWidth() {
  return window.innerWidth;
}

export function screenHeight() {
  return window.innerHeight;
}
