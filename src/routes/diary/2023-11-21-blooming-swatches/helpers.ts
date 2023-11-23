export function randomHexColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const letters = 'ABCDEFG';
const octaves = [2, 3, 4, 5, 6, 7];
export function randomNote(): string {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];
  return `${letter}${octave}`;
}
