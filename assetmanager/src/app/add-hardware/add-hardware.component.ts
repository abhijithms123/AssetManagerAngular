import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardwareListService } from '../list-service/hardware-list.service';
import { HardwareViewList } from '../models/hardware-view-list';

@Component({
  selector: 'app-add-hardware',
  templateUrl: './add-hardware.component.html',
  styleUrls: ['./add-hardware.component.css']
})
export class AddHardwareComponent implements OnInit {
     
  formData!: FormGroup;
  inputHardwareDetails!: HardwareViewList

  ownershipStatus!: string
  manufacturingCompany!: string
  hardwareType!: string

  constructor(
    private hardwareService: HardwareListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hardwareService.getOptionValues().subscribe(
      (response) => {
        this.hardwareType = response.hardwareType
        this.manufacturingCompany = response.manufacturingCompany
        this.ownershipStatus = response.ownershipStatus
      }
    )
    this.formData = new FormGroup({
      assetNumber: new FormControl('', Validators.required),
      hardwareType: new FormControl('', Validators.required),
      manufacturingCompany: new FormControl('', Validators.required),
      modelNumber: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      modelName: new FormControl('', Validators.required),
      yearOfManufacture: new FormControl('', Validators.required),
      expressServiceCode: new FormControl('', Validators.required),
      batchNumber: new FormControl('', Validators.required),
      ownershipStatus: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      configuration: new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    if (this.formData.invalid) {
      for (const control of Object.keys(this.formData.controls)) {
        this.formData.controls[control].markAsTouched();
      }
      return;
    } else {
      this.inputHardwareDetails = this.formData.value
      this.inputHardwareDetails.enterBy = sessionStorage.getItem('name') || ""
      this.hardwareService
        .postData(this.inputHardwareDetails)
        .subscribe((response) => {
          console.log(response)
          if (response.status == 'true') {
            this.router.navigate([
              'home/admin/hardware-list'
            ]);
          } else if (response.status == 'false') {
            alert('Asset no already exist')
          }
        });
    }
  }

  navigate() {
    this.router.navigate(['home/admin/hardware-list']);
  }

  reset(){
    this.formData.reset();
  }

}
