import { Injectable } from '@angular/core';
import { SubCategory } from './sub-category.model';
import {EntityState, ActiveState, EntityStore, StoreConfig, QueryConfig, Order} from '@datorama/akita';

export interface SubCategoriesState extends EntityState<SubCategory, number>, ActiveState {
  showInactive: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sub-categories' })
@QueryConfig({
  sortBy: 'sort',
  sortByOrder: Order.ASC
})
export class SubCategoriesStore extends EntityStore<SubCategoriesState> {

  constructor() {
    super({showInactive: false});
  }

}

