import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'joined'})
export class MemberShip implements PipeTransform {
  transform(startDate: string , endDate : string): any {

    var a = moment(endDate)
    var b = moment(startDate)

    let data = a.diff(b, 'months');
    let month = (data%12);
    let year = Math.floor(data/12)
    



    if(year > 0){
        return `${year} year ${month} month`;
    }

    else if (month > 0) { 
        return `${month} month`;
    }
    else{ 
        return `Less than a month`;
    }



   
  }
}