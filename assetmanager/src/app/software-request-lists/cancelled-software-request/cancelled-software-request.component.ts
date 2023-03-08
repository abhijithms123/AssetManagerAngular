import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareRequest } from 'src/app/models/Software-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-cancelled-software-request',
  templateUrl: './cancelled-software-request.component.html',
  styleUrls: ['./cancelled-software-request.component.css']
})
export class CancelledSoftwareRequestComponent {
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
    this.getSoftwareRequests(this.userName,"cancelled",0);
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


  onTableDataChange(event: number) {
    this.getSoftwareRequests(this.userName,"cancelled",event - 1);
    this.currentPage = event;
  }

}
