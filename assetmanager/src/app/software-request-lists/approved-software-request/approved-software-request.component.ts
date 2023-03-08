import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareRequest } from 'src/app/models/Software-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-approved-software-request',
  templateUrl: './approved-software-request.component.html',
  styleUrls: ['./approved-software-request.component.css']
})
export class ApprovedSoftwareRequestComponent implements OnInit {
  errorMessage="";
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
    this.getSoftwareRequests(this.userName,"approved",0);
}

private getSoftwareRequests(requestStatus: string,requestedBy: string,pageNumber: number) {
  this.requestService.getSoftwareAssetRequests(requestedBy,requestStatus,pageNumber).subscribe({
    next: data => {
      this.openRequest=data
      this.list = this.openRequest.requestList;
      this.count = this.openRequest.totalItem;
     
    }
    
  });
}

  release(id: string,type: string) {
    this.router.navigate(['hardwareconfirmrelease', id,type])

  }

  onTableDataChange(event: number) {
    this.getSoftwareRequests(this.userName,"approved",event - 1);
    this.currentPage = event;
  }

}
