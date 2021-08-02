import { Injectable } from '@angular/core';
import {createEntry, Entry, isEntryCompleted} from '../../entries/state/entry.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterEntriesStoreService {
  entries: Entry[];
  loading = false;

  focusNewEntry: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient
  ) { }

  async initEntries(): Promise<void> {
    this.loading = true;
    await this.http.get<Entry[]>(`${environment.apiUrl}/entries?incomplete=1`).pipe(
      map(o => o.map(e => createEntry(e))),
      tap(o => this.entries = o)
    ).toPromise();
    this.loading = false;
  }

  addEntry(entry: Entry): void {
    this.entries.push(entry);
  }

  addSubCategory(entryId: number, subCategory: SubCategory): void {
    this.entries = this.entries.map(e => {
      if (e.id === entryId) {
        e.subCategory = subCategory;
      }

      return e;
    });
  }

  focusEntry(entryId: number): void {
    this.focusNewEntry.next(entryId);
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
