import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Category} from '../../categories/state/category.model';

@Pipe({
  name: 'isSelectedCategory'
})
export class IsSelectedCategoryPipe implements PipeTransform {

  transform(activeCategory: Category | SubCategory, id: number, ...args: unknown[]): boolean {
    if (!activeCategory) {
      return false;
    }

    if ('savings' in activeCategory) {
      return activeCategory.id === id;
    }

    return false;
  }

}
