import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Entry, isEntryCompleted} from '../../state/entry.model';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {CategoriesService} from '../../../categories/state/categories.service';
import {BanksQuery} from '../../../banks/state/banks.query';
import {EnterEntriesStoreService} from '../../../services/entries/enter-entries-store.service';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Subject} from 'rxjs';
import {createMapping, Mapping} from '../../../mappings/state/mapping.model';
import {Bank} from '../../../banks/state/bank.model';
import {filter, takeUntil} from 'rxjs/operators';

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

  removeEntry(entry: Entry): void {
    this.removedEntry.emit(entry.id);
    this.enterEntriesStoreService.removeEntry(entry.id);
    if (entry.isIncomplete) {
      this.enterEntriesStoreService.removeFromServer(entry.id);
    }
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

  compareBanks(a: Bank, b: Bank): boolean {
    if (!!!a || !!!b) {
      return false;
    }

    return a.id === b.id;
  }

  compareSavingsCategory(a: SubCategory, b: SubCategory): boolean {
    if (!!!a || !!!b) {
      return false;
    }

    return a.id === b.id;
  }

  onTab(index: number, property: string): void {
    if (index === 0) {
      return;
    }

    if ((this.enterEntriesStoreService.entries[index][property] ?? null) !== null) {
      return;
    }

    this.enterEntriesStoreService.entries[index][property] = this.enterEntriesStoreService.entries[index - 1][property];
  }
}
