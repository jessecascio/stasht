
export default class BinarySearch
{
  find(value:any, data:Array<any>): boolean {
    if (!data) {
      return false;
    }
    
    const len = data.length;
    let i = Math.floor(len/2);
    
    if (value === data[i]) {
      return true;
    }

    if (i === 0) {
      return value === data[i];
    }

    if (data[i] > value) {
      return this.find(value, data.slice(0, i))
    } else { 
      return this.find(value, data.slice(i++, len));
    } 
  }
}