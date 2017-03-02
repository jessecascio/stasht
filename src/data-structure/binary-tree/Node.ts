
/**
 * node for tree
 */
export default class Node<V> {
  public left: Node<V>;
  public right: Node<V>;

  public size: number;
  public value: V;

  constructor(value: V) {
    this.value = value;
    this.size = 1;
  }
}
