import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';
import {Observable} from 'rxjs';
import {EntryBudgetWrapperQuery} from '../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {ReducedEntryBudget} from '../../interfaces/reduced-entry-budget';

@Pipe({
  name: 'getCategoryTotals'
})
export class GetCategoryTotalsPipe implements PipeTransform {

  constructor(
    private entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) {
  }

  transform(category: Category, ...args: unknown[]): Observable<ReducedEntryBudget> {
    return this.entryBudgetWrapperQuery.getCategoryTotals$(category.id);
  }

}
