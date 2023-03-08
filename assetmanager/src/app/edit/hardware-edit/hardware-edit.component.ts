import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardwareListService } from 'src/app/list-service/hardware-list.service';


@Component({
  selector: 'app-hardware-edit',
  templateUrl: './hardware-edit.component.html',
  styleUrls: ['./hardware-edit.component.css']
})
export class HardwareEditComponent implements OnInit{
   
  id1 = 0
  page!: number;
  currentInstalledValue!: number
  currentPurchacedValue!: number

  editHardware!: FormGroup

  constructor(
    private hardwareService : HardwareListService,
    private _router: Router
    ) {}

    ngOnInit(): void {
      // input from the form is taken
      this.editHardware = new FormGroup({
        expressServiceCode : new FormControl('',Validators.required),
        batchNumber : new FormControl('',Validators.required),
        ownershipStatus : new FormControl('',Validators.required),
        assetNumber : new FormControl('',Validators.required),
        code : new FormControl('',Validators.required),
        configuration : new FormControl('',Validators.required)
      })
      this.id1 = JSON.parse(localStorage.getItem('id')||"{number:-1}").number;
      this.page = JSON.parse(localStorage.getItem('page')||"{number:-1}").number;
  
      this.getDataByid(this.page, this.id1)
    }
  
    /* patching previous data from the server */
    getDataByid(page:number, id : number){
      this.hardwareService.getHardwareAsset(page, id).subscribe(
        (res) => {
          
          this.editHardware.patchValue({
            expressServiceCode:res.Hardwares[0].expressServiceCode,
            batchNumber: res.Hardwares[0].batchNumber,
            ownershipStatus: res.Hardwares[0].ownershipStatus,
            assetNumber: res.Hardwares[0].assetNumber,
            code: res.Hardwares[0].code,
            configuration: res.Hardwares[0].configuration
          })
        }
      )
    }
    
    onSubmit(){
     
        const data = this.editHardware.value
        this.hardwareService.putBackendData(data,this.id1).subscribe(
          (res) => {
            console.log(res)
          }
        )
        this._router.navigate(["home/admin/hardware-list"])
    }
  
    goBack(){
      this._router.navigate(["home/admin/hardware-list"])
    }
  
    clearFields(){
      this.editHardware.reset();
    }
}
