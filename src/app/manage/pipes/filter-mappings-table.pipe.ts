import { Pipe, PipeTransform } from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Mapping} from '../../mappings/state/mapping.model';
import {MappingsQuery} from '../../mappings/state/mappings.query';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'filterMappingsTable'
})
export class FilterMappingsTablePipe implements PipeTransform {

  constructor(
    private mappingsQuery: MappingsQuery
  ) {
  }

  transform(subCategory: SubCategory, ...args: unknown[]): Observable<Mapping[]> {
    return this.mappingsQuery.mappings$.pipe(
      map(mappings => mappings.filter(m => {
        if (subCategory.id === 0) {
          return m.category.id === subCategory.category.id;
        }

        return m.subCategory.id === subCategory.id;
      }).sort((a, b) => a.subCategory.sort - b.subCategory.sort))
    );
  }

}
