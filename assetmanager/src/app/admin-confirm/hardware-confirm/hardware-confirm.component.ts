import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HardwareListService } from 'src/app/list-service/hardware-list.service';
import { SoftwareListService } from 'src/app/list-service/software-list.service';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-hardware-confirm',
  templateUrl: './hardware-confirm.component.html',
  styleUrls: ['./hardware-confirm.component.css']
})
export class HardwareConfirmComponent implements OnInit {
  requestId!: string;
  status!: string;
  reason!: string;
  sub!: Subscription;
  user!: string;
  assetId!: number;
  assetType!: string;
  confirm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private hardwareService: HardwareListService,
    private softwareService: SoftwareListService
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.user = this.route.snapshot.paramMap.get('user') || '';
    this.assetId = Number(this.route.snapshot.paramMap.get('assetId'));
    this.assetType = this.route.snapshot.paramMap.get('assetType') || '';
  }

  confirmApprove(id: string,assetType: string) {
    console.log(this.reason);
    this.status = "approved"
    this.reason = "asset available"
    if(assetType == "Hardware"){
    this.sub = this.requestService.updateHardwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
      alert('cancellation confirmed');
    });

    this.sub = this.hardwareService.updateHardwareAdmin(this.assetId,"Allocated").subscribe(()=>{
      alert('software availabilty updated')
    })
    this.confirm = true;
  }
    else{
      this.sub = this.requestService.updateSoftwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
        alert('approval confirmed');
      });
  
      this.sub = this.softwareService.updateSoftwareAdmin(this.assetId,"Allocated").subscribe(()=>{
        alert('software availabilty updated')
      })
     this.confirm = true;
    }
  //  this.router.navigate(['adminok-hardware',id,assetType])

  }

  goToApprove(assetType: string){
    if(assetType == "Hardware"){
    this.router.navigate(['home/admin/hardware-approved-requests'])}
    else{
      this.router.navigate(['home/admin/software-approved-requests'])
    }
  }
}
