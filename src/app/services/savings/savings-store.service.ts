import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {SubCategoriesQuery} from '../../sub-categories/state/sub-categories.query';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {createSelectedDetails, SelectedDetails} from '../../interfaces/selected-details';
import {createSubCategoryTotal, SubCategoryTotal} from '../../interfaces/sub-category-total';

@Injectable({
  providedIn: 'root'
})
export class SavingsStoreService {
  private activeSubCategorySubject: BehaviorSubject<SubCategory> = new BehaviorSubject<SubCategory>(null);
  activeSubCategory$: Observable<SubCategory> = this.activeSubCategorySubject.asObservable();

  refreshTotals$: Subject<void> = new BehaviorSubject<void>(null);

  getTotalsForSubCategories$: Observable<SubCategoryTotal[]> = combineLatest([
    this.refreshTotals$.asObservable(),
    this.subCategoriesQuery.select('showInactive')
  ]).pipe(
    switchMap(([, showInactive]) => this.getSavingsCategories(showInactive)),
    map(o => o.sort((a, b) => a.subCategory.sort - b.subCategory.sort))
  );

  getSavingsDetailsForActive$: Observable<SelectedDetails> = combineLatest([
    this.refreshTotals$.asObservable(),
    this.activeSubCategory$
  ]).pipe(
    switchMap(([, subCategory]) => this.getSavingsDetailsObservable(subCategory))
  );

  getActiveCategoryAsObject$: Observable<{ active: SubCategory }> = this.activeSubCategory$.pipe(
    map(active => {
      return {active};
    })
  );

  constructor(
    private subCategoriesQuery: SubCategoriesQuery,
    private http: HttpClient
  ) {
    this.subScribeToActiveSubCategory();
  }

  private subScribeToActiveSubCategory(): void {
    this.activeSubCategory$.subscribe();
  }

  updateActive(subCategory: SubCategory): void {
    this.activeSubCategorySubject.next(subCategory);
  }

  getSavingsDetailsObservable(subCategory: SubCategory): Observable<SelectedDetails> {
    let queryString = `forSavings=1&showEntries=1&`;
    queryString += (subCategory ? `subCategoryId=${subCategory.id}` : '');

    return this.http.get<SelectedDetails>(`${environment.apiUrl}/entry-sums?${queryString}`).pipe(
      map(o => createSelectedDetails(o))
    );
  }

  getSavingsCategories(showInactive: boolean): Observable<SubCategoryTotal[]> {
    return this.http.get<SubCategoryTotal[]>(`${environment.apiUrl}/saving-totals?showInactive=${showInactive}`).pipe(
      map(o => o.map(s => createSubCategoryTotal(s)))
    );
  }

  getActiveCategoryValue(): SubCategory {
    return this.activeSubCategorySubject.value;
  }

}
