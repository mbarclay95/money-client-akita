import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Pipe({
  name: 'isSelectedSubCategory'
})
export class IsSelectedSubCategoryPipe implements PipeTransform {

  transform(activeCategory: Category | SubCategory, id: number, ...args: unknown[]): boolean {
    if (!activeCategory) {
      return false;
    }

    if ('savings' in activeCategory) {
      return false;
    }

    return activeCategory.id === id;
  }

}
