import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportStore } from './report.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(private reportStore: ReportStore,
              private http: HttpClient) {
  }

}
