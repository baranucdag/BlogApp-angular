import { BlogModel } from '../models/blogModel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: BlogModel[], ...args: unknown[]): BlogModel[] {
    return value.slice().reverse();
  }
}
