/**
 * Time Complexity: O(N^2 / 2)
 * Space Complexity: O(1)
 */
export default class Selection<V> {

  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    for (let i = 0; i < data.length; i++) {

      let min = i;

      for (let j = i + 1; j < data.length; j++) {
        if (data[j] < data[min]) {
          min = j;
        }
      }

      const pointer = data[i];
      data[i] = data[min];
      data[min] = pointer;
    }

    return data;
  }
}
