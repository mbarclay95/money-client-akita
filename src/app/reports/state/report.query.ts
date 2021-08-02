import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ReportStore, ReportState } from './report.store';

@Injectable({ providedIn: 'root' })
export class ReportQuery extends Query<ReportState> {

  constructor(protected store: ReportStore) {
    super(store);
  }

  buildQueryString(): string {
    const state = this.getValue();
    let queryString = `mode=${state.mode}`;

    if (state.month) {
      queryString += `month=${state.month}&`;
    }

    if (state.year) {
      queryString += `year=${state.year}&`;
    }

    if (state.startDate) {
      queryString += `startDate=${state.startDate.toDateString()}&`;
    }

    if (state.endDate) {
      queryString += `endDate=${state.endDate.toDateString()}&`;
    }

    return queryString;
  }

}
