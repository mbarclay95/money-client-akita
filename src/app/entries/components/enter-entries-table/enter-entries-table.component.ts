import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {EntriesQuery} from '../../state/entries.query';
import {Entry, isEntryCompleted} from '../../state/entry.model';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {EntriesService} from '../../state/entries.service';
import {CategoriesService} from '../../../categories/state/categories.service';
import {BanksQuery} from '../../../banks/state/banks.query';
import {BanksService} from '../../../banks/state/banks.service';
import {EnterEntriesStoreService} from '../../../services/entries/enter-entries-store.service';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {createSubCategory, SubCategory} from '../../../sub-categories/state/sub-category.model';
import {createCategory} from '../../../categories/state/category.model';
import {Subject} from 'rxjs';
import {createMapping, Mapping} from '../../../mappings/state/mapping.model';

@Component({
  selector: 'app-enter-entries-table',
  templateUrl: './enter-entries-table.component.html',
  styleUrls: ['./enter-entries-table.component.scss']
})
export class EnterEntriesTableComponent implements OnInit {
  @ViewChild('entryTableTag', {static: true}) entryTable: NzTableComponent<Entry>;
  @Output() removedEntry: EventEmitter<number> = new EventEmitter<number>();
  openEntry: number;
  openMappingModal: Subject<Mapping> = new Subject<Mapping>();

  constructor(
    public categoriesService: CategoriesService,
    public subCategoriesQuery: SubCategoriesQuery,
    public bankQuery: BanksQuery,
    public enterEntriesStoreService: EnterEntriesStoreService,
    public categoriesQuery: CategoriesQuery
  ) { }

  ngOnInit(): void {
  }

  removeEntry(entryId: number): void {
    this.removedEntry.emit(entryId);
    this.enterEntriesStoreService.removeEntry(entryId);
  }

  isEntryCompleted(entry: Entry): boolean {
    return isEntryCompleted(entry);
  }

  setCategoryAndSubCategory(subCategory: SubCategory, entry: Entry): void {
    entry.subCategory = subCategory;
    entry.category = subCategory.category;
  }

  setOpenEntry(entryId: number): void {
    if (entryId === this.openEntry) {
      this.openEntry = null;
    } else {
      this.openEntry = entryId;
    }
  }

  createNewMapping(entry: Entry): void {
    const mapping = createMapping({id: 0, category: entry.category, subCategory: entry.subCategory, description: entry.description});
    this.openMappingModal.next(mapping);
  }
}
