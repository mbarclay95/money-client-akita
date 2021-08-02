import {Component, OnInit} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {EntriesService} from '../../state/entries.service';
import {createEntry} from '../../state/entry.model';
import {Category} from '../../../categories/state/category.model';
import {EnterEntriesStoreService} from '../../../services/entries/enter-entries-store.service';
import {EntriesQuery} from '../../state/entries.query';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-enter-entries-page',
  templateUrl: './enter-entries-page.component.html',
  styleUrls: ['./enter-entries-page.component.scss']
})
export class EnterEntriesPageComponent implements OnInit {
  tempId = 1;
  selectedCategory: Category;
  openImportModal: Subject<void> = new Subject<void>();
  openEntriesModal: Subject<void> = new Subject<void>();

  constructor(
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
    public subCategoriesQuery: SubCategoriesQuery,
    public entriesService: EntriesService,
    public enterEntriesStoreService: EnterEntriesStoreService,
    public entriesQuery: EntriesQuery
  ) { }

  ngOnInit(): void {
    this.enterEntriesStoreService.initEntries();
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    const entry = createEntry({id: this.tempId, category});
    this.enterEntriesStoreService.addEntry(entry);
  }

  selectSubCategory(subCategory: SubCategory): void {
    this.enterEntriesStoreService.addSubCategory(this.tempId, subCategory);
    this.enterEntriesStoreService.focusEntry(this.tempId);
    this.tempId++;
    this.selectedCategory = null;
  }

  removedEntry(entryId: number): void {
    if (entryId === this.tempId) {
      this.selectedCategory = null;
    }
  }
}
