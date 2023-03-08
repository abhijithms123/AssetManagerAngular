import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareRequest } from 'src/app/models/hardware-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-open-hardware-request',
  templateUrl: './open-hardware-request.component.html',
  styleUrls: ['./open-hardware-request.component.css']
})
export class OpenHardwareRequestComponent implements OnInit {
  errorMessage: string="";
  openRequest!: any;
  currentPage!: number;
  openRequestList!: HardwareRequest[];
  totalItem: any;
  totalPage: any;
  list!: HardwareRequest[]
  userName = sessionStorage.getItem("name")
  count!: number;

  constructor(private requestService: RequestService,
    private router: Router) {
   }

   ngOnInit(): void {
    this.getHardwareRequests(this.userName,"open",0);
}


   private getHardwareRequests(requestStatus: string,requestedBy: string,pageNumber: number) {
    this.requestService.getHardwareAssetRequests(requestedBy,requestStatus,pageNumber).subscribe({
      next: data => {
        this.openRequest=data
        this.list = this.openRequest.requestList;
        console.log(this.list);
        
        this.count = this.openRequest.totalItem;
       
      }
      
    });
  }

  cancel(id: string,type: string) {
    this.router.navigate(['hardwareconfirmcancel', id, type])

  }

  onTableDataChange(event: number) {
    this.getHardwareRequests(this.userName,"open",event - 1);
    this.currentPage = event;
  }



}
