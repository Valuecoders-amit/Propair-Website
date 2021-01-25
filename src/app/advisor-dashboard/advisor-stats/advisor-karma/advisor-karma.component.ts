import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../lib/services/auth.service';

@Component({
  selector: 'app-advisor-karma',
  templateUrl: './advisor-karma.component.html',
  styleUrls: ['./advisor-karma.component.scss']
})
export class AdvisorKarmaComponent implements OnInit {

  karmaPoints : any ={};
  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.getKarmaPoints();
  }

  getKarmaPoints() {
    this.auth.getKarmaPointsDetail().subscribe(data=>{
      this.karmaPoints = data['data'][0];

    })
  }

}
