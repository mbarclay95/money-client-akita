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

  transform(category: Category, onlyActive: boolean = false, ...args: unknown[]): Observable<SubCategory[]> {
    return this.subCategoriesQuery.subCategoriesByCategory$(category.id, onlyActive);
  }

}
