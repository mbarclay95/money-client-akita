import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {BudgetsService} from '../../state/budgets.service';
import {InDepthStoreService} from '../../../services/budgets/in-depth-store.service';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Subject} from 'rxjs';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {EntryBudgetWrapperService} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.service';
import {Budget} from '../../state/budget.model';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-savings-table',
  templateUrl: './savings-table.component.html',
  styleUrls: ['./savings-table.component.scss']
})
export class SavingsTableComponent implements OnInit {
  @Input() activeCategory: Category | SubCategory;
  @Output() openMoveMoneyModal: EventEmitter<Budget> = new EventEmitter<Budget>();
  showSavings = true;
  openGoalModal: Subject<void> = new Subject<void>();

  constructor(
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery,
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
    public entryBudgetWrapperService: EntryBudgetWrapperService,
    public inDepthStoreService: InDepthStoreService
  ) { }

  ngOnInit(): void {
  }

  makeSavingsCategoryActive(): void {
    this.categoriesQuery.savingsCategories$.pipe(
      take(1),
      tap(categories => this.inDepthStoreService.newActiveCategory(categories[0]))
    ).subscribe();
  }
}
