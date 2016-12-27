
export default class Queue<T> {
  private data: T[] = [];
  private qSize: number = 0;
  private index: number = 0;

  // O(1)
  public enqueue(item: T) {
    this.data.push(item);
    this.qSize++;
  }

  // O(1)
  public dequeue(): T {
    if (this.isEmpty()) {
      return null;
    }

    // re-indexes after data.shift(), dont use
    const item = this.data[this.index];
    delete this.data[this.index]; // free memory

    this.index++;
    this.qSize--;

    return item;
  }

  // O(1)
  public isEmpty(): boolean {
    return this.qSize === 0;
  }

  // O(1)
  public size(): number {
    return this.qSize;
  }

  // O(1)
  public peek(): T {
    return !this.isEmpty() ? this.data[this.index] : null;
  }

  // O(1)
  public reset(): void {
    this.data = [];
    this.qSize = this.index = 0;
  }
}
