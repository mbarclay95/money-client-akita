import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {EntriesStore, EntriesState} from './entries.store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Entry} from './entry.model';
import {Budget} from '../../budgets/state/budget.model';
import {Category} from '../../categories/state/category.model';

@Injectable({providedIn: 'root'})
export class EntriesQuery extends QueryEntity<EntriesState> {
  entries$ = this.selectAll();

  incomeEntries$ = this.selectAll({
    filterBy: ({category}) => category.income
  });

  expenseEntries$ = this.selectAll({
    filterBy: ({category}) => !category.income && !category.savings
  });

  savingsEntries$ = this.selectAll({
    filterBy: ({category}) => category.savings
  });

  getUi$ = this.select('ui');

  constructor(
    protected store: EntriesStore,
  ) {
    super(store);
  }

  buildQueryString(): string {
    const uiState = this.getValue().ui;
    let queryString = '';

    if (uiState.page) {
      queryString += `page=${uiState.page}&`;
    }

    if (uiState.pageSize) {
      queryString += `size=${uiState.pageSize}&`;
    }

    if (uiState.bankId) {
      queryString += `bank=${uiState.bankId}&`;
    }

    if (uiState.search) {
      queryString += `search=${uiState.search}&`;
    }

    if (uiState.subCategoryId) {
      queryString += `subCategoryId=${uiState.subCategoryId}&`;
    }

    return queryString;
  }
}

export function reduceEntries(): <T>(source: Observable<Entry[]>) => Observable<number> {
  return <T>(source: Observable<Entry[]>): Observable<number> => source.pipe(
    map(b => b.reduce((curr, prev) => {
      curr.amount += prev.amount;
      return curr;
    }, {amount: 0}).amount)
  );
}

export function entriesByCategory(categoryId: number): <T>(source: Observable<Entry[]>) => Observable<Entry[]> {
  return <T>(source: Observable<Entry[]>): Observable<Entry[]> => source.pipe(
    map(o => o.filter(e => e.category.id === categoryId))
  );
}

export function entriesBySubCategory(subCategoryId: number): <T>(source: Observable<Entry[]>) => Observable<Entry[]> {
  return <T>(source: Observable<Entry[]>): Observable<Entry[]> => source.pipe(
    map(o => o.filter(e => e.subCategory.id === subCategoryId))
  );
}
