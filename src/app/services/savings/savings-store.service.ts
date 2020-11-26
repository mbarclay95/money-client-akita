import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {SubCategoriesQuery} from '../../sub-categories/state/sub-categories.query';
import {createSavingsTotal, SavingsTotal} from '../../interfaces/savings-total';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {createSavingsDetails, SavingsDetails} from '../../interfaces/savings-details';

@Injectable({
  providedIn: 'root'
})
export class SavingsStoreService {
  private activeSubCategorySubject: BehaviorSubject<SubCategory> = new BehaviorSubject<SubCategory>(null);
  activeSubCategory$: Observable<SubCategory> = this.activeSubCategorySubject.asObservable();

  refreshTotals$: Subject<void> = new BehaviorSubject<void>(null);

  getTotalsForSubCategories$: Observable<SavingsTotal[]> = combineLatest([
    this.refreshTotals$.asObservable(),
    this.subCategoriesQuery.select('showInactive')
  ]).pipe(
    switchMap(([, showInactive]) => this.getSavingsCategories(showInactive)),
    map(o => o.sort((a, b) => a.subCategory.sort - b.subCategory.sort))
  );

  getSavingsDetailsForActive$: Observable<SavingsDetails> = combineLatest([
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

  getSavingsDetailsObservable(subCategory: SubCategory): Observable<SavingsDetails> {
    let queryString = `forSavings=true&showEntries=true&`;
    queryString += (subCategory ? `subCategoryId=${subCategory.id}` : '');

    return this.http.get<SavingsDetails>(`${environment.apiUrl}/entry-sums?${queryString}`).pipe(
      map(o => createSavingsDetails(o))
    );
  }

  getSavingsCategories(showInactive: boolean): Observable<SavingsTotal[]> {
    return this.http.get<SavingsTotal[]>(`${environment.apiUrl}/saving-totals?showInactive=${showInactive}`).pipe(
      map(o => o.map(s => createSavingsTotal(s)))
    );
  }

  getActiveCategoryValue(): SubCategory {
    return this.activeSubCategorySubject.value;
  }

}
