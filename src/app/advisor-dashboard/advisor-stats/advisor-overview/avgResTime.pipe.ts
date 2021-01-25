import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "avgResTime" })
export class AvgResTimePipe implements PipeTransform {
  transform(value: any): string {
    return convertMS(value);

    function convertMS(seconds) {
      var day, hour, minute, seconds;
      // seconds = Math.floor(milliseconds / 1000);
      minute = Math.floor(seconds / 60);
      seconds = Math.round(seconds % 60);
      hour = Math.floor(minute / 60);
      minute = Math.round(minute % 60);
      day = Math.floor(hour / 24);
      hour = Math.round(hour % 24);
 
      console.log("day",day , "hour",hour , "minute",minute,"seconds" ,seconds);
      if (day) {
        return `${day}d ${hour}h ${minute}m ${seconds}s`;
      } else if (hour) {
        return `${hour}h ${minute}m ${seconds}s`;
      } else if (minute) {
        return `${minute}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }

     
    }
  }
}
