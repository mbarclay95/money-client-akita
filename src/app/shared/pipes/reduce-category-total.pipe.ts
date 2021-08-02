import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../../categories/state/category.model';
import {Observable} from 'rxjs';
import {reduceSubCategoryTotals, SpendingService} from '../../services/spending/spending.service';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'reduceCategoryTotal'
})
export class ReduceCategoryTotalPipe implements PipeTransform {

  constructor(
    private spendingService: SpendingService
  ) {
  }

  transform(category: Category, ...args: unknown[]): Observable<number> {
    return this.spendingService.subCategoryTotals$.pipe(
      map(totals => totals.filter(total => total.subCategory.category.id === category.id)),
      reduceSubCategoryTotals()
    );
  }

}
