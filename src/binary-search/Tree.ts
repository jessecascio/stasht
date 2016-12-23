
import Node from './Node';
import Queue from './../Queue';

/**
 * binary search tree
 */
export default class Tree<K, V>
{
  /**
   * tree root
   * @type Node
   */
  private root: Node<K,V>;

  /**
   * add an item to the tree - O(n)
   * @param key
   * @param value
   */
  put(key:K, value:V): void {
    this.root = this._put(this.root, key, value);
  }

  private _put(node:Node<K,V>, key:K, value:V): Node<K,V> {
    if (!node) {
      return new Node<K,V>(key, value);
    }
     
    if (node.key > key) {
      node.left = this._put(node.left, key, value);
    } else if (node.key < key) {
      node.right = this._put(node.right, key, value);
    } else {
      node.value = value;
    }

    node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;

    return node;
  }

  /**
   * retrieve value from tree - O(n)
   * @param key
   * @return value
   */
  get(key:K): V {
    const node = this._get(this.root, key);
    return node ? node.value : null;
  }

  private _get(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }

    if (node.key === key) {
      return node;
    } else if (node.key > key) {
      return this._get(node.left, key);
    } else {
      return this._get(node.right, key);
    }
  }

  /**
   * Find a minimum key value - O(n)
   * @return key
   */
  min():K {
    const node = this._min(this.root);
    return node ? node.key : null;
  }

  private _min(node:Node<K,V>):Node<K,V> {
    if (!node) {
      return null;
    } else if(!node.left) {
      return node;
    } else {
      return this._min(node.left);
    }
  }

  /**
   * Find a maximum key value - O(n)
   * @return key
   */
  max():K {
    const node = this._max(this.root);
    return node ? node.key : null;
  }

  private _max(node:Node<K,V>): Node<K,V> {
    if (!node ) {
      return null;
    } else if(!node.right) {
      return node;
    } else {
      return this._max(node.right);
    }
  }

  /**
   * round down to next key - O(n)
   * @param key
   * @return key
   */
  floor(key:K): K {
    const node = this._floor(this.root, key);
    return node ? node.key : null;
  }

  private _floor(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    if (node.key > key) {
      return this._floor(node.left, key);
    }

    const newnode = this._floor(node.right, key);
    if (newnode) {
      return newnode;
    } else {
      return node;
    }
  }

  /**
   * round up to next key - O(n)
   * @param key
   * @return key
   */
  ceil(key:K): K {
    const node = this._ceil(this.root, key);
    return node ? node.key : null;
  }

  private _ceil(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    if (node.key < key) {
      return this._ceil(node.right, key);
    }

    const newnode = this._ceil(node.left, key);
    if (newnode) {
      return newnode;
    } else {
      return node;
    }
  }

  /**
   * find key with <selection> smaller keys - O(n)
   * @param int
   * @return key
   */
  select(selection:number):K {
    const node = this._select(this.root, selection);
    return node ? node.key : null;
  }

  private _select(node:Node<K,V>, selection: number):Node<K,V> {
    if (!node) {
      return null;
    }

    const size = this._nodeSize(node.left);
    
    if (size > selection) {
      return this._select(node.left, selection);
    } else if (size < selection) {
      return this._select(node.right, selection-size-1);
    } else {
      return node;
    }
  }

  /**
   * return number of keys less than rank - O(n)
   * @param key
   * @return int
   */
  rank(rank:K): number {
    return this._rank(this.root, rank);
  }

  private _rank(node: Node<K,V>, rank: K):number {
    if (!node) {
      return 0;
    }

    if (node.key > rank) {
      return this._rank(node.left, rank);
    } else if (node.key < rank) {
      return 1 + this._nodeSize(node.left) + this._rank(node.right, rank);
    } else {
      return this._nodeSize(node.left);
    }
  }

  /**
   * delete min key - O(n)
   */
  deleteMin(): void {
    this.root = this._deleteMin(this.root);
  }

  private _deleteMin(node:Node<K,V>): Node<K,V> {
    if (!node) {
      return null;
    }
    if (!node.left) {
      return node.right;
    }

    node.left = this._deleteMin(node.left);
    node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
    return node;
  }

  /**
   * delete max key - O(n)
   */
  deleteMax(): void {
    this.root = this._deleteMax(this.root);
  }

  private _deleteMax(node:Node<K,V>): Node<K,V> {
    if (!node) {
      return null;
    }
    if (!node.right) {
      return node.left;
    }

    node.right = this._deleteMax(node.right);
    node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
    return node;
  }

  /**
   * delete an item - O(n)
   * @param key
   */
  delete(key:K): void {
    this.root = this._delete(this.root, key);
  }

  private _delete(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      node.left = this._delete(node.left, key);
      node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
      return node;
    } else if (node.key < key) {
      node.right = this._delete(node.right, key);
      node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
      return node;
    }

    // nodes are equal
    if (!node.right) {
      return node.left;
    }
    if (!node.left) {
      return node.right;
    }

    // @todo predecessor alternative
    let successor = this._successor(node, node.key);
    successor.right = this._deleteMin(successor);
    successor.left = node.left;
    successor.size = this._nodeSize(successor.left) + this._nodeSize(successor.right) + 1;
    return successor;
  }

  /**
   * find the next largest node - O(n)
   * @param key
   * @return key
   */
  successor(key:K): K {
    const node = this._successor(this.root, key);
    return node ? node.key : null;
  }

  private _successor(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      return this._successor(node.left, key) || node;
    } else if (node.key < key) {
      return this._successor(node.right, key);
    }

    return this._min(node.right);
  }

  /**
   * find the next smallest node - O(n)
   * @param key
   * @return key
   */
  predecessor(key:K): K {
    const node = this._predecessor(this.root, key);
    return node ? node.key : null;
  }

  private _predecessor(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      return this._predecessor(node.left, key);
    } else if (node.key < key) {
      return this._predecessor(node.right, key) || node;
    }

    return this._max(node.left);
  }

  /**
   * get size of tree - O(1)
   * @return int
   */
  size(): number {
    return this.root ? this.root.size : 0;
  }

  /**
   * reset the tree - O(1)
   */
  reset():void {
    delete this.root;
  }
  
  /**
   * determine the size of a node - O(1)
   * @param Node
   * @return number
   */
  private _nodeSize(node: Node<K,V>): number {
    return node ? node.size : 0;
  }

  /**
   * return an array of node keys within a range - O(n)
   * @param key - start
   * @param key - end
   * @return array
   */
  range(start?: K, end?: K): Array<K> {
    const data = this._range(this.root, new Array<K>(), start, end);
    return data;
  }

  private _range(node:Node<K,V>, data: Array<K>, start?:K, end?:K): Array<K> {
    if (!node) {
      return data;
    }

    // get all keys, in order traversal
    if (!start && !end) {
      this._range(node.left, data);
      data.push(node.key);
      this._range(node.right, data);
      return data;
    }
    
    // add keys within the range, in order
    if (!start || (node.key > start )) {
      this._range(node.left, data, start, end);
    }

    if ((start && end) && (node.key >= start && node.key <= end)) {
      data.push(node.key);
    } else if ((start && !end) && (node.key >= start)) {
      data.push(node.key)
    } else if ((!start && end) && (node.key <= end)) {
      data.push(node.key)
    }

    if (!end || (node.key < end)) {
      this._range(node.right, data, start, end);
    }

    return data;
  }

  /**
   * in order traversal
   * @return array
   */
  public inorder():Array<K> {
    return this._inorder(this.root, new Array<K>());
  }

  private _inorder(node:Node<K,V>, data: Array<K>): Array<K> {
    if (!node) {
      return data;
    }

    this._inorder(node.left, data);
    data.push(node.key);
    this._inorder(node.right, data);

    return data;
  }

  /**
   * pre order traversal
   * @return array
   */
  public preorder():Array<K> {
    return this._preorder(this.root, new Array<K>());
  }

  private _preorder(node:Node<K,V>, data: Array<K>): Array<K> {
    if (!node) {
      return data;
    }

    data.push(node.key);
    this._preorder(node.left, data);
    this._preorder(node.right, data);
    
    return data;
  }
  
  /**
   * post order traversal
   * @return array
   */
  public postorder():Array<K> {
    return this._postorder(this.root, new Array<K>());
  }

  private _postorder(node:Node<K,V>, data: Array<K>): Array<K> {
    if (!node) {
      return data;
    }

    this._postorder(node.left, data);
    this._postorder(node.right, data);
    data.push(node.key);
    
    return data;
  }

  /**
   * breadth first traversal
   * @return array
   */
  public levelorder():Array<K> {
    const q = new Queue<Node<K,V>>();
    q.enqueue(this.root);
    return this._levelorder(q, new Array<K>());
  }

  private _levelorder(q:Queue<Node<K,V>>, keys: Array<K>): Array<K> {
    if (q.isEmpty()) {
      return keys;
    }

    const node = q.dequeue();

    if (node) {
      keys.push(node.key);
      if (node.left) {
        q.enqueue(node.left);
      }
      if (node.right) {
        q.enqueue(node.right);
      }
    }

    return this._levelorder(q, keys);
  }
}
  