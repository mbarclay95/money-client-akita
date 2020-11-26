import { Injectable } from '@angular/core';
import {Entry, isEntryCompleted} from '../../entries/state/entry.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class EnterEntriesStoreService {
  entries: Entry[];

  constructor() { }

  initEntries(): void {
    this.entries = [];
  }

  addEntry(entry: Entry): void {
    this.entries.push(entry);
    console.log(this.entries);
  }

  addSubCategory(entryId: number, subCategory: SubCategory): void {
    this.entries = this.entries.map(e => {
      if (e.id === entryId) {
        e.subCategory = subCategory;
      }

      return e;
    });
  }

  removeEntry(entryId: number): void {
    this.entries = this.entries.filter(e => e.id !== entryId);
  }

  isEntryComplete(entry: Entry): boolean {
    return isEntryCompleted(entry);
  }

  allCompleted(): boolean {
    if (!this.entries || this.entries.length === 0) {
      return false;
    }

    return this.entries.filter(e => !isEntryCompleted(e)).length === 0;
  }

  clearEntries(): void {
    this.entries = [];
  }

  setEntries(entries: Entry[]): void {
    this.entries = entries;
  }
}
