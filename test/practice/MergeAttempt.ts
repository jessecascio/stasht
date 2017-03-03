/**
 * Time Complexity: 
 * Space Complexity:
 */
export default class Merge<V> {

  // https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/overview-of-merge-sort
  public static sort(data: any[]): any[] {
    if (!data.length) {
      return data;
    }

    let chunks = [];

    while (data.length) {
      chunks.push([data.pop()]);
    }

    data = null;

    if (chunks.length <= 1) {
      return chunks.pop();
    }

    chunks = this._syncDown(chunks);

    while (chunks.length !== 1) {
      chunks = this._syncDown(chunks);
    }

    return chunks.pop();
  }

  // syncs an array down by combing adjoining arrays
  private static _syncDown(array) {
    const combined = [];

    for (let i = 0; i < array.length + 1; i += 2) {
      if (!array[i]) {
        continue;
      }
      if (!array[(i + 1)]) {
        combined.push(array[i]);
        continue;
      }

      combined.push(Merge._merge(array[i], array[(i + 1)]));
    }

    return combined;
  }

  // merge two array, maintaining order
  private static _merge(arr1, arr2): any[] {
    if (!arr1 && !arr2) {
      return [];
    }
    if (!arr1) {
      return arr2;
    }
    if (!arr2) {
      return arr1;
    }

    let x = 0;
    let y = 0;

    const sorted = [];

    while (sorted.length < arr1.length + arr2.length) {
      if (!arr1[x]) {
        sorted.push(arr2[y]);
        y++;
      } else if (!arr2[y]) {
        sorted.push(arr1[x]);
        x++;
      } else if (arr1[x] < arr2[y]) {
        sorted.push(arr1[x]);
        x++;
      } else {
        sorted.push(arr2[y]);
        y++;
      }
    }

    return sorted;
  }

}
