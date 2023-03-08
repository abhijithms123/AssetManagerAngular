import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-hardware-reject-confirm',
  templateUrl: './hardware-reject-confirm.component.html',
  styleUrls: ['./hardware-reject-confirm.component.css']
})
export class HardwareRejectConfirmComponent implements OnInit {

  requestId!: string;
  status!: string;
  reason!: string;
  sub!: Subscription;
  assetType!: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.assetType = this.route.snapshot.paramMap.get('assetType') || '';
  }

  confirmReject(id: string,assetType: string) {
    console.log(this.reason);
    this.status = "rejected"
    if(assetType == "Hardware"){
    this.sub = this.requestService.updateHardwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
      alert('rejection confirmed');
    });
   this.router.navigate(['home/admin/hardware-open-requests'])}
   else{
    this.sub = this.requestService.updateSoftwareRequest(this.status,this.requestId,this.reason).subscribe(() => {
      alert('rejection confirmed');
    });
   this.router.navigate(['home/admin/software-open-requests'])
   }

  }

  goToOpen(assetType: string){
    if(assetType == "Hardware"){
    this.router.navigate(['home/admin/hardware-open-requests'])
  }
  else{
    this.router.navigate(['home/admin/software-open-requests'])
  }
}

}
