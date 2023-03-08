import { Component, OnInit } from '@angular/core';
import { HardwareRequest } from '../models/hardware-request';
import { SoftwareRequest } from '../models/Software-request';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  softwareRequestCount: any;
  hardwareRequestCount: any;
  userName = sessionStorage.getItem("name")
  openRequest!: any;
  softwarelist!: SoftwareRequest[]
  hardwarelist!: HardwareRequest[]


  constructor(private requestService: RequestService){

  }

  ngOnInit(): void {
      this.requestService.getHardwareRequestCount(this.userName).subscribe({
        next: res => {
        this.hardwareRequestCount = res 
      }
      }
        
      )

      this.requestService.getSoftwareRequestCount(this.userName).subscribe({
        next: res => {
          this.softwareRequestCount = res
        }
      })

      this.getSoftwareRequests(this.userName,"approved",0);
      this.getHardwareRequests(this.userName,"approved",0);
  }


  private getSoftwareRequests(requestStatus: string,requestedBy: string,pageNumber: number) {
    this.requestService.getSoftwareAssetRequests(requestedBy,requestStatus,pageNumber).subscribe({
      next: data => {
        this.openRequest=data
        this.softwarelist = this.openRequest.requestList;
        console.log(this.softwarelist);
        
       
      }
      
    });
  }

  private getHardwareRequests(requestStatus: string,requestedBy: string,pageNumber: number) {
    this.requestService.getHardwareAssetRequests(requestedBy,requestStatus,pageNumber).subscribe({
      next: data => {
        this.openRequest=data
        this.hardwarelist = this.openRequest.requestList;
       
      }
      
    });
  }
  
}
