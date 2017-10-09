
export default class QuickFind {

  public ids: number[] = [];

  private count: number;

  public constructor(N: number) {
    this.count = N;

    for (let i = 0; i < N; i++) {
      this.ids[i] = i;
    }
  }

  public union(p: number, q: number): void {
    const pId = this._find(p);
    const qId = this._find(q);

    if (pId === qId) {
      return;
    }

    for (let i = 0; i < this.ids.length; i++) {
      if (this.ids[i] === pId) {
        this.ids[i] = qId;
      }
    }

    this.count--;
  }

  public connected(p: number, q: number) {
    return this._find(p) === this._find(q);
  }

  private _find(i: number): number {
    return this.ids[i];
  }

  public size(): number {
    return this.count;
  }
}
