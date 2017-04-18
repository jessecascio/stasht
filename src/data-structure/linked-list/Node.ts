
export default class Node<V> {
  /**
   * node value
   */
  public val: V;

  /**
   * pointer
   */
  public pointer: Node<V>;

  constructor(val: V) {
    this.val = val;
  }
}
