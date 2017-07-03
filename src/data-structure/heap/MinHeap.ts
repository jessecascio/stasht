
export default class MinHeap<T> {

  public data: T[] = [ null ];
  private qSize: number = 0;

  public enqueue(item: T) {
    this.data[++this.qSize] = item;
    this._swim(this.qSize);
  }

  public dequeue(): T {
    const item = this.data[1];
    this.data[1] = this.data[this.qSize];
    this.data[this.qSize] = null;
    this.qSize--;

    this._sink(1);

    return item;
  }

  private _swim(i: number): void {
    while (i > 1 && this._less(i, Math.round(i / 2))) {
      this._swap(i, Math.round(i / 2));
      i = Math.round(i / 2);
    }
  }

  private _sink(i: number): void {
    while (i * 2 <= this.qSize) {
      let j = i * 2;
      j = j < this.qSize && this._less(j + 1, j) ? j + 1 : j;
      if (!this._less(j, i)) {
        break;
      }
      this._swap(i, j);
      i = j;
    }
  }

  public isEmpty(): boolean {
    return this.qSize === 0;
  }

  public size(): number {
    return this.qSize;
  }

  private _less(i: number, j: number): boolean {
    return this.data[i] < this.data[j];
  }

  private _greater(i: number, j: number): boolean {
    return this.data[i] > this.data[j];
  }

  private _swap(i: number, j: number): void {
    const t: T = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = t;
  }
}
