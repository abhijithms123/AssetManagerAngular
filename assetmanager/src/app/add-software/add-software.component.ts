import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SoftwareListService } from '../list-service/software-list.service';
import { AddSoftware } from '../models/software-add';


@Component({
  selector: 'app-add-software',
  templateUrl: './add-software.component.html',
  styleUrls: ['./add-software.component.css']
})
export class AddSoftwareComponent implements OnInit  {
  formData!: FormGroup;
  inputHardwareAssetDetails!: AddSoftware
  licenseType!: string
  softwareCategory!: string
  manufacturingCompany!: string

  constructor(
    private softwareService: SoftwareListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.softwareService.getSoftwareOptions().subscribe(
      (responce) => {
        this.licenseType = responce.licenseType
        this.softwareCategory = responce.softwareCategory
        this.manufacturingCompany = responce.manufacturingCompany
      }
    )
    this.formData = new FormGroup({
      assetNumber: new FormControl('', Validators.required),
      manufacturingCompany: new FormControl('', Validators.required),
      softwareCategory: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      subVersion: new FormControl('', Validators.required),
      licenseYear: new FormControl('', Validators.required),
      softwareName: new FormControl('', Validators.required),
      purchased: new FormControl('', Validators.required),
      licenseExpiryDate: new FormControl('', Validators.required),
      licenseType: new FormControl('', Validators.required),
      licenseCost: new FormControl('', Validators.required),
    });

  }


  onSubmit() {
    if (this.formData.invalid) {
      for (const control of Object.keys(this.formData.controls)) {
        this.formData.controls[control].markAsTouched();
      }
      return;
    } else {
      this.inputHardwareAssetDetails = this.formData.value
      this.inputHardwareAssetDetails.enteredBy = localStorage.getItem('name') || ""
      console.log(this.inputHardwareAssetDetails.enteredBy);
      
      this.softwareService
        .postData(this.inputHardwareAssetDetails)
        .subscribe((response) => {
          if (response.status == 'true') {
            this.router.navigate([
              'home/admin/software-list'
            ]);
          } else if (response.status == 'false') {
            alert('Asset no already exist');
          }
        });
    }
  }


  navigate() {
    this.router.navigate(['home/admin/software-list']);
  }

  reset(){
    this.formData.reset();
  }
}

