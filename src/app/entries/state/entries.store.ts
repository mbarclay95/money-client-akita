import { Injectable } from '@angular/core';
import { Entry } from './entry.model';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';

export interface EntriesState extends EntityState<Entry, number>, ActiveState {
  total: number;
  ui: EntryUiState;
}

export interface EntryUiState {
  pageSize: number;
  page: number;
  search: string;
  bankId: number;
}

export const uiInitialState: EntryUiState = {pageSize: 10, page: 1, search: '', bankId: null};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'entries' })
export class EntriesStore extends EntityStore<EntriesState> {


  constructor() {
    super({loading: false, total: 0, ui: uiInitialState});
  }

  resetUi(): void {
    this.updateUi(uiInitialState);
  }

  updateUi(newUi: Partial<EntryUiState>): void {
    this.update({ui: {...this.getValue().ui, ...newUi}});
  }

}

