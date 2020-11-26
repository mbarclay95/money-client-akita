import {Injectable} from '@angular/core';
import {ID, setLoading} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {MappingsStore} from './mappings.store';
import {createMapping, Mapping} from './mapping.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';

@Injectable({providedIn: 'root'})
export class MappingsService {

  constructor(
    private mappingsStore: MappingsStore,
    private http: HttpClient
  ) {
  }

  async get(): Promise<void> {
    await this.http.get<Mapping[]>(`${environment.apiUrl}/mappings`).pipe(
      map(o => o.map(m => createMapping(m))),
      tap(entities => this.mappingsStore.set(entities))
    ).toPromise();
  }

  async add(mapping: Mapping): Promise<void> {
    await this.http.post<Mapping>(`${environment.apiUrl}/mappings`, mapping).pipe(
      setLoading(this.mappingsStore),
      tap(m => this.mappingsStore.add(createMapping(m)))
    ).toPromise();
  }

  async update(mapping: Mapping): Promise<void> {
    await this.http.patch<Mapping>(`${environment.apiUrl}/mappings/${mapping.id}`, mapping).pipe(
      setLoading(this.mappingsStore),
      map(m => createMapping(m)),
      tap(m => this.mappingsStore.update(mapping.id, m))
    ).toPromise();
  }

  delete(mapping: Mapping): void {
    this.mappingsStore.remove(mapping.id);
    this.http.delete(`${environment.apiUrl}/mappings/${mapping.id}`).toPromise();
  }
}
