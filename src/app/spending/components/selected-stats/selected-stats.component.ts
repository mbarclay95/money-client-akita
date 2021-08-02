import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import {SpendingService} from '../../../services/spending/spending.service';

@Component({
  selector: 'app-selected-stats',
  templateUrl: './selected-stats.component.html',
  styleUrls: ['./selected-stats.component.scss']
})
export class SelectedStatsComponent implements OnInit {
  @Input() selectedCategory: Category | SubCategory | null;
  @Input() all = false;
  @Input() allExpenses = false;
  @Input() verbiage: string;

  constructor(
    public dateFilterStoreService: DateFilterStoreService,
    public spendingService: SpendingService,
  ) { }

  ngOnInit(): void {
  }

}
