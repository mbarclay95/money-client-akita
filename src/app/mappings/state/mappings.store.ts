import { Injectable } from '@angular/core';
import { Mapping } from './mapping.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MappingsState extends EntityState<Mapping> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'mappings' })
export class MappingsStore extends EntityStore<MappingsState> {

  constructor() {
    super();
  }

}

