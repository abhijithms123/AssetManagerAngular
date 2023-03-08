import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptorService } from '../authentication/auth-interceptor.service';
import { expireDataModel } from '../models/expire-model';
import { LicenseExpireService } from '../services/license-expire.service';

@Component({
  selector: 'app-license-expire-widget',
  templateUrl: './license-expire-widget.component.html',
  styleUrls: ['./license-expire-widget.component.css']
})
export class LicenseExpireWidgetComponent implements OnInit {

  constructor(private licenseExpireService:LicenseExpireService,private router:Router,private httpIntecept: AuthInterceptorService) { }
  licenseExpireData!: expireDataModel[];
  ngOnInit(): void {
    this.licenseExpireService.getExpireData().subscribe( res =>{
      this.licenseExpireData = res;
      this.setData(res)
      console.log(this.licenseExpireData);
    })

  }
  
  setData(data:expireDataModel[]){
    this.licenseExpireData = data
    // console.log(this.licenseExpireData);
  }

  doSomething(assetId:number){
    console.log("test");
    console.log(assetId);
    
    this.router.navigate(['home/admin/software-filtered-list',{assetId:assetId,assetCategory: '',allocatedOrAvailable: ''}])

    
  }

}
