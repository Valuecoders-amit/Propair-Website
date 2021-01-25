import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      
      if (this.authService.getToken() && this.authService.getUserInfo().role == 'educator') {
        return true;
      } else if (this.authService.getToken()) {
        this.router.navigateByUrl('/dashboard/stats')
      } else {
        this.router.navigateByUrl('/login')
  
        return false;
      }

      if (this.authService.getToken()) {

        return true;
      } else {
        return false;
      }
}
}
  

