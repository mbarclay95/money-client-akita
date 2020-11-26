import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {BanksStore} from './banks.store';
import {Bank, createBank} from './bank.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Category, createCategory} from '../../categories/state/category.model';

@Injectable({providedIn: 'root'})
export class BanksService {

  constructor(
    private banksStore: BanksStore,
    private http: HttpClient
  ) {
  }

  async get(): Promise<void> {
    this.banksStore.setLoading(true);
    await this.http.get<Bank[]>(`${environment.apiUrl}/banks`).pipe(
      tap(entities => this.banksStore.set(entities))
    ).toPromise();
    this.banksStore.setLoading(false);
  }

  async add(bank: Bank): Promise<void> {
    await this.http.post<Bank>(`${environment.apiUrl}/banks`, bank).pipe(
      map(b => createBank(b)),
      tap(b => {
        this.banksStore.add(b);
        this.banksStore.setActive(b.id);
      })
    ).toPromise();
  }

  async update(bank: Bank): Promise<void> {
    await this.http.patch<Bank>(`${environment.apiUrl}/banks/${bank.id}`, bank).pipe(
      map(b => createBank(b)),
      tap(b => this.banksStore.update(bank.id, b))
    ).toPromise();
  }

  delete(bank: Bank): void {
    this.banksStore.remove(bank.id);
    this.http.delete(`${environment.apiUrl}/banks/${bank.id}`).toPromise();
  }
}
