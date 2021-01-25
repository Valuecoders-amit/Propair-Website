import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'joined'})
export class MemberShip implements PipeTransform {
  transform(value: string): string {
    

    var a = moment(new Date())
    var b = moment(value)

    let data = a.diff(b, 'months');
    let month = (data%12);
    let year = Math.floor(data/12)
    



    if(year > 0){
        return `${year} Year ${month} Month`;
    }

    else if (month > 0) { 
        return `${month} Month`;
    }
    else{ 
        return `Less than a Month`;
    }


   
  }
}