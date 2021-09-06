import {Component, Input, OnInit} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {InDepthStoreService} from '../../../services/budgets/in-depth-store.service';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {EntryBudgetWrapperService} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.service';
import {take, tap} from 'rxjs/operators';
import {BudgetUiState} from '../../state/budgets.store';

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.scss']
})
export class IncomeTableComponent implements OnInit {
  @Input() activeCategory: Category | SubCategory;
  @Input() ui: BudgetUiState;
  showIncome = true;

  constructor(
    public entryBudgetWrapperService: EntryBudgetWrapperService,
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery,
    public inDepthStoreService: InDepthStoreService
  ) { }

  ngOnInit(): void {
  }

  makeIncomeCategoryActive(): void {
    this.categoriesQuery.incomeCategories$.pipe(
      take(1),
      tap(categories => this.inDepthStoreService.newActiveCategory(categories[0]))
    ).subscribe();
  }
}
