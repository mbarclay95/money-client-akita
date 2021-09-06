import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {BudgetsState, BudgetsStore, BudgetUiState} from './budgets.store';
import {Observable} from 'rxjs';
import {Budget, createBudget} from './budget.model';
import {map} from 'rxjs/operators';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Injectable({providedIn: 'root'})
export class BudgetsQuery extends QueryEntity<BudgetsState> {
  isLoading$ = this.selectLoading();
  budgets$ = this.selectAll();

  ui$: Observable<BudgetUiState> = this.select('ui');

  incomeBudgets$ = this.selectAll({
    filterBy: ({category}) => category.income
  });

  expenseBudgets$ = this.selectAll({
    filterBy: ({category}) => !category.income && !category.savings
  });

  savingsBudgets$ = this.selectAll({
    filterBy: ({category}) => category.savings
  });

  constructor(protected store: BudgetsStore) {
    super(store);
  }

  getUi(): BudgetUiState {
    return this.getValue().ui;
  }

}

export function reduceBudgets(): <T>(source: Observable<Budget[]>) => Observable<number> {
  return <T>(source: Observable<Budget[]>): Observable<number> => source.pipe(
    map(b => b.reduce((curr, prev) => {
      curr.amount += prev.amount;
      return curr;
    }, {amount: 0}).amount)
  );
}

export function budgetsByCategory(categoryId: number): <T>(source: Observable<Budget[]>) => Observable<Budget[]> {
  return <T>(source: Observable<Budget[]>): Observable<Budget[]> => source.pipe(
    map(o => o.filter(e => e.category.id === categoryId))
  );
}

export function budgetsBySubCategory(subCategoryId: number): <T>(source: Observable<Budget[]>) => Observable<Budget[]> {
  return <T>(source: Observable<Budget[]>): Observable<Budget[]> => source.pipe(
    map(o => o.filter(e => e.subCategory.id === subCategoryId))
  );
}

export function getBudgetForSubCategory(subCategory: SubCategory): <T>(source: Observable<Budget[]>) => Observable<Budget> {
  return <T>(source: Observable<Budget[]>): Observable<Budget> => source.pipe(
    map(o => {
      const budget = o.find(b => b.subCategory.id === subCategory.id);
      if (!budget) {
        return createBudget({id: 0, amount: 0, subCategory, category: subCategory.category});
      }

      return budget;
    })
  );
}
