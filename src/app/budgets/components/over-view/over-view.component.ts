import {Component, Input, OnInit} from '@angular/core';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';
import {BudgetUiState} from '../../state/budgets.store';
import {BudgetsService} from '../../state/budgets.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {
  @Input() ui: BudgetUiState;

  constructor(
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery,
    public budgetsService: BudgetsService,
  ) { }

  ngOnInit(): void {
  }

}
