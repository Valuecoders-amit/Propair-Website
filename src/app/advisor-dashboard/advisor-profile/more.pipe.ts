import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'more'})
export class MoreStr implements PipeTransform {
  transform(value: string): string {
    if(value.length > 450){
        return value.substring(0,450);
    }

    return value;
  }
}