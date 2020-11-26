import { Pipe, PipeTransform } from '@angular/core';
import {Entry, isEntryCompleted} from '../state/entry.model';

@Pipe({
  name: 'isEntryComplete'
})
export class IsEntryCompletePipe implements PipeTransform {

  transform(entry: Entry, ...args: unknown[]): boolean {
    return isEntryCompleted(entry);
  }

}
