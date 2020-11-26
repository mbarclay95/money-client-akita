import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {createEntryBudgetWrapper, EntryBudgetWrapper} from './entry-budget-wrapper';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'entryBudgetWrapper' })
export class EntryBudgetWrapperStore extends Store<EntryBudgetWrapper> {

  constructor() {
    super(createEntryBudgetWrapper({}));
  }

}

