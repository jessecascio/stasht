
import Node from "./Node";

export default class List<V> {
  private head: Node<V>;
  private tail: Node<V>;

  // O(1)
  public pushFront(val: V): void {
    const node = new Node<V>(val);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.pointer = this.head;
      this.head = node;
    }
  }

  // O(1)
  public pushBack(val: V): void {
    const node = new Node<V>(val);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.pointer = node;
      this.tail = node;
    }
  }

  // O(1)
  public topFront(): V {
    return this.head ? this.head.val : undefined;
  }

  // O(1)
  public topBack(): V {
    return this.tail ? this.tail.val : undefined;
  }

  // O(1)
  public popFront(): V {
    if (!this.head) {
      return undefined;
    }

    const val = this.head.val;
    this.head = this.head.pointer;

    return val;
  }

  // O(n)
  public popBack(): V {
    if (!this.tail || !this.head) {
      return undefined;
    }

    const val = this.tail.val;

    let node = this.head;
    while (node.pointer && node.pointer !== this.tail) {
      node = node.pointer;
    }

    this.tail = node;
    this.tail.pointer = undefined;

    return val;
  }

  // O(n)
  public erase(val: V): boolean {
    if (this.empty()) {
      return false;
    }

    if (this.head.val === val) {
      if (this.head === this.tail) {
        this.head = undefined;
        this.tail = undefined;
      } else {
        this.head = this.head.pointer;
      }

      return true;
    }

    let node = this.head;
    while (node.pointer) {
      if (node.pointer.val === val) {
        node.pointer = node.pointer.pointer || undefined;
        return true;
      }

      node = node.pointer;
    }

    return false;
  }

  // O(1)
  public empty(): boolean {
    return typeof this.head === "undefined";
  }

  // O(n)
  public find(val: V): boolean {
    let node = this.head;
    while (node) {
      if (node.val === val) {
        return true;
      }

      node = node.pointer;
    }

    return false;
  }

  // O(1)
  public addAfter(node: Node<V>, val: V): void {
    const newNode = new Node<V>(val);
    newNode.pointer = node.pointer;
    node.pointer = newNode;
  }

  // O(n)
  public addBefore() {

  }

  // O(n)
  public * [Symbol.iterator]() {
    let node = this.head;
    while (node) {
      const val = node.val;
      node = node.pointer;
      yield val;
    }
  }

  // O(n)
  public toArray(): V[] {
    const arr = [];
    let node = this.head;

    while (node) {
      arr.push(node.val);
      node = node.pointer;
    }

    return arr;
  }
}
