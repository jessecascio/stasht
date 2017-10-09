
export default class QuickUnionWeighted {

  public ids: number[] = [];

  private sizes: number[] = [];

  private count: number;

  public constructor(N: number) {
    this.count = N;

    for (let i = 0; i < N; i++) {
      this.ids[i] = i;
      this.sizes[i] = 1;
    }
  }

  public union(p: number, q: number): void {
    const pRoot = this._find(p);
    const qRoot = this._find(q);

    if (pRoot === qRoot) {
      return;
    }

    if (this.sizes[pRoot] < this.sizes[qRoot]) {
      this.ids[pRoot] = qRoot;
      this.sizes[qRoot] += this.sizes[pRoot];
    } else {
      this.ids[qRoot] = pRoot;
      this.sizes[pRoot] += this.sizes[qRoot];
    }

    this.count--;
  }

  public size(): number {
    return this.count;
  }

  public connected(p: number, q: number) {
    return this._find(p) === this._find(q);
  }

  private _find(i: number): number {
    while (i !== this.ids[i]) {
      i = this.ids[i];
    }

    return i;
  }
}
