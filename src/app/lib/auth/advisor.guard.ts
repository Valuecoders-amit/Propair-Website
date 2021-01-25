import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'


@Injectable({
  providedIn: 'root'
})
export class AdvisorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   
   if (this.authService.getToken() && this.authService.getUserInfo().role == 'advisor') {
      return true;
    } else if (this.authService.getToken()) {
      this.router.navigateByUrl('/advisor-dashboard');
    }
     else {
      this.router.navigateByUrl('/advisor-login')
      return false;
    }

  }

}
