class TrieNode {
  end = false;
  children: Record<string, TrieNode> = {};
}

export class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        node.children[word[i]] = new TrieNode();
        node = node.children[word[i]];
      }
    }
    node.end = true;
  }

  check(word: string) {
    if (this.root == null) return false;
    let node = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (!node.children[word[i]]) return false;
      node = node.children[word[i]];
    }
    return node.end === true;
  }
}
