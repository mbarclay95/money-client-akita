import {Component, Input, OnInit} from '@angular/core';
import {SpendingUiService, SpendingUiState} from '../../../services/spending/spending-ui.service';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() ui: SpendingUiState;

  constructor(
    public categoriesQuery: CategoriesQuery,
    public spendingUiService: SpendingUiService,
  ) { }

  ngOnInit(): void {
  }

}
