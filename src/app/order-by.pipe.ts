import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  arr;
  private _array:any[] = [];
  transform(array: Array<any>, args: any): Array<any> {

  if(!array || array === undefined || array.length === 0) return null;
  // console.log(array)
  this.arr = array;
  // console.log(this.abc.data)
    this.arr.data.sort((a: any, b: any) => {
      // console.log(new Date(a.createdAt));
      // console.log(b);
      if (new Date(a.createdAt) < new Date(b.createdAt)) {
        return -1;
      } else if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(array)
      // array = this.arr.data;
      // console.log(this._array)
    return array;
  }

}
