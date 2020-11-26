import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../categories/state/category.model';
import {SubCategory} from '../../../../sub-categories/state/sub-category.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() set changedCategory(activeCategory: Category | SubCategory) {
    this.activeCategory = activeCategory;
    // this.showTransactions = false;
  }

  showTransactions = false;
  activeCategory: Category | SubCategory;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
