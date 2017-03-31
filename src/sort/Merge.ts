/**
 * Time Complexity: O(NlogN)
 * Space Complexity: O(N)
 */
export default class Merge<V> {

  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    return Merge._sort(data);
  }

  private static _sort(data: any[]): any[] {
    if (!data.length || data.length === 1) {
      return data;
    }

    const mid = Math.floor(data.length / 2);

    const sub1 = Merge._sort(data.slice(0, mid));
    const sub2 = Merge._sort(data.slice(mid));

    return Merge._merge(sub1, sub2);
  }

  private static _merge(sub1, sub2) {
    if (!sub1.length && !sub2.length) {
      return [];
    } else if (!sub1.length) {
      return sub2;
    } else if (!sub2.length) {
      return sub1;
    }

    const merged = [];
    let i = 0;
    let j = 0;

    while (i < sub1.length || j < sub2.length) {
      if (i === sub1.length) {
        merged.push(sub2[j]);
        j++;
      } else if (j === sub2.length) {
        merged.push(sub1[i]);
        i++;
      } else if (sub1[i] < sub2[j]) {
        merged.push(sub1[i]);
        i++;
      } else if (sub2[j] < sub1[i]) {
        merged.push(sub2[j]);
        j++;
      } else {
        merged.push(sub1[i]);
        merged.push(sub2[j]);
        i++;
        j++;
      }
    }

    return merged;
  }

  /*
   * CONSTANT SPACE
   */

  /*
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
  */
}
