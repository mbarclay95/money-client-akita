import { Injectable } from '@angular/core';
import {Order, QueryConfig, QueryEntity} from '@datorama/akita';
import { MappingsStore, MappingsState } from './mappings.store';

@Injectable({ providedIn: 'root' })
export class MappingsQuery extends QueryEntity<MappingsState> {
  mappings$ = this.selectAll();

  constructor(protected store: MappingsStore) {
    super(store);
  }

}
