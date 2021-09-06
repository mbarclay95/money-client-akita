import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {SpendingService} from '../../services/spending/spending.service';
import {Entry} from '../../entries/state/entry.model';

@Pipe({
  name: 'entriesByActiveCategory'
})
export class EntriesByActiveCategoryPipe implements PipeTransform {

  constructor(
    private spendingService: SpendingService
  ) {
  }

  transform(activeCategory: Category | SubCategory, ...args: unknown[]): Entry[] {
    if (!activeCategory) {
      return [];
    }

    if ('income' in activeCategory) {
      return this.spendingService.getEntriesByCategory(activeCategory);
    }

    return this.spendingService.getEntriesBySubCategory(activeCategory);
  }

}
