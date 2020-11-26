import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolute'
})
export class AbsolutePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.abs(value);
  }

}
