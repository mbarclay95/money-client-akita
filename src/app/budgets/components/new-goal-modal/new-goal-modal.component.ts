import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {createGoal, Goal} from '../../../goals/state/goal.model';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import * as dayjs from 'dayjs';
import {GoalsService} from '../../../goals/state/goals.service';

@Component({
  selector: 'app-new-goal-modal',
  templateUrl: './new-goal-modal.component.html',
  styleUrls: ['./new-goal-modal.component.scss']
})
export class NewGoalModalComponent implements OnInit, OnDestroy {
  @Input() openModalEvent: Observable<void>;
  isVisible = false;
  newGoal: Goal;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public subCategoriesQuery: SubCategoriesQuery,
    public dateFilterStoreService: DateFilterStoreService,
    public goalsService: GoalsService
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
    ).subscribe(() => {
      this.newGoal = createGoal({year: dayjs().year()});
      this.isVisible = true;
    });
  }

  async handleSave(): Promise<void> {
    this.saving = true;
    await this.goalsService.add(this.newGoal);
    this.saving = false;
    this.isVisible = false;
  }
}
