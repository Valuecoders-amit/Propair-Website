import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../lib/services/auth.service';

@Component({
  selector: 'app-advisor-milestones',
  templateUrl: './advisor-milestones.component.html',
  styleUrls: ['./advisor-milestones.component.scss']
})
export class AdvisorMilestonesComponent implements OnInit {

  mileprogress : number;
  miles : string;
  milestoneData : any = {};
  karmaPoints : any = {};
  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.getMilestoneData();
    this.getKarmaPoints();

  }
  getMilestoneData(){
    this.auth.getMilestone().subscribe(data=>{
      this.milestoneData = data['data'];
      const leftVlaue = this.milestoneData.kp;
      const max = this.milestoneData.maxPoint
      const rightValue = Math.floor((leftVlaue/max)*100);
      this.mileprogress = rightValue;  
    })
  }

  getKarmaPoints() {
    this.auth.getKarmaPointsDetail().subscribe(data=>{
      this.karmaPoints = data['data'][0]['rewards']['milestone'];

    })
  }

}
