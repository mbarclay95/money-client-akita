import { Pipe, PipeTransform } from '@angular/core';
import {SubCategoryTotal} from '../../interfaces/sub-category-total';

@Pipe({
  name: 'sumSavingsTotals'
})
export class SumSavingsTotalsPipe implements PipeTransform {

  transform(savingsTotals: SubCategoryTotal[], ...args: unknown[]): number {
    return savingsTotals.reduce((prev, curr) => prev + curr.total, 0);
  }

}
