import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-hardware-cancel-confirm',
  templateUrl: './hardware-cancel-confirm.component.html',
  styleUrls: ['./hardware-cancel-confirm.component.css']
})
export class HardwareCancelConfirmComponent implements OnInit{
  requestId!: string;
  status!: string;
  reason!: string;
  sub!: Subscription;
  type!: string
  confirm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.type = this.route.snapshot.paramMap.get('type') || '';
  }
  
  confirmCancel(id: string,type: string) {
    console.log(this.reason);
    this.status = "cancelled"
    if(type=="Hardware"){
      this.sub = this.requestService.updateHardwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
        // this.router.navigate(['hardwarecancelOk',id,type])

      });
      this.confirm = true;
     
    }

    else{
      this.sub = this.requestService.updateSoftwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
        // this.router.navigate(['hardwarecancelOk',id,type])
      });
     this.confirm = true;
    }
    

  }

  goToOpenReq(type:string){
    console.log("inside function");
    
     if(type=="Hardware"){
      console.log("inside condition");
      
      this.router.navigate(['home/user/hardware-open-requests'])
     }
     else{
      this.router.navigate(['home/user/software-open-requests'])
     }
  }

  openCancelled(type: string) {
    if (type == 'Hardware') {
      this.router.navigate(['home/user/hardware-cancel-requests']);
    } else {
      this.router.navigate(['home/user/software-cancel-requests']);
    }
  }

}
