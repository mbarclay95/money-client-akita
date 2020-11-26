import {Injectable} from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import {SubCategoriesStore, SubCategoriesState} from './sub-categories.store';
import {CategoriesQuery} from '../../categories/state/categories.query';
import {combineLatest, Observable} from 'rxjs';
import {SubCategory} from './sub-category.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
@QueryConfig({
  sortBy: 'sort',
  sortByOrder: Order.ASC
})
export class SubCategoriesQuery extends QueryEntity<SubCategoriesState> {
  isLoading$ = this.selectLoading();
  subCategories$ = this.selectAll();

  activeSubCategories = this.selectAll({
    filterBy: ({isActive}) => isActive
  });

  activeSavingsSubCategories$ = this.selectAll({
    filterBy: [
      ({category}) => category.savings,
      ({isActive}) => isActive
    ]
  });

  savingsSubCategories$ = combineLatest([
    this.select('showInactive'),
    this.selectAll({
      filterBy: [
        ({category}) => category.savings,
      ]
    })
  ]).pipe(
    map(([showInactive, subCategories]) =>
      showInactive ? subCategories : subCategories.filter(s => s.isActive))
  );

  categoryList$ = this.activeSubCategories.pipe(
    map(o => o.map(s => {
      return {label: s.name, value: s.id, groupLabel: s.category.name};
    }))
  );

  constructor(
    protected store: SubCategoriesStore,
    private categoriesQuery: CategoriesQuery
  ) {
    super(store);
  }

  subCategoriesByActiveCategory$(onlyActive: boolean = true): Observable<SubCategory[]> {
    return this.subCategoriesByCategory$(this.categoriesQuery.getActiveId(), onlyActive);
  }

  subCategoriesByCategory$(categoryId: number, onlyActive: boolean = true): Observable<SubCategory[]> {
    return this.selectAll({
      filterBy: [
        ({category}) => category.id === categoryId,
        ({isActive}) => isActive || !onlyActive
      ]
    });
  }

  subCategoriesByCategory(categoryId: number, onlyActive: boolean = true): SubCategory[] {
    return this.getAll({
      filterBy: [
        ({category}) => category.id === categoryId,
        ({isActive}) => isActive || !onlyActive
      ]
    });
  }

}
