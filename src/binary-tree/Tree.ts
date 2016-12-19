
import Node from './Node';

/**
 * binary tree
 * @see simple example of using node size to keep a balanced binary tree
 */
export default class Tree<V>
{
  /**
   * tree root
   * @type Node
   */
  private root: Node<V>;

  /**
   * add an item to the tree
   * @param key
   */
  put(value:V): void {
    this.root = this._put(this.root, value);
  }

  private _put(node:Node<V>, value:V): Node<V> {
    if (!node) {
      return new Node<V>(value);
    }
     
    if (!node.left) {
      node.left = new Node<V>(value);
    } else if (!node.right) {
      node.right = new Node<V>(value);
    } else if (node.right.size < node.left.size) {
      node.right = this._put(node.right, value);
    } else {
      node.left = this._put(node.left, value);
    }
      
    node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;

    return node;
  }

  /**
   * determine size of a node
   * @param Node
   * @return number
   */
  private _nodeSize(node: Node<V>): number {
    return node ? node.size : 0;
  }
}
  