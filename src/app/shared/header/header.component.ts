import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.token = this.authService.token

    }
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "100%";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
  }

}
