import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Pipe({
  name: 'removeCurrentSubCategory'
})
export class RemoveCurrentSubCategoryPipe implements PipeTransform {

  transform(subCategoryList: SubCategory[], currentSubCategory: SubCategory, ...args: unknown[]): SubCategory[] {
    return subCategoryList.filter(s => s.id !== currentSubCategory.id);
  }

}
