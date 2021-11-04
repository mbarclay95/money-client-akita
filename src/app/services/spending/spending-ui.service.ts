import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DateFilterStoreService} from '../budgets/date-filter-store.service';
import * as dayjs from 'dayjs';
import {Category} from '../../categories/state/category.model';
import {map} from 'rxjs/operators';
import {CategoriesQuery} from '../../categories/state/categories.query';
import {SubCategoriesQuery} from '../../sub-categories/state/sub-categories.query';
import {SubCategory} from '../../sub-categories/state/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class SpendingUiService {
  private spendingUiSubject: BehaviorSubject<SpendingUiState> = new BehaviorSubject<SpendingUiState>(uiInitialState);
  ui$ = this.spendingUiSubject.asObservable();

  selectedCategory$: Observable<Category | SubCategory> = this.ui$.pipe(
    map(ui => {
      if (!!ui.categoryId) {
        return this.categoriesQuery.getEntity(ui.categoryId);
      } else if (!!ui.subCategoryId) {
        return this.subCategoriesQuery.getEntity(ui.subCategoryId);
      }

      return null;
    })
  );

  categoryOrParent$: Observable<Category> = this.ui$.pipe(
    map(ui => {
      if (!!ui.categoryId) {
        return this.categoriesQuery.getEntity(ui.categoryId);
      } else if (!!ui.subCategoryId) {
        return this.subCategoriesQuery.getEntity(ui.subCategoryId).category;
      }

      return null;
    })
  );

  categoryVerbiage$: Observable<string> = this.ui$.pipe(
    map(ui => {
      if (ui.all) {
        return 'profit';
      }

      if (ui.allExpenses) {
        return 'spent';
      }

      let category;
      if (ui.categoryId) {
        category = this.categoriesQuery.getEntity(ui.categoryId);
      }

      if (ui.subCategoryId) {
        category = this.subCategoriesQuery.getEntity(ui.subCategoryId).category;
      }

      return category?.income ? 'income' : (category.savings ? 'saved' : 'spent');
    })
  );

  constructor(
    private dateFilterStoreService: DateFilterStoreService,
    private categoriesQuery: CategoriesQuery,
    private subCategoriesQuery: SubCategoriesQuery,
  ) {
  }

  updateCategory(newState: Partial<SpendingUiState>): void {
    this.updateUi({
      ...{
        categoryId: null,
        subCategoryId: null,
        all: false,
        allExpenses: false,
      },
      ...newState
    });
  }

  updateUi(newState: Partial<SpendingUiState>): void {
    this.spendingUiSubject.next({...this.spendingUiSubject.value, ...newState});
  }

  buildQueryString(): string {
    const uiState = this.spendingUiSubject.value;
    const date = this.dateFilterStoreService.getDate();

    const startDate: string = dayjs().date(1).month(date.month).year(date.year - 1).add(1, 'month').format('YYYY-MM-DD');
    const endDate: string = dayjs().date(1).month(date.month).year(date.year).add(1, 'month').format('YYYY-MM-DD');

    let queryString = `startDate=${startDate}&endDate=${endDate}&`;

    if (date.month) {
      queryString += `month=${date.month + 1}&`;
    }

    if (date.year) {
      queryString += `year=${date.year}&`;
    }

    if (uiState.categoryId) {
      queryString += `categoryId=${uiState.categoryId}&`;
    }

    if (uiState.subCategoryId) {
      queryString += `subCategoryId=${uiState.subCategoryId}&`;
    }

    if (uiState.all) {
      queryString += `all=${uiState.all ? 1 : 0}&`;
    }

    if (uiState.allExpenses) {
      queryString += `allExpenses=${uiState.allExpenses ? 1 : 0}&`;
    }

    if (uiState.removeFromSavings) {
      queryString += `removeFromSavings=${uiState.removeFromSavings ? 1 : 0}&`;
    }

    return queryString;
  }
}

export interface SpendingUiState {
  mode: string;
  categoryId: number;
  subCategoryId: number;
  all: boolean;
  allExpenses: boolean;
  removeFromSavings: boolean;
}

export const uiInitialState: SpendingUiState = {
  mode: 'monthly',
  categoryId: null,
  subCategoryId: null,
  all: true,
  allExpenses: false,
  removeFromSavings: true,
};
