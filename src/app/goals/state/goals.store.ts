import { Injectable } from '@angular/core';
import { Goal } from './goal.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface GoalsState extends EntityState<Goal> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'goals' })
export class GoalsStore extends EntityStore<GoalsState> {

  constructor() {
    super();
  }

}

