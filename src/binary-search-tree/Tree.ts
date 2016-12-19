
import Node from './Node';

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
   * add an item to the tree
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
   * retrieve value from tree
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
   * Find a minimum key value
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
   * Find a maximum key value
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
   * round down to next key
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
   * round up to next key
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
   * find key with <selection> smaller keys
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
   * return number of keys less than rank
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
   * delete min key
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
   * delete max key
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
   * delete an item
   * @param key
   * @return boolean
   */
  delete(key:K): void {
    this.root = this._delete(this.root, key);
  }

  private _delete(node:Node<K,V>, key:K): Node<K,V> {
    if (!node) {
      return null;
    }

    let equal = true;

    if (node.key > key) {
      equal = false;
      node.left = this._delete(node.left, key);
    } else if (node.key < key) {
      equal = false;
      node.right = this._delete(node.right, key);
    }

    if (!equal) {
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

    let successor = this._min(node.right);
    successor.right = this._deleteMin(successor);
    successor.left = node.left;
    successor.size = this._nodeSize(successor.left) + this._nodeSize(successor.right) + 1;
    return successor;
  }

  /**
   * get size of tree
   * @return number
   */
  size(): number {
    return this.root ? this.root.size : 0;
  }

  /**
   * reset the tree
   */
  reset():void {
    delete this.root;
  }

  /**
   * return an array of node keys
   * @return array
   */
  keys(): Array<K> {
    const data = this._inorderKeyTraversal(this.root, new Array<K>());
    return data;
  }
  
  /**
   * return an array of node keys with a range
   * @return array
   */
  range(start?: K, end?: K): Array<K> {
    const data = this._inorderKeyTraversal(this.root, new Array<K>(), start, end);
    return data;
  }

  private _inorderKeyTraversal(node:Node<K,V>, data: Array<K>, start?:K, end?:K): Array<K> {
    if (!node) {
      return data;
    }

    // get all keys
    if (!start && !end) {
      this._inorderKeyTraversal(node.left, data);
      data.push(node.key);
      this._inorderKeyTraversal(node.right, data);
      return data;
    }
    
    // only traverse necessary branches
    if (!start || (node.key > start )) {
      this._inorderKeyTraversal(node.left, data, start, end);
    }

    // store keys within range
    if (start && end) {
      if (node.key >= start && node.key <= end) {
        data.push(node.key);
      }
    } else if (start && !end) {
      if (node.key >= start) {
        data.push(node.key)
      }
    } else if (!start && end) {
      if (node.key <= end) {
        data.push(node.key)
      }
    }

    // only traverse necessary branches
    if (!end || (node.key < end)) {
      this._inorderKeyTraversal(node.right, data, start, end);
    }

    return data;
  }

  /**
   * object representation of tree, keys ordered ASC
   * @return object
   */
  json():Object {
    return this._traverseJSON(this.root, new Object());
  }
  
  // inorder traversal
  private _traverseJSON(node:Node<K,V>, data: Object): Object {
    if (!node) {
      return data;
    }

    this._traverseJSON(node.left, data);
    data[String(node.key)] = node.value;
    this._traverseJSON(node.right, data);

    return data;
  }

  /**
   * determine size of a node
   * @param Node
   * @return number
   */
  private _nodeSize(node: Node<K,V>): number {
    return node ? node.size : 0;
  }
}
  