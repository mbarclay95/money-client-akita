import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';

export interface CategoriesState extends EntityState<Category, number>, ActiveState<number> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'categories' })
export class CategoriesStore extends EntityStore<CategoriesState> {

  constructor() {
    super();
  }

}

