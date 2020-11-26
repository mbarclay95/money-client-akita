import { Pipe, PipeTransform } from '@angular/core';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'getLastMonthSums'
})
export class GetLastMonthSumsPipe implements PipeTransform {

  constructor(
    private entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) {
  }

  transform(activeCategory: Category | SubCategory, ...args: unknown[]): Observable<{ sum: number }> {
    const sums = 'savings' in activeCategory ? this.entryBudgetWrapperQuery.getSumsByCategory(activeCategory.id) :
      this.entryBudgetWrapperQuery.getSumsBySubCategory(activeCategory.id);

    return sums.pipe(
      map(s => s.reduce((prev, curr) => {
        return {sum: prev.sum + (curr.summedBudgetAmount - curr.summedEntryAmount)};
      }, {sum: 0}))
    );
  }

}
