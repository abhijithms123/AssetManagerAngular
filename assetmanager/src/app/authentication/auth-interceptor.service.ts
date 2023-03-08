import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  tokenStr:string = 'Bearer ' + sessionStorage.getItem('token');
  constructor(private loginService:LoginService,private router: Router) {
    
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

      console.log("hai");
      
      if (req.url == 'http://localhost:8080/api/v1/auth/authenticate') {
        console.log('inside interceptor' + this.tokenStr);
        console.log(sessionStorage.getItem('token') + 'inside the interceptor');
  
        return next.handle(req);
      }
      const modifiedReq = req.clone({
        
        headers: req.headers.append('Authorization',"Bearer "+this.loginService.getToken()),
      });
  
      return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            // Redirect user to login page or refresh access token
            alert("your seesion has been expired!")
            this.router.navigate(['']);
            sessionStorage.clear()
          }
          return throwError(() => new Error('something went wrong'));
        })
      );
     
          
    // if (req.url == 'http://localhost:8080/api/v1/auth/authenticate') {
  }

}

