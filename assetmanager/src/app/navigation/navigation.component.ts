import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../authentication/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private authService: LoginService) {}

  ngOnInit(): void {
    //
  }

  logout() {
    if (confirm('Do you want to logout?')) {
      this.authService.logout().subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']);
          sessionStorage.clear();
        },
      });
    }
  }

  goToUserDash() {
    this.router.navigate(['home/user/dashboard']);
  }

  goToAdminDash() {
    this.router.navigate(['home/admin/dashboard']);
  }

  goToUserAssets() {
    this.router.navigate(['home/user/hardware-list']);
  }

  goToAdminAssets() {
    this.router.navigate(['home/admin/hardware-list']);
  }
}
