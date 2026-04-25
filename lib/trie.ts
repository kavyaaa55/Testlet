// Trie for efficient question lookup by hierarchical tag prefix
// Tags follow pattern: 'os-sync-mutex', 'db-index-btree', etc.

class TrieNode {
  children = new Map<string, TrieNode>()
  questionIds: string[] = []
}

export class QuestionTrie {
  private root = new TrieNode()

  insert(tag: string, questionId: string) {
    let node = this.root
    for (const ch of tag) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode())
      node = node.children.get(ch)!
    }
    node.questionIds.push(questionId)
  }

  // Returns all question IDs whose tag starts with the given prefix
  getByPrefix(prefix: string): string[] {
    let node = this.root
    for (const ch of prefix) {
      if (!node.children.has(ch)) return []
      node = node.children.get(ch)!
    }
    return this.collectAll(node)
  }

  private collectAll(node: TrieNode): string[] {
    const ids = [...node.questionIds]
    for (const child of node.children.values()) {
      ids.push(...this.collectAll(child))
    }
    return ids
  }

  clear() {
    this.root = new TrieNode()
  }
}

// Singleton — populated at server startup from DB
export const questionTrie = new QuestionTrie()
