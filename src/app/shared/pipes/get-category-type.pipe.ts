import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';

@Pipe({
  name: 'getCategoryType'
})
export class GetCategoryTypePipe implements PipeTransform {

  transform(category: Category, ...args: unknown[]): string {
    if (category.income) {
      return 'Income';
    }

    if (category.savings) {
      return 'Savings';
    }

    return 'Expense';
  }

}
