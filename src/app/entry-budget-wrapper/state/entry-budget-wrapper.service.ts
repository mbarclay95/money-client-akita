import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntryBudgetWrapperStore} from './entry-budget-wrapper.store';
import {map, takeUntil, tap} from 'rxjs/operators';
import {DateFilterStoreService} from '../../services/budgets/date-filter-store.service';
import {createEntryBudgetWrapper, EntryBudgetWrapper} from './entry-budget-wrapper';
import {environment} from '../../../environments/environment';
import {arrayAdd, arrayUpdate, setLoading} from '@datorama/akita';
import {Budget, createBudget} from '../../budgets/state/budget.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EntryBudgetWrapperService {
  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private entryBudgetWrapperStore: EntryBudgetWrapperStore,
    private http: HttpClient,
    private dateFilterStoreService: DateFilterStoreService
  ) {
  }

  subscribeToDateFilter(): void {
    this.dateFilterStoreService.date.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(date => this.getByMonthYear(date.month, date.year));
  }

  stopDateSubscription(): void {
    this.subscriptionDestroyer.next();
  }

  async getByMonthYear(month: number, year: number): Promise<void> {
    await this.http.get<EntryBudgetWrapper>(`${environment.apiUrl}/entry-budgets?month=${month + 1}&year=${year}`).pipe(
      setLoading(this.entryBudgetWrapperStore),
      map(e => createEntryBudgetWrapper(e)),
      tap(e => this.entryBudgetWrapperStore.update(e))
    ).toPromise();
  }

  async updateBudget(budget: Budget, amount: number): Promise<void> {
    amount = amount ?? 0;
    const newBudget = {...budget, ...{amount}};

    if (budget.id === 0) {
      newBudget.month = this.dateFilterStoreService.getDate().month + 1;
      newBudget.year = this.dateFilterStoreService.getDate().year;
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
