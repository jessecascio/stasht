
export default class Node<V> {
  /**
   * node value
   */
  public val: V;

  /**
   * pointers
   */
  public next;

  constructor(val?: V) {
    this.val = val;
    this.next = {};
  }
}
