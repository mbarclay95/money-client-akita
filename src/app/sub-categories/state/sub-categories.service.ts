import {Injectable} from '@angular/core';
import {ID, setLoading} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {SubCategoriesState, SubCategoriesStore} from './sub-categories.store';
import {createSubCategory, SubCategory} from './sub-category.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SubCategoriesService {

  constructor(
    private subCategoriesStore: SubCategoriesStore,
    private http: HttpClient
  ) {
  }

  async get(): Promise<void> {
    this.subCategoriesStore.setLoading(true);
    await this.http.get<SubCategory[]>(`${environment.apiUrl}/sub-categories`).pipe(
      map(o => o.map(s => createSubCategory(s))),
      tap(entities => this.subCategoriesStore.set(entities))
    ).toPromise();
    this.subCategoriesStore.setLoading(false);
  }

  changeState(state: Partial<SubCategoriesState>): void {
    this.subCategoriesStore.update(state);
  }

  async add(subCategory: SubCategory): Promise<void> {
    await this.http.post<SubCategory>(`${environment.apiUrl}/sub-categories`, subCategory).pipe(
      setLoading(this.subCategoriesStore),
      map(s => createSubCategory(s)),
      tap(s => this.subCategoriesStore.add(s))
    ).toPromise();
  }

  async update(subCategory: SubCategory): Promise<void> {
    await this.http.patch<SubCategory>(`${environment.apiUrl}/sub-categories/${subCategory.id}`, subCategory).pipe(
      setLoading(this.subCategoriesStore),
      map(s => createSubCategory(s)),
      tap(s => this.subCategoriesStore.update(subCategory.id, s))
    ).toPromise();
  }

  updateCache(id: number, subCategory: Partial<SubCategory>): void {
    this.subCategoriesStore.update(id, subCategory);
  }

  delete(subCategory: SubCategory): void {
    this.subCategoriesStore.remove(subCategory.id);
    this.http.delete(`${environment.apiUrl}/sub-categories/${subCategory.id}`).toPromise();
  }

  updateSort(movedSubCategories: { id: number; sort: number }[]): void {
    this.http.post(`${environment.apiUrl}/update-sort`, {type: 'subCategory', data: movedSubCategories}).toPromise();
  }

  async updateState(subCategory: SubCategory, newState: Partial<SubCategory>): Promise<void> {
    const newSubCategory = {...subCategory, ...newState};

    await this.http.patch<SubCategory>(`${environment.apiUrl}/sub-categories/${subCategory.id}`, newSubCategory).pipe(
      map(s => createSubCategory(s)),
      tap(s => this.subCategoriesStore.update(subCategory.id, s))
    ).toPromise();
  }
}
