import {Component, Input, OnInit} from '@angular/core';
import {SpendingUiService, SpendingUiState} from '../../../services/spending/spending-ui.service';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {SpendingService} from '../../../services/spending/spending.service';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {
  @Input() ui: SpendingUiState;

  constructor(
    public spendingUiService: SpendingUiService,
    public spendingService: SpendingService,
    public categoriesQuery: CategoriesQuery
  ) { }

  ngOnInit(): void {
  }

}
