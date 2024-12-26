import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {
  transform(object: any): any[] {
    return Object.keys(object).map(key => ({ key, value: object[key] }));
  }
}
