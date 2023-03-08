import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareRequest } from 'src/app/models/hardware-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-approved-hardware-request',
  templateUrl: './approved-hardware-request.component.html',
  styleUrls: ['./approved-hardware-request.component.css']
})
export class ApprovedHardwareRequestComponent implements OnInit {
  errorMessage="";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openRequest!: any;
  currentPage!: number;
  openRequestList!: HardwareRequest[];
  totalItem: number;
  totalPage: number;
  list!: HardwareRequest[]
  userName = sessionStorage.getItem("name")
  count!: number;

  

  constructor(private requestService: RequestService,
    private router: Router,

  ) {
   }

   ngOnInit(): void {
    this.getHardwareRequests(this.userName,"approved",0);
}

private getHardwareRequests(requestStatus: string,requestedBy: string,pageNumber: number) {
  this.requestService.getHardwareAssetRequests(requestedBy,requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      this.count = this.openRequest.totalItem;
     
    }
    
  });
}

  release(id: string,type: string) {
    this.router.navigate(['hardwareconfirmrelease',id, type])

  }

  onTableDataChange(event: number) {
    this.getHardwareRequests(this.userName,"approved",event - 1);
    this.currentPage = event;
  }


}
