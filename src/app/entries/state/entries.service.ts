import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntriesStore, EntryUiState} from './entries.store';
import {createEntry, Entry} from './entry.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DateFilterStoreService} from '../../services/budgets/date-filter-store.service';
import {Category} from '../../categories/state/category.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import * as dayjs from 'dayjs';
import {createSummedEntry, SummedEntry} from '../../interfaces/summed-entries';
import {setLoading} from '@datorama/akita';
import {EnterEntriesStoreService} from '../../services/entries/enter-entries-store.service';
import {Observable} from 'rxjs';
import {EntriesQuery} from './entries.query';

@Injectable({providedIn: 'root'})
export class EntriesService {

  constructor(
    private entriesStore: EntriesStore,
    private http: HttpClient,
    private enterEntriesStoreService: EnterEntriesStoreService,
    private entriesQuery: EntriesQuery
  ) {
  }

  clearEntries(): void {
    this.entriesStore.set([]);
    this.entriesStore.setActive(null);
  }

  async getByMonthYear(month: number, year: number): Promise<void> {
    this.entriesStore.setLoading(true);
    await this.http.get<Entry[]>(`${environment.apiUrl}/entries?month=${month + 1}&year=${year}`).pipe(
      map(o => o.map(e => createEntry(e))),
      tap(entities => this.entriesStore.set(entities))
    ).toPromise();
    this.entriesStore.setLoading(false);
  }

  async saveEntries(entries: Entry[]): Promise<void> {
    await this.http.post<Entry[]>(`${environment.apiUrl}/entries`, {entries}).pipe(
      setLoading(this.entriesStore),
      tap(() => this.enterEntriesStoreService.clearEntries())
    ).toPromise();
  }

  async getYearEntrySums(month: number, year: number, active: Category|SubCategory): Promise<SummedEntry[]> {
    const startDate: string = dayjs().date(1).month(month).year(year - 1).format('YYYY-MM-DD');
    const endDate: string = dayjs().date(1).month(month).year(year).format('YYYY-MM-DD');

    let queryString = `startDate=${startDate}&endDate=${endDate}&`;
    queryString += ('savings' in active ? `categoryId=${active.id}` : `subCategoryId=${active.id}`);

    return await this.http.get<SummedEntry[]>(`${environment.apiUrl}/entry-sums?${queryString}`).pipe(
      map(o => o.map(s => createSummedEntry(s)))
    ).toPromise();
  }

  processFile(templateId: number, fileId: number): Observable<Entry[]> {
    let tempId = 0;
    return this.http.get<Entry[]>(`${environment.apiUrl}/upload-template/${templateId}/process-upload/${fileId}`).pipe(
      map(o => o.map(e => {
        tempId++;
        return createEntry({ ...e, ...{id: tempId}});
      }))
    );
  }

  async getDataForNewTemplate(fileId: number): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/upload-template/0/process-upload/${fileId}`).toPromise();
  }

  listenToUi(): void {
    this.entriesQuery.getUi$.pipe(
      map(() => this.entriesQuery.buildQueryString()),
      switchMap(queryString => this.getPagedEntries(queryString))
    ).subscribe();
  }

  resetUi(): void {
    this.entriesStore.resetUi();
  }

  getPagedEntries(queryString: string): Observable<{ total: number, data: Entry[] }> {
    return this.http.get<{ total: number, data: Entry[] }>(`${environment.apiUrl}/entries?${queryString}`).pipe(
      map(result => {
        return {total: result.total, data: result.data.map(e => createEntry(e))};
      }),
      tap(result => {
        this.entriesStore.set(result.data);
        this.entriesStore.update({total: result.total});
      })
    );
  }

  updateUi(ui: Partial<EntryUiState>): void {
    this.entriesStore.updateUi(ui);
  }

  delete(entry: Entry): void {
    this.entriesStore.remove(entry.id);
    this.http.delete(`${environment.apiUrl}/entries/${entry.id}`).toPromise();
  }

  async updateEntry(entry: Entry): Promise<void> {
    await this.http.patch<Entry>(`${environment.apiUrl}/entries/${entry.id}`, entry).pipe(
      setLoading(this.entriesStore),
      map(e => createEntry(e)),
      tap(e => this.entriesStore.update(entry.id, e))
    ).toPromise();
  }
}
