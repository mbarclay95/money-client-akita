import { Pipe, PipeTransform } from '@angular/core';
import {SpendingUiState} from '../../services/spending/spending-ui.service';
import {SubCategoryTotal} from '../../interfaces/sub-category-total';
import {Observable} from 'rxjs';
import {SpendingService} from '../../services/spending/spending.service';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'subCategoryTotals'
})
export class SubCategoryTotalsPipe implements PipeTransform {

  constructor(
    private spendingService: SpendingService
  ) {
  }

  transform(ui: SpendingUiState, ...args: unknown[]): Observable<SubCategoryTotal[]> {
    return this.spendingService.subCategoryTotals$.pipe(
      map(totals => {
        if (!!ui.categoryId) {
          return totals.filter(total => total.subCategory.category.id === ui.categoryId);
        }
        const selectedSubCategory = totals.map(total => total.subCategory).find(s => s.id === ui.subCategoryId);

        return totals.filter(total => total.subCategory.category.id === selectedSubCategory.category.id);
      })
    );
  }

}
