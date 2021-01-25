import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'more'})
export class MoreStr implements PipeTransform {
  transform(value: string): string {
    if(value.length > 100){
        return value.substring(0,100);
    }

    return value;
  }
}


@Pipe({name: 'counter'})
export class Joined implements PipeTransform {
  transform(value: string): string {

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
  
  let stamp=a.diff(b)
  let finalTime=convertMS(stamp);
  return finalTime;
  }
}