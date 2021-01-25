import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/services/auth.service'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public userData:any;
  public data:any

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userData = this.authService.getUserInfo()
    this.dashboardData();
  }

  dashboardData(){
    this.authService.educatorDashboardData().subscribe(data =>{

      this.data = data['data']
    })
  }

}
