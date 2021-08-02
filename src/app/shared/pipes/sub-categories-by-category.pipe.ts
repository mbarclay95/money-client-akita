import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';
import {SubCategoriesQuery} from '../../sub-categories/state/sub-categories.query';
import {Observable} from 'rxjs';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Pipe({
  name: 'subCategoriesByCategory'
})
export class SubCategoriesByCategoryPipe implements PipeTransform {

  constructor(
    private subCategoriesQuery: SubCategoriesQuery
  ) {
  }

  transform(category: Category | number, onlyActive: boolean = false, ...args: unknown[]): Observable<SubCategory[]> {
    const categoryId = typeof category === 'number' ? category : category.id;

    return this.subCategoriesQuery.subCategoriesByCategory$(categoryId, onlyActive);
  }

}
