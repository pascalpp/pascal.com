import { describe, it, expect } from 'vitest';
import getKeySummary from './getKeySummary';

const metaKey = true;
const shiftKey = true;
const ctrlKey = true;
const altKey = true;

describe('getKeySummary', () => {
  const examples = [
    [{ key: 'k' }, 'K'],
    [{ key: 'k', metaKey }, 'Cmd K'],
    [{ key: 'k', metaKey, altKey }, 'Cmd-Option K'],
    [{ key: 'k', metaKey, shiftKey }, 'Cmd-Shift K'],
    [{ key: 'k', metaKey, shiftKey, altKey }, 'Cmd-Option-Shift K'],
    [{ key: 'k', metaKey, shiftKey, altKey, ctrlKey }, 'Cmd-Option-Shift-Ctrl K'],
    [{ metaKey, shiftKey, altKey, ctrlKey }, undefined],
  ];

  examples.forEach((example) => {
    const [key, expected] = example;
    it(`${JSON.stringify(key)} => ${expected}`, () => {
      expect(getKeySummary(key as KeyboardEvent)).toBe(expected);
    });
  });
});
