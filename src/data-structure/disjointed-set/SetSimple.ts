
export default class SetSimple {

  public ids: number[] = [];

  private count: number;

  public constructor(N: number) {
    this.count = N;

    for (let i = 0; i < N; i++) {
      this.ids[i] = i;
    }
  }

  public union(p: number, q: number): void {
    const pRoot = this._find(p);
    const qRoot = this._find(q);

    if (pRoot === qRoot) {
      return;
    }

    this.ids[pRoot] = qRoot;
    this.count--;
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

  public size(): number {
    return this.count;
  }
}
