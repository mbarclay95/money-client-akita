import { Pipe, PipeTransform } from '@angular/core';
import {Entry, isEntryCompleted} from '../state/entry.model';

@Pipe({
  name: 'getEntryClass'
})
export class GetEntryClassPipe implements PipeTransform {

  transform(entry: Entry, ...args: unknown[]): string {
    return isEntryCompleted(entry) ? 'completed' : 'in-progress';
  }

}
