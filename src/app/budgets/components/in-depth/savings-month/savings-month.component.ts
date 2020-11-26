import {Component, Input, OnInit} from '@angular/core';
import {ReducedEntryBudget} from '../../../../interfaces/reduced-entry-budget';
import {Category} from '../../../../categories/state/category.model';
import {SubCategory} from '../../../../sub-categories/state/sub-category.model';

@Component({
  selector: 'app-savings-month',
  templateUrl: './savings-month.component.html',
  styleUrls: ['./savings-month.component.scss']
})
export class SavingsMonthComponent implements OnInit {
  @Input() activeTotals: ReducedEntryBudget;
  @Input() activeCategory: Category | SubCategory;

  constructor() { }

  ngOnInit(): void {
  }

}
