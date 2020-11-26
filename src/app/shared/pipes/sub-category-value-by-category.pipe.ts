import { Pipe, PipeTransform } from '@angular/core';
import {SubCategoriesQuery} from '../../sub-categories/state/sub-categories.query';
import {Category} from '../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';

@Pipe({
  name: 'subCategoryValueByCategory'
})
export class SubCategoryValueByCategoryPipe implements PipeTransform {

  constructor(
    private subCategoriesQuery: SubCategoriesQuery
  ) {
  }

  transform(category: Category, onlyActive: boolean = false, includeAll: boolean = false, ...args: unknown[]): SubCategory[] {
    let subCategories = this.subCategoriesQuery.subCategoriesByCategory(category.id, onlyActive);

    if (includeAll) {
      subCategories = [...[createSubCategory({id: 0, category, name: 'All', sort: 0, isActive: true})], ...subCategories];
    }

    return subCategories;
  }

}
