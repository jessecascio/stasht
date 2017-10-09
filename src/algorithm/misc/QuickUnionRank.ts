
export default class QuickUnionRank {

  public ids: any[] = [];

  private sizes: number[] = [];

  private count: number;

  public constructor(N: number) {
    this.count = N;

    for (let i = 0; i < N; i++) {
      this.ids[i] = {rank: 1, val: i};
    }
  }

  public union(p: number, q: number): void {
    const pRoot = this._find(p);
    const qRoot = this._find(q);

    if (pRoot === qRoot) {
      return;
    }

    if (this.ids[pRoot].rank < this.ids[qRoot].rank) {
      this.ids[pRoot].val = qRoot;
      this.ids[qRoot].rank += this.ids[pRoot].rank;
    } else {
      this.ids[qRoot].val = pRoot;
      this.ids[pRoot].rank += this.ids[qRoot].rank;
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
    while (i !== this.ids[i].val) {
      i = this.ids[i].val;
      this.ids[i].val = this._find(this.ids[i].val);
    }

    return this.ids[i].val;
  }
}
