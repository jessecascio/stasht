import Node from "./Node";

export default class Trie<String, V> {

  private root: Node<V>;

  public constructor() {
    this.root = new Node<V>();
  }

  public get(key: string): V {
    return this._get(this.root, key, 0);
  }

  private _get(node: Node<V>, key: string, i: number): V {
    if (!node) {
      return undefined;
    }
    if (key.length === i) {
      return node.val;
    }

    const c = key.charAt(i);
    return this._get(node.next[c], key, i + 1);
  }

  public put(key: string, val: V) {
    this.root = this._put(this.root, key, val, 0);
  }

  private _put(node: Node<V>, key: string, val: V, i: number) {
    if (!node) {
      node = new Node<V>();
    }
    if (key.length === i) {
      node.val = val;
      return node;
    }

    const c = key.charAt(i);
    node.next[c] = this._put(node.next[c], key, val, i + 1);

    return node;
  }

}
