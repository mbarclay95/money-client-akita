import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {createSummedEntry, SummedEntry} from '../../interfaces/summed-entries';
import {SpendingUiService} from './spending-ui.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {createSubCategoryTotal, SubCategoryTotal} from '../../interfaces/sub-category-total';
import {DateFilterStoreService} from '../budgets/date-filter-store.service';
import {Entry} from '../../entries/state/entry.model';
import {createSelectedDetails, SelectedDetails} from '../../interfaces/selected-details';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  private subCategoryTotalsSubject: BehaviorSubject<SubCategoryTotal[]> = new BehaviorSubject<SubCategoryTotal[]>([]);
  subCategoryTotals$: Observable<SubCategoryTotal[]> = this.subCategoryTotalsSubject.asObservable();

  expensesAmount$: Observable<number> = this.subCategoryTotals$.pipe(
    map(totals => totals.filter(total => !total.subCategory.category.savings && !total.subCategory.category.income)),
    reduceSubCategoryTotals()
  );

  savingsAmount$: Observable<number> = this.subCategoryTotals$.pipe(
    map(totals => totals.filter(total => total.subCategory.category.savings)),
    reduceSubCategoryTotals()
  );

  incomeAmount$: Observable<number> = this.subCategoryTotals$.pipe(
    map(totals => totals.filter(total => total.subCategory.category.income)),
    reduceSubCategoryTotals()
  );

  wrappedAmounts$: Observable<{ income: number, expenses: number, savings: number, profit: number }> = combineLatest([
    this.incomeAmount$,
    this.expensesAmount$,
    this.savingsAmount$,
  ]).pipe(
    map(([income, expenses, savings]) => {
      return {
        income,
        expenses,
        savings,
        profit: income - (expenses + savings)
      };
    })
  );

  private summedEntriesSubject: BehaviorSubject<SelectedDetails> = new BehaviorSubject<SelectedDetails>(createSelectedDetails({}));
  summedEntries$: Observable<SelectedDetails> = this.summedEntriesSubject.asObservable();

  entries$: Observable<Entry[]> = this.summedEntries$.pipe(
    map(summedEntries => summedEntries.entries)
  );

  selectedTotals$: Observable<{ totalSpent: number, avgSpent: number, entries: Entry[] }> = combineLatest([
    this.spendingUiService.ui$.pipe(
      distinctUntilChanged((a, b) =>
        a.categoryId === b.categoryId && a.subCategoryId === b.subCategoryId && a.allExpenses === b.allExpenses && a.all === b.all
      )
    ),
    this.subCategoryTotals$,
    this.summedEntries$,
  ]).pipe(
    debounceTime(200),
    map(([ui, totals, summedEntries]) => {
      let totalSpent = 0;
      if (!!ui.categoryId) {
        totalSpent = totals.filter(total => total.subCategory.category.id === ui.categoryId)
          .reduce((prev, curr) => prev + curr.total, 0);
      } else if (!!ui.subCategoryId) {
        totalSpent = totals.find(total => total.subCategory.id === ui.subCategoryId).total;
      } else if (ui.allExpenses) {
        totalSpent = totals
          .filter(total => !total.subCategory.category.savings && !total.subCategory.category.income)
          .reduce((prev, curr) => prev + curr.total, 0);
      } else if (ui.all) {
        totalSpent = totals
          .reduce((prev, curr) => prev + (curr.total * (curr.subCategory.category.income ? 1 : -1)), 0);
      }

      return {
        totalSpent,
        avgSpent: summedEntries.sums.reduce((prev, curr) => prev + curr.sum, 0) / summedEntries.sums.length,
        entries: summedEntries.entries
      };
    })
  );

  constructor(
    private spendingUiService: SpendingUiService,
    private dateFilterStoreService: DateFilterStoreService,
    private http: HttpClient,
  ) {
  }

  listenToUi(): void {
    combineLatest([
      this.dateFilterStoreService.date,
      this.spendingUiService.ui$.pipe(
        map(ui => ui.removeFromSavings),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([date, removeFromSavings]) => `month=${date.month + 1}&year=${date.year}&removeFromSavings=${removeFromSavings ? 1 : 0}`),
      switchMap(queryString => this.loadSubCategoryTotals(queryString)),
      tap(totals => this.subCategoryTotalsSubject.next(totals))
    ).subscribe();

    combineLatest([
      this.dateFilterStoreService.date,
      this.spendingUiService.ui$.pipe(
        distinctUntilChanged((a, b) =>
          a.categoryId === b.categoryId && a.subCategoryId === b.subCategoryId && a.allExpenses === b.allExpenses && a.all === b.all
        )
      )
    ]).pipe(
      map(() => this.spendingUiService.buildQueryString()),
      switchMap(queryString => this.loadSummedEntries(queryString)),
      tap(summed => this.summedEntriesSubject.next(summed))
    ).subscribe();
  }

  loadSubCategoryTotals(queryString: string): Observable<SubCategoryTotal[]> {
    return this.http.get<SubCategoryTotal[]>(`${environment.apiUrl}/sub-category-totals?${queryString}`).pipe(
      map(o => o.map(e => createSubCategoryTotal(e)))
    );
  }

  loadSummedEntries(queryString: string): Observable<SelectedDetails> {
    return this.http.get<SelectedDetails>(`${environment.apiUrl}/entry-sums?showEntries=1&${queryString}`).pipe(
      map(details => createSelectedDetails(details)),
    );
  }
}

export function reduceSubCategoryTotals(): <T>(source: Observable<SubCategoryTotal[]>) => Observable<number> {
  return <T>(source: Observable<SubCategoryTotal[]>): Observable<number> => source.pipe(
    map(totals => totals.reduce((prev, curr) => prev + curr.total, 0))
  );
}
