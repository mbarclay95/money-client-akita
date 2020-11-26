import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GoalsStore, GoalsState } from './goals.store';
import {Goal} from './goal.model';

@Injectable({ providedIn: 'root' })
export class GoalsQuery extends QueryEntity<GoalsState> {
  goals$ = this.selectAll();

  constructor(protected store: GoalsStore) {
    super(store);
  }

  getValueBySubCategory(subCategoryId: number): Goal[] {
    return this.getAll({
      filterBy: ({subCategory}) => subCategory.id === subCategoryId
    });
  }

}
