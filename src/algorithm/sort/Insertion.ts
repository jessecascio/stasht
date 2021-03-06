/**
 * Time Complexity: O(N^2 / 4)
 * Space Complexity: O(1)
 */
export default class Insertion<V> {

  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    for (let i = 1; i < data.length; i++) {
      for (let j = i; j > 0 && data[(j - 1)] >= data[j]; j--) {
        const pointer = data[(j - 1)];
        data[(j - 1)] = data[j];
        data[j] = pointer;
      }
    }

    return data;
  }

}
