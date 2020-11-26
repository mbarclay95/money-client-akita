import { Pipe, PipeTransform } from '@angular/core';
import {Entry, isSavingsEntryPositive} from '../../entries/state/entry.model';
import {SavingsStoreService} from '../../services/savings/savings-store.service';

@Pipe({
  name: 'isEntryPositive'
})
export class IsEntryPositivePipe implements PipeTransform {

  constructor(
    private savingsStoreService: SavingsStoreService
  ) {
  }

  transform(entry: Entry, ...args: unknown[]): boolean {
    return isSavingsEntryPositive(entry, this.savingsStoreService.getActiveCategoryValue());
  }

}
