import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {CategoriesStore} from './categories.store';
import {Category, createCategory} from './category.model';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createEntry, Entry} from '../../entries/state/entry.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Injectable({providedIn: 'root'})
export class CategoriesService {

  constructor(
    private categoriesStore: CategoriesStore,
    private http: HttpClient
  ) {
  }

  setActive(categoryId?: number): void {
    this.categoriesStore.setActive(categoryId);
  }

  async get(): Promise<void> {
    this.categoriesStore.setLoading(true);
    const categories = await this.http.get<Category[]>(`${environment.apiUrl}/categories`).pipe(
      map(o => o.map(c => createCategory(c))),
      tap(entities => this.categoriesStore.set(entities))
    ).toPromise();
    this.categoriesStore.setLoading(false);
  }

  async add(category: Category): Promise<void> {
    await this.http.post<Category>(`${environment.apiUrl}/categories`, category).pipe(
      map(c => createCategory(c)),
      tap(c => {
        this.categoriesStore.add(c);
        this.categoriesStore.setActive(c.id);
      })
    ).toPromise();
  }

  async update(category: Category): Promise<void> {
    await this.http.patch<Category>(`${environment.apiUrl}/categories/${category.id}`, category).pipe(
      map(c => createCategory(c)),
      tap(c => this.categoriesStore.update(category.id, c))
    ).toPromise();
  }

  async updateState(category: Category, newState: Partial<Category>): Promise<void> {
    const newCategory = {...category, ...newState};

    await this.http.patch<Category>(`${environment.apiUrl}/categories/${category.id}`, newCategory).pipe(
      map(c => createCategory(c)),
      tap(c => this.categoriesStore.update(category.id, c))
    ).toPromise();
  }

  delete(category: Category): void {
    this.categoriesStore.remove(category.id);
    this.http.delete(`${environment.apiUrl}/categories/${category.id}`).toPromise();
  }

  updateCache(id: number, category: Partial<Category>): void {
    this.categoriesStore.update(id, category);
  }

  updateSort(movedCategories: { id: number; sort: number }[]): void {
    this.http.post(`${environment.apiUrl}/update-sort`, {type: 'category', data: movedCategories}).toPromise();
  }
}
