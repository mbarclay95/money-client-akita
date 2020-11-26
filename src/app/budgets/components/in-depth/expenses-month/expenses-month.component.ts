import {Component, Input, OnInit} from '@angular/core';
import {ReducedEntryBudget} from '../../../../interfaces/reduced-entry-budget';
import {Category} from '../../../../categories/state/category.model';
import {SubCategory} from '../../../../sub-categories/state/sub-category.model';

@Component({
  selector: 'app-expenses-month',
  templateUrl: './expenses-month.component.html',
  styleUrls: ['./expenses-month.component.scss']
})
export class ExpensesMonthComponent implements OnInit {
  @Input() activeTotals: ReducedEntryBudget;
  @Input() activeCategory: Category | SubCategory;

  constructor() { }

  ngOnInit(): void {
  }

}
