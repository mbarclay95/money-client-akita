import {Component, Input, OnInit} from '@angular/core';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import {BudgetUiState} from '../../../budgets/state/budgets.store';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  @Input() ui: BudgetUiState;
  date: any;

  constructor(
    public dateFilterStoreService: DateFilterStoreService
  ) { }

  ngOnInit(): void {
  }

}
