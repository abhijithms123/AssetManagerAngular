import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SoftwareListService } from 'src/app/list-service/software-list.service';

@Component({
  selector: 'app-software-edit',
  templateUrl: './software-edit.component.html',
  styleUrls: ['./software-edit.component.css']
})
export class SoftwareEditComponent implements OnInit{
   
  id1 = 0
  page!: number;
  currentInstalledValue!: number
  currentPurchacedValue!: number
  showError = ""

  editSoftware!: FormGroup
  
  constructor(
    private softwareService : SoftwareListService,
    private _router: Router
    ) {}

    ngOnInit(): void {
      this.showError = ""
      // input from the form is taken
      this.editSoftware = new FormGroup({
          subVersion : new FormControl('',Validators.required),
          softwareCategory : new FormControl('',Validators.required),
          licenceType : new FormControl('',Validators.required),
          softwareName : new FormControl('',Validators.required),
          purchased : new FormControl('',Validators.required),
          installed : new FormControl('',Validators.required)
      })
      this.id1 = JSON.parse(localStorage.getItem('id')||"{number:-1}").number;
      this.page = JSON.parse(localStorage.getItem('page')||"{number:-1}").number;
  
      this.getDataByid(this.page, this.id1)
    }
  
  
    getDataByid(page:number, id : number){
      this.softwareService.getSoftwareAsset(page, id).subscribe(
        (res) => { 
          this.editSoftware.patchValue({
            subVersion: res.Softwares[0].subVersion,
            softwareCategory: res.Softwares[0].softwareCategory,
            licenceType: res.Softwares[0].licenseType,
            softwareName: res.Softwares[0].softwareName,
            purchased: res.Softwares[0].purchased,
            installed: res.Softwares[0].installed
          })
          
          this.currentInstalledValue = res.Softwares[0].installed
          this.currentPurchacedValue = res.Softwares[0].purchaced
        }
      )
    }
    
    onSubmit(){
     
      if (this.currentPurchacedValue > this.editSoftware.value.purchaced && this.currentPurchacedValue != this.editSoftware.value.purchaced){
        this.showError = "value of installed should be greater than current value"
      }
      else if(this.editSoftware.value.installed > this.editSoftware.value.purchased){
        this.showError = "Installed value is greater than purchaced value"
      }
  
      else{
        const data = this.editSoftware.value
        this.softwareService.putBackendData(data,this.id1).subscribe(
          (res) => {
            console.log("updated")
          }
        )
        this._router.navigate(["home/admin/software-list"])
        this.showError = ""
      }
    }
  
    goBack(){
      this._router.navigate(["home/admin/software-list"])
    }
  
    clearFields(){
      this.editSoftware.reset();
    }
    
}
