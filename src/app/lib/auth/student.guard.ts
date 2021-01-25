import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'


@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.getToken() && this.authService.getUserInfo().role == 'Student' ) {
      return true;
    } else if (this.authService.getToken()) {
      this.router.navigateByUrl('/student-module')
    } else {
      this.router.navigateByUrl('/student/studentLogin')

      return false;
    }

  }

}
