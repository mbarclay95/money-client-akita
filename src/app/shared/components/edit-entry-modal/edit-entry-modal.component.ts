import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Mapping} from '../../../mappings/state/mapping.model';
import {EntriesQuery} from '../../../entries/state/entries.query';
import {createEntry, Entry, isEntryCompleted} from '../../../entries/state/entry.model';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {BanksQuery} from '../../../banks/state/banks.query';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {EntriesService} from '../../../entries/state/entries.service';

@Component({
  selector: 'app-edit-entry-modal',
  templateUrl: './edit-entry-modal.component.html',
  styleUrls: ['./edit-entry-modal.component.scss']
})
export class EditEntryModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Entry>;

  entry: Entry;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public entriesQuery: EntriesQuery,
    public entriesService: EntriesService,
    public banksQuery: BanksQuery,
    public subCategoriesQuery: SubCategoriesQuery,
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(entry => {
      this.entry = createEntry({...entry});
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveEntry(): Promise<void> {
    await this.entriesService.updateEntry(this.entry);
    this.isVisible = false;
  }

  setCategoryAndSubCategory(subCategory: SubCategory): void {
    this.entry.subCategory = subCategory;
    this.entry.category = subCategory.category;
  }

  compareSubCategories(s1: SubCategory, s2: SubCategory): boolean {
    if (!s1 || !s2) {
      return false;
    }

    return s1.id === s2.id;
  }

  isEntryCompleted(): boolean {
    if (!this.entry) {
      return true;
    }

    return isEntryCompleted(this.entry);
  }
}
