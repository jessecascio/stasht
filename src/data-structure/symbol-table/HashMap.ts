
// bound by having to sort the keys array
export default class HashMap<V> {
  // @todo use generics here
  public d: object = {};

  public put(k: any, v: V): void {
    this.d[k] = v;
  }

  public get(k: any) {
    return this.d[k];
  }

  public min(): any {
    // pull the keys, sort - same for max, O(N log N)
  }

  public floor(k: any): any {
    // pull the keys, sort, iterate until key is found or larger, return prev, O(N log N)
  }

  public rank(k: any): any { 
    // pull the keys, sort, iterate until key is found, return i, O(N log N)
  }

  public size(l: any, h: any): number {
    // pull the keys, sort, iterate until low key is found, continue to high,
    // return count of range, O(N log N)
    return 1;
  }
}
