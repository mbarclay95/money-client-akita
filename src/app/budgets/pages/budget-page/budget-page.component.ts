import {Component, OnDestroy, OnInit} from '@angular/core';
import {InDepthStoreService} from '../../../services/budgets/in-depth-store.service';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Budget} from '../../state/budget.model';
import {EntryBudgetWrapperService} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.service';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.scss']
})
export class BudgetPageComponent implements OnInit, OnDestroy {
  activeCategory: Category | SubCategory;
  openMoveMoneyModal: Subject<Budget> = new Subject<Budget>();

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public inDepthStoreService: InDepthStoreService,
    private entryBudgetWrapperService: EntryBudgetWrapperService
  ) { }

  ngOnInit(): void {
    this.entryBudgetWrapperService.subscribeToDateFilter();
    this.subscribeToActiveCategory();
  }

  ngOnDestroy(): void {
    this.entryBudgetWrapperService.stopDateSubscription();
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  subscribeToActiveCategory(): void {
    this.inDepthStoreService.activeCategory$.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(a => this.activeCategory = a);
  }

}
