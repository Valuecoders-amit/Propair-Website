import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let updatedRequest;
      if( this.authService.getToken() ) {
        updatedRequest   = request.clone({
              headers: request.headers.set('Authorization', this.authService.getToken())
          });
      } else {
        updatedRequest   = request.clone(); 
      }

    return next.handle(updatedRequest).pipe(
        tap(
          event => {
          },
          error => {
          }
        )
      );
  }
}