import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareRequest } from 'src/app/models/hardware-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-approved-hardware-list',
  templateUrl: './approved-hardware-list.component.html',
  styleUrls: ['./approved-hardware-list.component.css']
})
export class ApprovedHardwareListComponent implements OnInit {
  errorMessage="";
  openRequest!: any;
  currentPage!: number;
  openRequestList!: HardwareRequest[];
  totalItem: any;
  totalPage: any;
  list!: HardwareRequest[]
  userName = sessionStorage.getItem("name")
  count!: number;
  assetType!: string;

  constructor(private requestService: RequestService,
    private router: Router,

  ) {
   }

   ngOnInit(): void {
    this.getHardwareRequests("approved",0);

}
private getHardwareRequests(requestStatus: string,pageNumber: number) {
  this.requestService.getHardwareRequestsAdmin(requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      this.count = this.openRequest.totalItem;
     
    }
    
  });
}

onTableDataChange(event: number) {
  this.getHardwareRequests("approved",event - 1);
  this.currentPage = event;
}
}
