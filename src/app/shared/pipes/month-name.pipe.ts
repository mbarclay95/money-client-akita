import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(month: number, ...args: unknown[]): string {
    return dayjs().month(month).format('MMM');
  }

}
