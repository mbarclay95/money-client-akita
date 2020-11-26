import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSavingsTextColor'
})
export class GetSavingsTextColorPipe implements PipeTransform {

  transform(goal: number, saved: number, ...args: any[]): any {
    if (goal === 0 && saved === 0) {
      return '';
    }

    return goal > saved ? 'text-warning' : 'text-success';
  }

}
