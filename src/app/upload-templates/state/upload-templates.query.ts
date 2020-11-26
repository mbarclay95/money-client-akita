import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UploadTemplatesStore, UploadTemplatesState } from './upload-templates.store';

@Injectable({ providedIn: 'root' })
export class UploadTemplatesQuery extends QueryEntity<UploadTemplatesState> {
  templates$ = this.selectAll();

  constructor(protected store: UploadTemplatesStore) {
    super(store);
  }

}
