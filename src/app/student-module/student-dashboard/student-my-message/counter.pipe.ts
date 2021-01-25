import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'counter'})
export class TimeStr implements PipeTransform {
  transform(value: string): any {
    
    function convertMS( milliseconds ) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        if(minute < 0){
            return `0m`; 
        }
        else{ 
            if(day && hour && minute){
                return `${day}d ${hour}h ${minute}m`;
            }
            else if(hour && minute){
                return `${hour}h ${minute}m`;
            }
            else{ 
                return `${minute}m`; 
            }

        }
        
    }

    var a = moment(new Date())
    var b = moment(value)
    
    let stamp=b.diff(a)
    let finalTime=convertMS(stamp);
    return finalTime;
  }
}