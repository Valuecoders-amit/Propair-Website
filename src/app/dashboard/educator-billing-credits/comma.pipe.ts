import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'comma'})
export class Comma implements PipeTransform {
  transform(value) {

    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
}