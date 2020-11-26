import { Injectable } from '@angular/core';
import { UploadTemplate } from './upload-template.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface UploadTemplatesState extends EntityState<UploadTemplate> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'upload-templates' })
export class UploadTemplatesStore extends EntityStore<UploadTemplatesState> {

  constructor() {
    super();
  }

}

