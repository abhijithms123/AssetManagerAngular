import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';
  userRole!: string
  clearTokenTimer!: any;
  constructor(
    private http: HttpClient,private router: Router
  ) { }

  isAuthenticated(){
    return sessionStorage.getItem("authenticated")
  }

  getToken(){
    return sessionStorage.getItem("token")
  }

  loginUser(user: any): Observable<object> {
    console.log(user.username + " this is the user passed to the loginuser method in loginService");
    
    return this.http.post(`${this.baseUrl}/authenticate`, user);
}
getRole(){
   this.userRole = sessionStorage.getItem('role');
  console.log(this.userRole);
  return this.userRole
}

hasRole(role: string): boolean{
  console.log(this.userRole === role);
  return (this.userRole === role)
  
  
  
}


autoLogout(expirationDate: number) {
  console.log(expirationDate)
  this.clearTokenTimer = setTimeout(() => {
  alert("your session has expired! you will be redirected to the login page")
    this.logout();
    this.router.navigate([""])
    sessionStorage.clear()
  }, expirationDate);
}

logout() : Observable<unknown>{
  
  return this.http.post(`${this.baseUrl}/app/logout`,null)
 
}

}
