import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {BudgetsService} from '../../state/budgets.service';
import {InDepthStoreService} from '../../../services/budgets/in-depth-store.service';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {EntryBudgetWrapperService} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.service';
import {Budget} from '../../state/budget.model';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {
  @Input() activeCategory: Category | SubCategory;
  @Output() openMoveMoneyModal: EventEmitter<Budget> = new EventEmitter<Budget>();
  showExpenses = true;

  constructor(
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery,
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
    public entryBudgetWrapperService: EntryBudgetWrapperService,
    public inDepthStoreService: InDepthStoreService
  ) { }

  ngOnInit(): void {
  }

}
