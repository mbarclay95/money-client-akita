import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../categories/state/category.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {SpendingService} from '../../../services/spending/spending.service';
import {EntriesService} from '../../../entries/state/entries.service';
import {Subject} from 'rxjs';
import {Entry} from '../../../entries/state/entry.model';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() set changedCategory(activeCategory: Category | SubCategory) {
    this.activeCategory = activeCategory;
  }

  showTransactions = false;
  activeCategory: Category | SubCategory;
  editEntry: Subject<Entry> = new Subject<Entry>();

  constructor(
    public spendingService: SpendingService,
    public entriesService: EntriesService,
  ) { }

  ngOnInit(): void {
  }

}
