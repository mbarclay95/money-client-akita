import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntryBudgetWrapperStore} from './entry-budget-wrapper.store';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DateFilterStoreService} from '../../services/budgets/date-filter-store.service';
import {createEntryBudgetWrapper, EntryBudgetWrapper} from './entry-budget-wrapper';
import {environment} from '../../../environments/environment';
import {arrayAdd, arrayUpdate, setLoading} from '@datorama/akita';
import {Budget, createBudget} from '../../budgets/state/budget.model';
import {combineLatest, Subject} from 'rxjs';
import {BudgetsQuery} from '../../budgets/state/budgets.query';

@Injectable({providedIn: 'root'})
export class EntryBudgetWrapperService {
  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private entryBudgetWrapperStore: EntryBudgetWrapperStore,
    private http: HttpClient,
    private dateFilterStoreService: DateFilterStoreService,
    private budgetsQuery: BudgetsQuery
  ) {
  }

  subscribeUi(): void {
    combineLatest([
      this.dateFilterStoreService.date,
      this.budgetsQuery.ui$
    ]).pipe(
      map(([date, ui]) => {
        let queryString = `month=${date.month + 1}&year=${date.year}&`;
        if (ui.masterBudgetView) {
          queryString += `masterBudget=1`;
        }

        return queryString;
      }),
      switchMap(queryString => this.getByMonthYear(queryString)),
      takeUntil(this.subscriptionDestroyer)
    ).subscribe();
  }

  stopDateSubscription(): void {
    this.subscriptionDestroyer.next();
  }

  async getByMonthYear(queryString: string): Promise<void> {
    await this.http.get<EntryBudgetWrapper>(`${environment.apiUrl}/entry-budgets?${queryString}`).pipe(
      setLoading(this.entryBudgetWrapperStore),
      map(e => createEntryBudgetWrapper(e)),
      tap(e => this.entryBudgetWrapperStore.update(e))
    ).toPromise();
  }

  async updateBudget(budget: Budget, amount: number): Promise<void> {
    amount = amount ?? 0;
    const newBudget = {...budget, ...{amount}};

    if (budget.id === 0) {
      const masterBudgetView = this.budgetsQuery.getUi().masterBudgetView;
      newBudget.month = masterBudgetView ? null : this.dateFilterStoreService.getDate().month + 1;
      newBudget.year = masterBudgetView ? null : this.dateFilterStoreService.getDate().year;
      await this.http.post<Budget>(`${environment.apiUrl}/budget`, newBudget).pipe(
        tap(b => this.entryBudgetWrapperStore.update(({budgets}) => ({
          budgets: arrayAdd(budgets, createBudget(b))
        })))
      ).toPromise();
    } else {
      await this.http.patch<Budget>(`${environment.apiUrl}/budget/${budget.id}`, newBudget).pipe(
        tap(b => this.entryBudgetWrapperStore.update(({budgets}) => ({
          budgets: arrayUpdate(budgets, b.id, createBudget(b))
        })))
      ).toPromise();
    }
  }
}
