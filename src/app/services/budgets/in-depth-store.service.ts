import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, iif, Observable} from 'rxjs';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Category} from '../../categories/state/category.model';
import {filter, flatMap, map, mergeMap} from 'rxjs/operators';
import {entriesByCategory, entriesBySubCategory, EntriesQuery, reduceEntries} from '../../entries/state/entries.query';
import {budgetsByCategory, budgetsBySubCategory, BudgetsQuery, reduceBudgets} from '../../budgets/state/budgets.query';
import {DateFilterStoreService} from './date-filter-store.service';
import {EntriesService} from '../../entries/state/entries.service';
import {SummedEntry} from '../../interfaces/summed-entries';
import {ReducedEntryBudget} from '../../interfaces/reduced-entry-budget';
import {
  budgetsAndEntriesByCategory, budgetsAndEntriesBySubCategory,
  EntryBudgetWrapperQuery,
  reduceBudgetsAndEntries
} from '../../entry-budget-wrapper/state/entry-budget-wrapper.query';

@Injectable({
  providedIn: 'root'
})
export class InDepthStoreService {
  private activeCategorySubject: BehaviorSubject<SubCategory | Category> = new BehaviorSubject<SubCategory | Category>(null);
  activeCategory$: Observable<SubCategory | Category> = this.activeCategorySubject.asObservable();

  private summedEntriesSubject: BehaviorSubject<SummedEntry[]> = new BehaviorSubject<SummedEntry[]>(null);
  summedEntries$: Observable<SummedEntry[]> = this.summedEntriesSubject.asObservable();

  activeCategoryTotals$: Observable<ReducedEntryBudget> = this.activeCategory$.pipe(
    flatMap(o => iif(() => ('savings' in o),
      this.entryBudgetWrapperQuery.entriesBudgets$.pipe(
        budgetsAndEntriesByCategory(o.id),
        reduceBudgetsAndEntries()
      ),
      this.entryBudgetWrapperQuery.entriesBudgets$.pipe(
        budgetsAndEntriesBySubCategory(o.id),
        reduceBudgetsAndEntries()
      )
    )
  ));

  activeCategoryEntries$ = this.activeCategory$.pipe(
    flatMap(o => iif(() => ('savings' in o),
      this.entriesQuery.entries$.pipe(
        entriesByCategory(o.id)
      ),
      this.entriesQuery.entries$.pipe(
        entriesBySubCategory(o.id)
      )
    ))
  );

  constructor(
    private entriesQuery: EntriesQuery,
    private budgetsQuery: BudgetsQuery,
    private entryService: EntriesService,
    private dateFilterStoreService: DateFilterStoreService,
    private entryBudgetWrapperQuery: EntryBudgetWrapperQuery
  ) {
    this.subscribeToChangedData();
  }

  subscribeToChangedData(): void {
    combineLatest([
      this.activeCategory$,
      this.dateFilterStoreService.date
    ]).pipe(
      filter(([active]) => !!active)
    ).subscribe( async ([active, date]) => {
      this.summedEntriesSubject.next(await this.entryService.getYearEntrySums(date.month, date.year, active));
    });
  }

  newActiveCategory(activeCategory: SubCategory | Category): void {
    this.activeCategorySubject.next(activeCategory);
  }
}
