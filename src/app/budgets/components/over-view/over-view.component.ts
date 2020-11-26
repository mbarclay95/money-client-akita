import { Component, OnInit } from '@angular/core';
import {EntryBudgetWrapperQuery} from '../../../entry-budget-wrapper/state/entry-budget-wrapper.query';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {
  showExpectedIncome = false;

  constructor(
    public entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) { }

  ngOnInit(): void {
  }

}
