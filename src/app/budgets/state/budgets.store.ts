import { Injectable } from '@angular/core';
import { Budget } from './budget.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BudgetsState extends EntityState<Budget, number>, ActiveState {
  ui: BudgetUiState;
}

export interface BudgetUiState {
  showExpectedIncome: boolean;
  masterBudgetView: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'budgets' })
export class BudgetsStore extends EntityStore<BudgetsState> {

  constructor() {
    super({loading: false, ui: {showExpectedIncome: false, masterBudgetView: true}});
  }

}

