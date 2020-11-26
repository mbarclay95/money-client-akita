import { Component, OnInit } from '@angular/core';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {SubCategoriesService} from '../../../sub-categories/state/sub-categories.service';
import {SavingsStoreService} from '../../../services/savings/savings-store.service';
import {Subject} from 'rxjs';
import {createEntry, Entry} from '../../../entries/state/entry.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  openMoveMoneyModal: Subject<Entry> = new Subject<Entry>();

  constructor(
    public subCategoriesQuery: SubCategoriesQuery,
    public subCategoriesService: SubCategoriesService,
    public savingsStoreService: SavingsStoreService
  ) { }

  ngOnInit(): void {
  }

  createEntryToOpenModal(subCategory: SubCategory): void {
    const newEntry = createEntry({dateSpent: new Date(), fromSavingsSubCategory: subCategory});
    this.openMoveMoneyModal.next(newEntry);
  }
}
