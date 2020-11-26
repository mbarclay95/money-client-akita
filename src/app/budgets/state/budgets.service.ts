import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {BudgetsStore} from './budgets.store';
import {Budget, createBudget} from './budget.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DateFilterStoreService} from '../../services/budgets/date-filter-store.service';
import {createEntry} from '../../entries/state/entry.model';

@Injectable({providedIn: 'root'})
export class BudgetsService {

  constructor(
    private budgetsStore: BudgetsStore,
    private http: HttpClient,
    private dateFilterStoreService: DateFilterStoreService
  ) {
  }

  subscribeToDateFilter(): void {
    this.dateFilterStoreService.date.subscribe(date => this.getByMonthYear(date.month, date.year));
  }

  async getByMonthYear(month: number, year: number): Promise<void> {
    this.budgetsStore.setLoading(true);
    await this.http.get<Budget[]>(`${environment.apiUrl}/budget?month=${month + 1}&year=${year}`).pipe(
      map(o => o.map(b => createBudget(b))),
      tap(entities => this.budgetsStore.set(entities))
    ).toPromise();
    this.budgetsStore.setLoading(false);
  }

  add(budget: Budget): void {
    this.budgetsStore.add(budget);
  }

  update(id, budget: Partial<Budget>): void {
    this.budgetsStore.update(id, budget);
  }

  remove(id: number): void {
    this.budgetsStore.remove(id);
  }

  async updateBudget(budget: Budget, amount: number): Promise<void> {
    amount = amount ?? 0;
    const newBudget = {...budget, ...{amount}};

    if (budget.id === 0) {
      newBudget.month = this.dateFilterStoreService.getDate().month + 1;
      newBudget.year = this.dateFilterStoreService.getDate().year;
      await this.http.post<Budget>(`${environment.apiUrl}/budget`, newBudget).pipe(
        tap(b => this.budgetsStore.add(createBudget(b)))
      ).toPromise();
    } else {
      await this.http.patch<Budget>(`${environment.apiUrl}/budget/${budget.id}`, newBudget).pipe(
        tap(b => this.budgetsStore.update(b.id, createBudget(b)))
      ).toPromise();
    }
  }
}
