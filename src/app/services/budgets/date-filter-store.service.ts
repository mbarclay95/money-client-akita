import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as dayjs from 'dayjs';
import {UniqueYearsService} from '../unique-years.service';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateFilterStoreService {
  private dateSubject: BehaviorSubject<{month: number, year: number}> = new BehaviorSubject<{month: number, year: number}>({month: dayjs().month(), year: dayjs().year()});
  date: Observable<{month: number, year: number}> = this.dateSubject.asObservable();

  datePrintPretty$: Observable<string> = this.date.pipe(
    map(date => dayjs().month(date.month).format('MMM') + ' ' + date.year)
  );

  months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  years: number[];

  constructor(
    private uniqueYearsService: UniqueYearsService
  ) {
    this.subscribeToUniqueYears();
  }

  getDate(): {month: number, year: number} {
    return this.dateSubject.value;
  }

  subscribeToUniqueYears(): void {
    this.uniqueYearsService.uniqueYears.pipe(
      filter(u => u !== null)
    ).subscribe(u => this.years = u);
  }

  decrementMonth(): void {
    const currDate = this.dateSubject.value;
    if (currDate.month === 0) {
      currDate.month = 11;
      currDate.year--;
    } else {
      currDate.month--;
    }

    this.dateSubject.next(currDate);
  }

  incrementMonth(): void {
    const currDate = this.dateSubject.value;
    if (currDate.month === 11) {
      currDate.month = 0;
      currDate.year++;
    } else {
      currDate.month++;
    }

    this.dateSubject.next(currDate);
  }

  changeMonth(month: number): void {
    const currDate = this.dateSubject.value;
    currDate.month = month;
    this.dateSubject.next(currDate);
  }

  changeYear(year: number): void {
    const currDate = this.dateSubject.value;
    currDate.year = year;
    this.dateSubject.next(currDate);
  }

  changeBoth(month: number, year: number): void {
    this.dateSubject.next({month, year});
  }
}
