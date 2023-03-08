import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../authentication/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  roleAs: string

  constructor(private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {

    if(this.loginService.isAuthenticated()){
      console.log(this.loginService.isAuthenticated());
      
       this.router.navigate(['home'])
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    console.log(this.loginForm.value);
    
  }

  loginUser() {
    this.loginService.loginUser(this.loginForm.value).subscribe(
       { next: res =>{
        console.log(this.loginForm.value);
        
        console.log("this is the reponse from login: "+ res);
        sessionStorage.setItem('name', JSON.parse(JSON.stringify(res)).username)
        sessionStorage.setItem('role', JSON.parse(JSON.stringify(res)).role)
        sessionStorage.setItem('authenticated','true');
        sessionStorage.setItem('userId' , (JSON.parse(JSON.stringify(res)).userId))
        sessionStorage.setItem('imageUrl' , JSON.parse(JSON.stringify(res)).imageUrl)
        sessionStorage.setItem('token' , JSON.parse(JSON.stringify(res)).token)
        console.log(sessionStorage.getItem('token'));
        this.roleAs = sessionStorage.getItem('role').toLowerCase()
        const date = new Date().getTime();
        const expirationDate = new Date(JSON.parse(JSON.stringify(res)).expiration).getTime();
        // this.loginService.autoLogout(expirationDate - date);
        
        this.router.navigate([`home/${this.roleAs}/dashboard`])
      }
      // ,
      // error: error =>{
      //   console.log(error);
      //   // sessionStorage.clear();
      //   this.router.navigate([''])
        
      // }
       }
    )
  }

}
