import { browser } from '$app/environment';
import americanEnglishRaw from './american-english.txt?raw';
import scrabbieDictionaryRaw from './dictionary.txt?raw';
import { Trie } from './Trie';

declare global {
  interface Window {
    Trie: typeof Trie;
    trie: Trie;
  }
}

export const americanEnglishDictionary = americanEnglishRaw.toLowerCase().split('\n');
export const scrabbieDictionary = scrabbieDictionaryRaw.toLowerCase().split('\n');

const trie = new Trie();
americanEnglishDictionary.forEach(word => trie.insert(word));

if (browser) {
  window.Trie = Trie;
  window.trie = trie;
}

export function wordExists(word: string): boolean {
  return trie.check(word);
}

export function wordExistsSlow(word: string): boolean {
  return americanEnglishDictionary.includes(word);
}

export function findWords(tokens: string[] = []): string[] {
  const combinations = findCombinations(tokens);
  const words = combinations.filter(wordExists).sort();
  return words;
}

export function findCombinations(tokens: string[] = []): string[] {
  const uniqueTokens = tokens.filter(Boolean);
  let combinations: string[] = [];

  for (let i = 1; i <= 4; i++) {
    combinations = [...combinations, ...generateCombinations(uniqueTokens, i)];
  }

  return combinations.sort();
}

function generateCombinations(tokens: string[], length: number): string[] {
  if (length === 1) {
    return tokens;
  }

  let combinations: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const remainingTokens = tokens.filter(t => t !== token);
    const remainingCombinations = generateCombinations(remainingTokens, length - 1);
    combinations = [...combinations, ...remainingCombinations.map(c => token + c)];
  }

  return combinations;
}

type Action = (n: number) => void;
type Complete = () => void;

export function iterate(from: number, to: number, action: Action, complete: Complete) {
  let i = from;
  let canceled = false;
  const impl = () => {
    action(i);
    i++;
    if (i < to && !canceled) {
      setTimeout(impl, 1);
    } else {
      complete();
    }
  };
  impl();
  return () => {
    canceled = true;
  };
}
