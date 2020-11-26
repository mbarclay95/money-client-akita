import {Component, Input, OnInit} from '@angular/core';
import {ReducedEntryBudget} from '../../../../interfaces/reduced-entry-budget';

@Component({
  selector: 'app-income-month',
  templateUrl: './income-month.component.html',
  styleUrls: ['./income-month.component.scss']
})
export class IncomeMonthComponent implements OnInit {
  @Input() activeTotals: ReducedEntryBudget;

  constructor() { }

  ngOnInit(): void {
  }

}
