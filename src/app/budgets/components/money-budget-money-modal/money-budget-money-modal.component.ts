import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {createGoal, Goal} from '../../../goals/state/goal.model';
import * as dayjs from 'dayjs';
import {Observable, Subject} from 'rxjs';
import {Budget, createBudget} from '../../state/budget.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {BudgetsQuery} from '../../state/budgets.query';
import {BudgetsService} from '../../state/budgets.service';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import {EntryBudgetWrapperService} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.service';

@Component({
  selector: 'app-money-budget-money-modal',
  templateUrl: './money-budget-money-modal.component.html',
  styleUrls: ['./money-budget-money-modal.component.scss']
})
export class MoneyBudgetMoneyModalComponent implements OnInit, OnDestroy {
  @Input() openModalEvent: Observable<Budget>;
  isVisible = false;
  budget: Budget;
  amount: number;

  moveToBudget: Budget;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public budgetsQuery: BudgetsQuery,
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery,
    public entryBudgetWrapperService: EntryBudgetWrapperService,
    public dateFilterStoreService: DateFilterStoreService,
  ) { }

  ngOnInit(): void {
    this.subscribeToOpenModal();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  private subscribeToOpenModal(): void {
    this.openModalEvent.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(budget => {
      this.budget = createBudget({...budget});
      if (this.budget.id === 0) {
        this.budget.month = this.dateFilterStoreService.getDate().month + 1;
        this.budget.year = this.dateFilterStoreService.getDate().year;
      }
      this.isVisible = true;
    });
  }

  setCategoryAndSubCategory(subCategory: SubCategory): void {
    this.moveToBudget = this.entryBudgetWrapperQuery.getValue().budgets.find(b => b.subCategory.id === subCategory.id);

    if (!this.moveToBudget) {
      this.moveToBudget = createBudget(
        {id: 0, subCategory, category: subCategory.category, month: this.budget.month, year: this.budget.year});
    }
  }

  async saveBudget(): Promise<void> {
    await this.entryBudgetWrapperService.updateBudget(this.budget, this.budget.amount - this.amount);
    await this.entryBudgetWrapperService.updateBudget(this.moveToBudget, this.moveToBudget.amount + this.amount);

    this.isVisible = false;
  }
}
