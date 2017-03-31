/**
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
export default class Quick<V> {
  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    Quick._sort(data, 0, data.length);
    return data.slice(0, data.length - 1);
  }

  private static _sort(data: any[], l: number, r: number): void {
    if (l > r) {
      return;
    }

    const m = Quick._partition(data, l, r);

    Quick._sort(data, l, m - 1);
    Quick._sort(data, m + 1, r);
  }

  private static _partition(data: any[], l: number, r: number): number {
    const pivot = data[l];
    let j = l;

    for (let i = l + 1; i <= r; i++) {
      if (data[i] <= pivot) {
        j++;
        Quick._swap(data, j, i);
      }
    }

    Quick._swap(data, l, j);

    return j;
  }

  private static _swap(data: any[], j: number, i: number) {
    const pointer = data[i];
    data[i] = data[j];
    data[j] = pointer;
  }
}
