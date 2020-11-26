import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BanksStore, BanksState } from './banks.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BanksQuery extends QueryEntity<BanksState> {
  isLoading$ = this.selectLoading();
  banks$ = this.selectAll();

  banksForFilter$: Observable<{ text: string, value: string }[]> = this.selectAll().pipe(
    map(banks => banks.map(bank => {
      return { text: bank.name, value: bank.id.toString() };
    }))
  );

  constructor(protected store: BanksStore) {
    super(store);
  }

}
