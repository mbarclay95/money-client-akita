import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'getMonthName'
})
export class GetMonthNamePipe implements PipeTransform {

  transform(month: number, ...args: unknown[]): unknown {
    return dayjs().month(month).format('MMM');
  }

}
