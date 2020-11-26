import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {BudgetsQuery} from '../state/budgets.query';
import {Budget, createBudget} from '../state/budget.model';
import {DateFilterStoreService} from '../../services/budgets/date-filter-store.service';

@Pipe({
  name: 'getEditableBudget'
})
export class GetEditableBudgetPipe implements PipeTransform {

  constructor(
    private budgetsQuery: BudgetsQuery,
    private dateFilterStoreService: DateFilterStoreService
  ) {
  }

  transform(budgetId: number, subCategory: SubCategory, ...args: any[]): Budget {
    const editableBudgets = this.budgetsQuery.getAll();

    if (!editableBudgets) {
      return;
    }

    if (budgetId === 0) {
      return createBudget({
        ...this.dateFilterStoreService.getDate(),
        ...{id: 0, amount: 0, subCategory, category: subCategory.category}
      });
    }

    return editableBudgets.find(b => b.id === budgetId);
  }

}
