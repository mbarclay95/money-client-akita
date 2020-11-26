import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {EntryBudgetWrapperStore} from './entry-budget-wrapper.store';
import {EntryBudgetWrapper} from './entry-budget-wrapper';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReducedEntryBudget} from '../../interfaces/reduced-entry-budget';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Budget, createBudget} from '../../budgets/state/budget.model';
import {SubCategorySums} from '../../interfaces/sub-category-sums';

@Injectable({providedIn: 'root'})
export class EntryBudgetWrapperQuery extends Query<EntryBudgetWrapper> {
  entriesBudgets$ = this.select();
  entries$ = this.select('entries').pipe(
    map(o => o.filter(e => e.fromSavingsSubCategory === null))
  );

  getIncomeTotals$: Observable<ReducedEntryBudget> = this.select().pipe(
    map(w => {
      const entries = w.entries.filter(e => e.category.income && (e.fromSavingsSubCategory === null || w.showFromSavings));
      const budgets = w.budgets.filter(b => b.category.income);
      const subCategorySums = w.subCategorySums.filter(s => s.subCategory.category.income);

      return {entries, budgets, subCategorySums};
    }),
    reduceBudgetsAndEntries()
  );

  getExpensesTotals$: Observable<ReducedEntryBudget> = this.select().pipe(
    map(w => {
      const entries = w.entries.filter(e => !e.category.income && !e.category.savings && (e.fromSavingsSubCategory === null || w.showFromSavings));
      const budgets = w.budgets.filter(b => !b.category.income && !b.category.savings);
      const subCategorySums = w.subCategorySums.filter(s => !s.subCategory.category.income && !s.subCategory.category.savings);

      return {entries, budgets, subCategorySums};
    }),
    reduceBudgetsAndEntries()
  );

  getSavingsTotals$: Observable<ReducedEntryBudget> = this.select().pipe(
    map(w => {
      const entries = w.entries.filter(e => e.category.savings && (e.fromSavingsSubCategory === null || w.showFromSavings));
      const budgets = w.budgets.filter(b => b.category.savings);
      const subCategorySums = w.subCategorySums.filter(s => s.subCategory.category.savings);

      return {entries, budgets, subCategorySums};
    }),
    reduceBudgetsAndEntries()
  );

  getLastMonthSummedBalance$: Observable<{ sum: number }> = this.select(['subCategorySums']).pipe(
    map(w => {
      return w.subCategorySums.reduce((prev, curr) => {
        if (curr.subCategory.category.income) {
          return {sum: prev.sum + curr.summedEntryAmount};
        }

        return {sum: prev.sum - curr.summedEntryAmount};
      }, {sum: 0});
    })
  );

  getLastMonthSummedBudget$: Observable<{ sum: number }> = this.select(['subCategorySums']).pipe(
    map(w => {
      return w.subCategorySums.reduce((prev, curr) => {
        if (curr.subCategory.category.income) {
          return {sum: prev.sum + curr.summedEntryAmount};
        }

        return {sum: prev.sum - curr.summedBudgetAmount};
      }, {sum: 0});
    })
  );

  constructor(protected store: EntryBudgetWrapperStore) {
    super(store);
  }

  getCategoryTotals$(categoryId: number): Observable<ReducedEntryBudget> {
    return this.select().pipe(
      budgetsAndEntriesByCategory(categoryId),
      reduceBudgetsAndEntries()
    );
  }

  getSubCategoryTotals$(subCategory: SubCategory): Observable<{ budget: Budget, entry: number, prevMonthSum: number }> {
    return this.select().pipe(
      budgetAndEntriesForSubCategory(subCategory)
    );
  }

  getSumsByCategory(categoryId: number): Observable<SubCategorySums[]> {
    return this.select(['subCategorySums']).pipe(
      map(w => w.subCategorySums.filter(s => s.subCategory.category.id === categoryId))
    );
  }

  getSumsBySubCategory(subCategoryId: number): Observable<SubCategorySums[]> {
    return this.select(['subCategorySums']).pipe(
      map(w => w.subCategorySums.filter(s => s.subCategory.id === subCategoryId))
    );
  }
}

export function reduceBudgetsAndEntries(): <T>(source: Observable<EntryBudgetWrapper>) => Observable<ReducedEntryBudget> {
  return <T>(source: Observable<EntryBudgetWrapper>): Observable<ReducedEntryBudget> => source.pipe(
    map(w => {
      const budget = w.budgets.reduce((prev, curr) => {
        return {amount: prev.amount + curr.amount};
      }, {amount: 0}).amount;
      const entry = w.entries.reduce((prev, curr) => {
        return {amount: prev.amount + curr.amount};
      }, {amount: 0}).amount;
      const prevMonthSum = w.subCategorySums.reduce((prev, curr) => {
        return {sum: prev.sum + (curr.summedBudgetAmount - curr.summedEntryAmount)};
      }, {sum: 0}).sum;

      return {budget, entry, prevMonthSum};
    })
  );
}

export function budgetsAndEntriesByCategory(categoryId: number): <T>(source: Observable<EntryBudgetWrapper>) => Observable<EntryBudgetWrapper> {
  return <T>(source: Observable<EntryBudgetWrapper>): Observable<EntryBudgetWrapper> => source.pipe(
    map(w => {
      const budgets = w.budgets.filter(b => b.category.id === categoryId);
      const entries = w.entries.filter(e => e.category.id === categoryId && (e.fromSavingsSubCategory === null || w.showFromSavings));
      const subCategorySums = w.subCategorySums.filter(s => s.subCategory.category.id === categoryId);

      return {entries, budgets, subCategorySums, showFromSavings: w.showFromSavings};
    })
  );
}

export function budgetsAndEntriesBySubCategory(subCategoryId: number): <T>(source: Observable<EntryBudgetWrapper>) => Observable<EntryBudgetWrapper> {
  return <T>(source: Observable<EntryBudgetWrapper>): Observable<EntryBudgetWrapper> => source.pipe(
    map(w => {
      const budgets = w.budgets.filter(b => b.subCategory.id === subCategoryId);
      const entries = w.entries.filter(e => e.subCategory.id === subCategoryId && (e.fromSavingsSubCategory === null || w.showFromSavings));
      const subCategorySums = w.subCategorySums.filter(s => s.subCategory.id === subCategoryId);

      return {entries, budgets, subCategorySums, showFromSavings: w.showFromSavings};
    })
  );
}

export function budgetAndEntriesForSubCategory(subCategory: SubCategory): <T>(source: Observable<EntryBudgetWrapper>) => Observable<{ budget: Budget, entry: number, prevMonthSum: number }> {
  return <T>(source: Observable<EntryBudgetWrapper>): Observable<{ budget: Budget, entry: number, prevMonthSum: number }> => source.pipe(
    map(w => {
      let budget = w.budgets.find(b => b.subCategory.id === subCategory.id);
      if (!budget) {
        budget = createBudget({id: 0, amount: 0, subCategory, category: subCategory.category});
      }

      const entry = w.entries.filter(e => e.subCategory.id === subCategory.id && (e.fromSavingsSubCategory === null || w.showFromSavings))
        .reduce((prev, curr) => {
          return {amount: prev.amount + curr.amount};
        }, {amount: 0}).amount;

      const subCategorySum = w.subCategorySums.find(s => s.subCategory.id === subCategory.id);
      let prevMonthSum;
      if (subCategorySum) {
        prevMonthSum = (subCategorySum.summedBudgetAmount - subCategorySum.summedEntryAmount);
      } else {
        prevMonthSum = 0;
      }

      return {budget, entry, prevMonthSum};
    })
  );
}

