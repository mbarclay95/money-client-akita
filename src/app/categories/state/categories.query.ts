import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {CategoriesState, CategoriesStore} from './categories.store';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
@QueryConfig({
  sortBy: 'sort',
  sortByOrder: Order.ASC
})
export class CategoriesQuery extends QueryEntity<CategoriesState> {
  isLoading$ = this.selectLoading();
  categories$ = this.selectAll();
  activeCategory$ = this.selectActive();

  activeCategories$ = this.selectAll({
    filterBy: ({isActive}) => isActive
  });

  activeNoIncomeCategories$ = this.selectAll({
    filterBy: ({income, isActive}) => isActive && !income
  });

  incomeCategories$ = this.selectAll({
    filterBy: ({income, isActive}) => isActive && income
  });

  expenseCategories$ = this.selectAll({
    filterBy: ({income, savings, isActive}) => isActive && !(income || savings)
  });

  expenseCategories = this.getAll({
    filterBy: ({income, savings, isActive}) => isActive && !(income || savings)
  });

  savingsCategories$ = this.selectAll({
    filterBy: ({savings, isActive}) => isActive && savings
  });

  constructor(protected store: CategoriesStore) {
    super(store);
  }

  getIncomeCategoryId(): number {
    return this.getAll().find(category => category.isActive && category.income)?.id;
  }

  getSavingsCategoryId(): number {
    return this.getAll().find(category => category.isActive && category.savings)?.id;
  }

}
