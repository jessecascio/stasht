/**
 * Time Complexity: 
 * Space Complexity:
 */
export default class Merge<V> {

  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    Merge._sort(data, 0, data.length);

    return data.filter(val => val);
  }

  private static _sort(data, from, to) {

    if (to <= from) {
      return;
    }

    const mid = Math.floor((from + to) / 2);

    Merge._sort(data, from, mid);
    Merge._sort(data, mid + 1, to);

    Merge._merge(data, from, mid, to);
  }

  private static _merge(data, from, mid, to): void {

    const copy = [];

    let x = from;
    let y = mid + 1;

    for (let z = from; z <= to; z++) {
      copy[z] = data[z];
    }

    for (let z = from; z <= to; z++) {
      if (x > mid ) {
        data[z] = copy[y++];
      } else if (y > to) {
        data[z] = copy[x++];
      } else if (copy[x] > copy[y]) {
        data[z] = copy[y++];
      }  else {
        data[z] = copy[x++];
      }
    }
  }

}
