import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Observable} from 'rxjs';
import {Budget} from '../state/budget.model';
import {EntryBudgetWrapperQuery} from '../../entry-budget-wrapper/state/entry-budget-wrapper.query';

@Pipe({
  name: 'getSubCategoryTotals'
})
export class GetSubCategoryTotalsPipe implements PipeTransform {

  constructor(
    private entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) {
  }

  transform(subCategory: SubCategory, ...args: unknown[]): Observable<{ budget: Budget, entry: number, prevMonthSum: number }> {
    return this.entryBudgetWrapperQuery.getSubCategoryTotals$(subCategory);
  }

}
