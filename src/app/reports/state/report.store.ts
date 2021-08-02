import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {createSubCategoryTotal, SubCategoryTotal} from '../../interfaces/sub-category-total';
import { reportModesType} from '../../interfaces/report-modes';

export interface ReportState {
   subCategoryTotals: SubCategoryTotal[];
   mode: reportModesType;
   month: number;
   year: number;
   startDate: Date;
   endDate: Date;
}

export function createInitialState(): ReportState {
  return {
    subCategoryTotals: [],
    mode: 'All',
    month: null,
    year: null,
    startDate: null,
    endDate: null,
  };
}

export function createReport(params: Partial<ReportState>): ReportState {
  return {
    subCategoryTotals: params.subCategoryTotals ? params.subCategoryTotals.map(s => createSubCategoryTotal(s)) : [],
    mode: params.mode,
    month: isNaN(params.month) ? null : Number(params.month),
    year: isNaN(params.year) ? null : Number(params.year),
    startDate: params.startDate ? new Date(params.startDate) : null,
    endDate: params.endDate ? new Date(params.endDate) : null,
  } as ReportState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'report' })
export class ReportStore extends Store<ReportState> {

  constructor() {
    super(createInitialState());
  }

}

