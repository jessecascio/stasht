
export default class QuickMock {

  public ids: Object;

  public constructor(N: number) {
    this.ids = {};
  }

  public union(p: number, q: number): void {
    if (!this.ids[p]) {
      this.ids[p] = [];
    }
    if (!this.ids[q]) {
      this.ids[q] = [];
    }

    this.ids[p].push(q);
    this.ids[q].push(p);
  }

  public connected(p: number, q: number): boolean {
    if (!this.ids[p] || !this.ids[q]) {
      return false;
    }
    if (p === q) {
      return true;
    }

    return this._connected(p, q, [p], {});
  }

  private _connected(p, q, s, o): boolean {
    if (!s.length) {
      return false;
    }

    const n = s.pop();

    for (let i = 0; i < this.ids[n].length; i++) {
      if (this.ids[n][i] === q) {
        return true;
      }

      if (!o[this.ids[n][i]]) {
        s.push(this.ids[n][i]);
        o[this.ids[n][i]] = true;
      }
    }

    return this._connected(p, q, s, o);
  }
}
