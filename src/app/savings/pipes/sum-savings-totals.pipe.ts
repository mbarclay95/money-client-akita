import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {SavingsTotal} from '../../interfaces/savings-total';

@Pipe({
  name: 'sumSavingsTotals'
})
export class SumSavingsTotalsPipe implements PipeTransform {

  transform(savingsTotals: SavingsTotal[], ...args: unknown[]): number {
    return savingsTotals.reduce((prev, curr) => prev + curr.total, 0);
  }

}
