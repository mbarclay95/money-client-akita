import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'printPrettyMonthYear'
})
export class PrintPrettyMonthYearPipe implements PipeTransform {

  transform(date: { month: number, year: number }, ...args: unknown[]): unknown {
    return dayjs().month(date.month).format('MMM') + ' ' + date.year;
  }

}
