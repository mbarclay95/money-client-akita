import { Component, OnInit } from '@angular/core';
import {DateFilterStoreService} from '../../../../services/budgets/date-filter-store.service';
import {InDepthStoreService} from '../../../../services/budgets/in-depth-store.service';
import {SubCategory} from '../../../../sub-categories/state/sub-category.model';
import {Category} from '../../../../categories/state/category.model';

@Component({
  selector: 'app-in-depth-view',
  templateUrl: './in-depth-view.component.html',
  styleUrls: ['./in-depth-view.component.scss']
})
export class InDepthViewComponent implements OnInit {

  constructor(
    public dateFilterStoreService: DateFilterStoreService,
    public inDepthStoreService: InDepthStoreService
  ) { }

  ngOnInit(): void {
  }

  isSavingsCategory(activeCategory: SubCategory | Category): boolean {
    if ('savings' in activeCategory) {
      return activeCategory.savings;
    }

    return activeCategory.category.savings;
  }

  isIncomeCategory(activeCategory: SubCategory | Category): boolean {
    if ('savings' in activeCategory) {
      return activeCategory.income;
    }

    return activeCategory.category.income;
  }

  isExpensesCategory(activeCategory: SubCategory | Category): boolean {
    return !(this.isSavingsCategory(activeCategory) || this.isIncomeCategory(activeCategory));
  }

  getVerbiage(activeCategory: SubCategory | Category): string {
    if (this.isExpensesCategory(activeCategory)) {
      return 'Spent';
    }

    if (this.isSavingsCategory(activeCategory)) {
      return 'Saved';
    }

    return 'Income';
  }

}
