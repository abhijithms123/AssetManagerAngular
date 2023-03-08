import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareRequest } from 'src/app/models/Software-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-approved-software-list',
  templateUrl: './approved-software-list.component.html',
  styleUrls: ['./approved-software-list.component.css']
})
export class ApprovedSoftwareListComponent implements OnInit{
  errorMessage: string="";
  openRequest!: any;
  currentPage!: number;
  openRequestList!: SoftwareRequest[];
  totalItem: any;
  totalPage: any;
  list!: SoftwareRequest[]
  userName = sessionStorage.getItem("name")
  count!: number;

  constructor(private requestService: RequestService,
    private router: Router,

  ) {
   }

     ngOnInit(): void {
    this.getSoftwareRequests("approved",0);
}

private getSoftwareRequests(requestStatus: string,pageNumber: number) {
  this.requestService.getSoftwareRequestsAdmin(requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      this.count = this.openRequest.totalItem;
     
    }
    
  });
}

onTableDataChange(event: number) {
    this.getSoftwareRequests("approved",event - 1);
    this.currentPage = event;
  }

}
