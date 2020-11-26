import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getVerbiageForActive'
})
export class GetVerbiageForActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
