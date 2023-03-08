import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HardwareListService } from '../list-service/hardware-list.service';
import { HardwareAsset } from '../models/hardware-asset';
import { HardwareRequest } from '../models/hardware-request';
import { RequestService } from '../request.service';
import { SoftwareRequest } from '../models/Software-request';
import { SoftwareAsset } from '../models/softwareAsset';
import { SoftwareListService } from '../list-service/software-list.service';
@Component({
  selector: 'app-confirm-hardware-request',
  templateUrl: './confirm-hardware-request.component.html',
  styleUrls: ['./confirm-hardware-request.component.css']
})
export class ConfirmHardwareRequestComponent implements OnInit{

  errorMessage = ""
  requestobj: HardwareRequest = new HardwareRequest();
  softRequestobj: SoftwareRequest = new SoftwareRequest();

  asset!: HardwareAsset;
  softwareAsset!: SoftwareAsset;
  assetType!: string;
  confirm = false;
  

  
  reqId!: string;

  newId!: number;

  sub!: Subscription;

 constructor( private router: ActivatedRoute,
  private route: Router,private hardwareService: HardwareListService,
  private softwareService: SoftwareListService,
  private requestService: RequestService){

 }

 ngOnInit(): void {

  const id = this.router.snapshot.paramMap.get("id")
  this.assetType = this.router.snapshot.paramMap.get("assetType")
   this.newId = parseInt(id || '')
  console.log(id);
  if(this.assetType=="Hardware"){
    this.hardwareService.getHardwareById(this.newId).subscribe({
      next: asset => { this.asset = asset },
  
      error: err => this.errorMessage = err
  
  
    })
  }
  else{

    this.softwareService.getSoftwareById(this.newId).subscribe({
      next: asset => { this.softwareAsset = asset },

      error: err => this.errorMessage = err


    })
  }
  


}

ok(){
  this.reqId = "REQSOFT" + this.newId + uuidv4()
  this.requestobj.requestId = this.reqId;
  this.requestobj.requestedBy= sessionStorage.getItem("name")
  this.requestobj.requestedDate = new Date();
  this.requestobj.requestStatus = 'open';
  this.requestobj.hardwareType = this.asset.hardwareType;
  this.requestobj.modelName = this.asset.modelName
  this.requestobj.configuration = this.asset.configuration
  this.requestobj.reason = "not now"
  this.requestobj.manufacturingCompany = this.asset.manufacturingCompany
  this.requestobj.assetId = this.asset.id;
   

  console.log(this.reqId);
  this.sub = this.requestService.sendHardwareReqobj(this.requestobj).subscribe(() => {
    // this.route.navigate(['hardwareopenOk',this.reqId,this.assetType])
  })
  this.confirm = true
}

softwareOk() {
  this.reqId = "REQSOFT" + this.newId + uuidv4()
  this.softRequestobj.requestedBy= sessionStorage.getItem("name")
  this.softRequestobj.requestId = this.reqId;
  this.softRequestobj.requestedDate = new Date();
  this.softRequestobj.requestStatus = 'open';
  this.softRequestobj.softwareName = this.softwareAsset.softwareName;
  this.softRequestobj.softwareCategory = this.softwareAsset.softwareCategory
  this.softRequestobj.reason = "not now"
  this.softRequestobj.manufacturingCompany = this.softwareAsset.manufacturingCompany
  this.softRequestobj.assetId = this.softwareAsset.id

  console.log(this.reqId);
  this.sub = this.requestService.sendSoftwareReqobj(this.softRequestobj).subscribe(() => {
    // this.route.navigate(['hardwareopenOk',this.reqId,this.assetType])
  })
 this.confirm = true;
  
}

softCancel(){
  this.route.navigate([`home/user/software-list`])
}

hardCancel(){
  this.route.navigate([`home/user/hardware-list`])
}

confirmopenrequest(){
  if(this.assetType=="Hardware"){
    this.route.navigate(['/home/user/hardware-open-requests'])
    // alert("Open request send")
  }
  else{
    this.route.navigate(['/home/user/software-open-requests'])
    // alert("Open request send")
  }
 
   }

}
