import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareRequest } from 'src/app/models/Software-request';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-open-software-request',
  templateUrl: './open-software-request.component.html',
  styleUrls: ['./open-software-request.component.css']
})
export class OpenSoftwareRequestComponent implements OnInit{
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
    this.getSoftwareRequests(this.userName,"open",0);
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

  cancel(id: string,type: string) {
    this.router.navigate(['hardwareconfirmcancel', id, type])

  }

  onTableDataChange(event: number) {
    this.getSoftwareRequests(this.userName,"open",event - 1);
    this.currentPage = event;
  }

}
