import { Injectable } from '@angular/core';
import { Bank } from './bank.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BanksState extends EntityState<Bank> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'banks' })
export class BanksStore extends EntityStore<BanksState> {

  constructor() {
    super();
  }

}

