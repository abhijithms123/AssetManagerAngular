import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareRequest } from 'src/app/models/hardware-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-cancelled-hardware-request',
  templateUrl: './cancelled-hardware-request.component.html',
  styleUrls: ['./cancelled-hardware-request.component.css']
})
export class CancelledHardwareRequestComponent implements OnInit{
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
    this.getHardwareRequests(this.userName,"cancelled",0);
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


  onTableDataChange(event: number) {
    this.getHardwareRequests(this.userName,"cancelled",event - 1);
    this.currentPage = event;
  }
}
