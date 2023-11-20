const greetings = [
  'Hi there!',
  'Look what I can do!',
  'I used to have hair!',
  'I can’t really do a handstand.',
  'I looked like this in 1996.',
];

export function randomGreeting() {
  return greetings[Math.floor(Math.random() * greetings.length)];
}
