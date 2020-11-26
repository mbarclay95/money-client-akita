import { Pipe, PipeTransform } from '@angular/core';
import {ReducedEntryBudget} from '../../../interfaces/reduced-entry-budget';

@Pipe({
  name: 'getPercentageSaved'
})
export class GetPercentageSavedPipe implements PipeTransform {

  transform(wrappedData: ReducedEntryBudget, ...args: any[]): number {
    if (wrappedData.budget === 0) {
      return wrappedData.entry > 0 ? 100 : 0;
    }

    return parseInt((wrappedData.entry / wrappedData.budget * 100).toFixed(), 10);
  }

}
