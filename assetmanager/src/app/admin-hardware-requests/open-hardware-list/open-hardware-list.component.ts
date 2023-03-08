import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareRequest } from 'src/app/models/hardware-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-open-hardware-list',
  templateUrl: './open-hardware-list.component.html',
  styleUrls: ['./open-hardware-list.component.css']
})
export class OpenHardwareListComponent implements OnInit {
  errorMessage="";
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
    this.getHardwareRequests("open",0);
}

private getHardwareRequests(requestStatus: string,pageNumber: number) {
  this.requestService.getHardwareRequestsAdmin(requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      console.log(this.list);
      
      this.count = this.openRequest.totalItem;
     
    }
    
  });
}

approve(id: string,user: string,assetId:number,assetType: string) {
  this.router.navigate(['adminconfirmapprove-hardware',id,user,assetId,assetType])

}

rejectOpenRequest(id: string){
  const assetType = "Hardware";
  this.router.navigate(['admin-hardware-reject-confirm',id,assetType])
}

onTableDataChange(event: number) {
  this.getHardwareRequests("open",event - 1);
  this.currentPage = event;
}



}
