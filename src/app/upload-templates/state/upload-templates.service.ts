import { Injectable } from '@angular/core';
import {ID, setLoading} from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UploadTemplatesStore } from './upload-templates.store';
import {createUploadTemplate, UploadTemplate} from './upload-template.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Bank} from '../../banks/state/bank.model';

@Injectable({ providedIn: 'root' })
export class UploadTemplatesService {

  constructor(private uploadTemplatesStore: UploadTemplatesStore,
              private http: HttpClient) {
  }

  async get(): Promise<void> {
    await this.http.get<UploadTemplate[]>(`${environment.apiUrl}/upload-templates`).pipe(
      setLoading(this.uploadTemplatesStore),
      map(o => o.map(u => createUploadTemplate(u))),
      tap(entities => this.uploadTemplatesStore.set(entities))
    ).toPromise();
  }

  async add(uploadTemplate: UploadTemplate): Promise<number> {
    return (await this.http.post<UploadTemplate>(`${environment.apiUrl}/upload-templates`, uploadTemplate).pipe(
      map(u => createUploadTemplate(u)),
      tap(u => this.uploadTemplatesStore.add(u))
    ).toPromise()).id;
  }

  delete(template: UploadTemplate): void {
    this.uploadTemplatesStore.remove(template.id);
    this.http.delete(`${environment.apiUrl}/upload-templates/${template.id}`).toPromise();
  }
}
