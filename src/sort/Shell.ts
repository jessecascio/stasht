/**
 * Time Complexity: 
 * Space Complexity: O (1)
 */
export default class Shell<V> {

  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    let h = 1;

    while (h < data.length / 3) {
      h = 3 * h + 1;
    }

    while (h >= 1 ) {
      for (let i = h; i < data.length; i++) {
 
        for (let j = i; j >= h && data[(j - h)] >= data[j]; j -= h) {
          const pointer = data[(j - h)];
          data[(j - h)] = data[j];
          data[j] = pointer;
        }
      }

      h = h / 3;
    }

    return data;
  }

}
