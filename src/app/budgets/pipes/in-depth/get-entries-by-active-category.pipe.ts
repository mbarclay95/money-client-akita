import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Observable} from 'rxjs';
import {Entry} from '../../../entries/state/entry.model';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'getEntriesByActiveCategory'
})
export class GetEntriesByActiveCategoryPipe implements PipeTransform {

  constructor(
    private entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) {
  }

  transform(activeCategory: Category | SubCategory, ...args: unknown[]): Observable<Entry[]> {
    const entries$ = this.entryBudgetWrapperQuery.entries$;

    if ('savings' in activeCategory) {
      return entries$.pipe(
        map(o => o.filter(e => e.category.id === activeCategory.id))
      );
    }

    return entries$.pipe(
      map(o => o.filter(e => e.subCategory.id === activeCategory.id))
    );
  }

}
