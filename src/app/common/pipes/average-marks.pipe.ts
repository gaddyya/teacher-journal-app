import { Pipe, PipeTransform } from '@angular/core';
import { isNumberFinite } from '../helpers';

@Pipe({
  name: 'averageMarks'
})
export class AverageMarksPipe implements PipeTransform {

  public transform (arr: number[]): string | number {
    const isValid: boolean = arr.every(value => isNumberFinite(value));

    if (!isValid) {
      return NaN;
    }
    return arr.length ? (arr.reduce((sum, value) => sum + value, 0) / arr.length).toFixed(1) : 0;
  }

}
