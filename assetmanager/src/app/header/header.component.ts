import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../authentication/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   dateTime!: Date;
   hrs: any;
   greet!: string;
   

   userName!: string | null;
   role!: string | null;
   imageUrl!: string | null;
   
   dropdown = ['Dashboard', 'Hardware', 'Software'];

   roleAs: string

  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {
    this.userName =sessionStorage.getItem('name');
    this.role =sessionStorage.getItem('role');
    this.imageUrl =sessionStorage.getItem('imageUrl');

    this.greetPerson(new Date());
    setInterval(() => {
      const date = new Date();
      this.greetPerson(date);
    }, 60000);
     
    this.roleAs = sessionStorage.getItem('role').toLowerCase()
    console.log(this.roleAs);
    

  }

  greetPerson(date: any) {
    this.dateTime = date;
    this.hrs = this.dateTime.getHours();
    if (this.hrs < 12) this.greet = 'Good Morning,';
    else if (this.hrs >= 12 && this.hrs <= 17) this.greet = 'Good Afternoon,';
    else if (this.hrs >= 17 && this.hrs <= 24) this.greet = 'Good Evening,';
  }

  navigateTo(target:any) {

    switch(target.value){
      case "Software" : this.router.navigate([`home/${this.roleAs}/software-list`]);
                        break;
      case "Dashboard": this.router.navigate([`home/${this.roleAs}/dashboard`])
                        break;
      case "Hardware" : this.router.navigate([`home/${this.roleAs}/hardware-list`]);
                        break;
      default : break;
    }
  }

}
