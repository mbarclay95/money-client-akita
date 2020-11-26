import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Category, createCategory} from '../../../categories/state/category.model';
import {takeUntil} from 'rxjs/operators';
import {Entry, isEntryCompleted} from '../../../entries/state/entry.model';
import {EntriesQuery} from '../../../entries/state/entries.query';
import {EntriesService} from '../../../entries/state/entries.service';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {BanksQuery} from '../../../banks/state/banks.query';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {SavingsStoreService} from '../../../services/savings/savings-store.service';

@Component({
  selector: 'app-move-money-modal',
  templateUrl: './move-money-modal.component.html',
  styleUrls: ['./move-money-modal.component.scss']
})
export class MoveMoneyModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Entry>;

  entry: Entry;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public entriesQuery: EntriesQuery,
    public entriesService: EntriesService,
    public subCategoriesQuery: SubCategoriesQuery,
    public banksQuery: BanksQuery,
    public savingsStoreService: SavingsStoreService,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(entry => {
      this.entry = entry;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveEntry(): Promise<void> {
    await this.entriesService.saveEntries([this.entry]);
    this.savingsStoreService.refreshTotals$.next();
    this.isVisible = false;
  }

  isEntryCompleted(): boolean {
    if (!this.entry) {
      return true;
    }

    return isEntryCompleted(this.entry);
  }

  setCategoryAndSubCategory(subCategory: SubCategory): void {
    this.entry.subCategory = subCategory;
    this.entry.category = subCategory.category;
  }
}
