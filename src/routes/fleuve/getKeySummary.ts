export default function getKeySummary(event: KeyboardEvent): string | undefined {
  const key = getKeyName(event.key);
  if (!key) return;
  if (isModifier(key)) return;

  const modifiers = [
    event.metaKey ? 'Cmd' : '',
    event.altKey ? 'Option' : '',
    event.shiftKey ? 'Shift' : '',
    event.ctrlKey ? 'Ctrl' : '',
  ]
    .filter(Boolean)
    .join('-');

  return [modifiers, key].filter(Boolean).join(' ');
}

function getKeyName(key: string): string | undefined {
  if (!key) return;
  if (key === ' ') return 'Space';
  if (key.length === 1) return key.toUpperCase();
  return key;
}

function isModifier(key: string): boolean {
  return ['Meta', 'Alt', 'Shift', 'Control'].includes(key);
}
