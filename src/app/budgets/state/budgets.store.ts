import { Injectable } from '@angular/core';
import { Budget } from './budget.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BudgetsState extends EntityState<Budget, number>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'budgets' })
export class BudgetsStore extends EntityStore<BudgetsState> {

  constructor() {
    super({loading: false});
  }

}

