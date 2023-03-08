import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareRequest } from 'src/app/models/Software-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-open-software-list',
  templateUrl: './open-software-list.component.html',
  styleUrls: ['./open-software-list.component.css']
})
export class OpenSoftwareListComponent implements OnInit {
  errorMessage="";
  openRequest!: any;
  currentPage!: number;
  openRequestList!: SoftwareRequest[];
  totalItem: any;
  totalPage: any;
  list!: SoftwareRequest[]
  userName = sessionStorage.getItem("name")
  count!: number;
  assetId!: number;

  constructor(private requestService: RequestService,
    private router: Router,

  ) {
   }

   ngOnInit(): void {
    this.getSoftwareRequests("open",0);
}

private getSoftwareRequests(requestStatus: string,pageNumber: number) {
  this.requestService.getSoftwareRequestsAdmin(requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      this.count = this.openRequest.totalItem;
      this.assetId = this.openRequest.assetId;
     
    }
    
  });
}

approve(id: string,user: string,assetId:number,assetType: string) {
  this.router.navigate(['adminconfirmapprove-hardware',id,user,assetId,assetType])

}

rejectOpenRequest(id: string){
  const assetType = "Software";
  this.router.navigate(['admin-hardware-reject-confirm',id,assetType])

}

onTableDataChange(event: number) {
  this.getSoftwareRequests("open",event - 1);
  this.currentPage = event;
}

}
