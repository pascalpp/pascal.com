export function randomHexColor(): string {
  // const initial = Math.floor(Math.random() * 16777215).toString(16);
  const randomR = randomHexPart();
  const randomG = randomHexPart();
  const randomB = randomHexPart();
  const color = `#${randomR}${randomG}${randomB}`;
  return color;
}

function randomHexPart() {
  const hex = Math.floor(Math.random() * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function getYIQ(color: string) {
  // remove hash from hexa string
  const hexColor = color.substring(1);

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq;
}

export function getContastingColor(color: string) {
  const yiq = getYIQ(color);
  return yiq >= 128 ? 'black' : 'white';
}

const letters = 'ABCDEFG';
const octaves = [2, 3, 4, 5, 6, 7];
export function randomNote(): string {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];
  return `${letter}${octave}`;
}
