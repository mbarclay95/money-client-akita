import { Pipe, PipeTransform } from '@angular/core';
import {SummedEntry} from '../../interfaces/summed-entries';

@Pipe({
  name: 'sumOfSummedEntries'
})
export class SumOfSummedEntriesPipe implements PipeTransform {

  transform(summedEntries: SummedEntry[], ...args: unknown[]): number {
    return summedEntries.reduce((prev, curr) => {
      curr.sum += prev.sum;
      return curr;
    }, {sum: 0}).sum;
  }

}
