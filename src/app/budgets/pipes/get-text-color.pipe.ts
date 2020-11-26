import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTextColor'
})
export class GetTextColorPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    if (value === 0) {
      return '';
    }

    return value > 0 ? 'text-success' : 'text-danger';
  }

}
