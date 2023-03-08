import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-hardware-release-confirm',
  templateUrl: './hardware-release-confirm.component.html',
  styleUrls: ['./hardware-release-confirm.component.css']
})
export class HardwareReleaseConfirmComponent implements OnInit {
  requestId!: string;
  status!: string;
  reason!: string;
  sub!: Subscription;
  type!: string;
  confirm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.type = this.route.snapshot.paramMap.get('type') || ''
    console.log(this.requestId);
    
  }

  confirmRelease(id: string,type:string) {
    if(type=="Hardware"){
      console.log(this.reason + " " + "inside confirmrelease");
      this.status = "released"
      this.sub = this.requestService.updateHardwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
        alert('release confirmed');
      });
    //  this.router.navigate(['hardwarereleaseOk',id,type])
    this.confirm = true;

    }

    else{
      console.log(this.reason + " " + "inside confirmrelease");
      this.status = "released"
      this.sub = this.requestService.updateSoftwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
        alert('release confirmed');
      });
    //  this.router.navigate(['hardwarereleaseOk',id,type])
    this.confirm = true;
  
    }
   

  }

  openReleased(type:string){
    if(type=="hardware"){
      this.router.navigate(['home/user/hardware-release-requests'])
    }
    else{
      this.router.navigate(['home/user/software-release-requests'])
    }

  }

}
