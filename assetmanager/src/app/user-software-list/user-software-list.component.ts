import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareListService } from '../list-service/software-list.service';
import { SoftwareAsset } from '../models/softwareAsset';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-software-list',
  templateUrl: './user-software-list.component.html',
  styleUrls: ['./user-software-list.component.css']
})
export class UserSoftwareListComponent implements OnInit{

  errorMessage: any;
  softwareAvailiableList!: SoftwareAsset[];
  currentPage!: number;
  totalItem: any;
  totalPage: any;
  list!: SoftwareAsset[];
  count!: number;

  searchTerm!:SoftwareAsset[];
  request: Request[]=[];

  assetDetails!: SoftwareAsset[];
  softwareasset: any;

  private _searchResult='';
  editMode: boolean;
  editIndex:any;
  form : NgForm;
  // formData!: FormGroup;
  manufacturingCompany!: string
  softwareCategory!: string
  filterOn: boolean;

  get searchResult(){
    return this._searchResult
  }
   set searchResult(value:string){
    this._searchResult=value;
    this.search(value);
 
   }
  
  
  
  constructor(private assetservice: SoftwareListService,
    private router: Router,public ngxSmartModalService: NgxSmartModalService

  ) {
   }

   ngOnInit(): void {
    this.getSoftwares(0);
    this.assetservice.getSoftwareOptions().subscribe(
      (response) => {
         this.softwareCategory = response.softwareCategory
         this.manufacturingCompany = response.manufacturingCompany
      }
    )
}

formData = new FormGroup({

  softwareCategory: new FormControl('', Validators.required),
  manufacturingCompany: new FormControl('', Validators.required),
});

onSubmit(pageNumber: number){
  const softwareCategory = this.formData.get('softwareCategory').value
  const manufacturingCompany = this.formData.get('manufacturingCompany').value
  this.assetservice.filtersoftwares(pageNumber,softwareCategory,manufacturingCompany,"Unallocated").subscribe({
    next: (res) => {
      this.softwareasset = res
      this.list = this.softwareasset.Softwares
      this.count = this.softwareasset.totalItems
      this.filterOn = true
    }
  })
  this.formData.reset;
  this.ngxSmartModalService.close('myModal')

}


   private getSoftwares(pageNumber: number) {
    this.assetservice.getSoftwareList(pageNumber).subscribe({
      next: data => {
        this.softwareasset=data
     
        
        this.list = this.softwareasset.softwareAvaliableList;
        this.count = this.softwareasset.totalItem;
       
      }
      
    });
  }

  openPopUp(){
    this.editMode = true;
    this.ngxSmartModalService.open('myModal');

  }
  closeModal(id:string){
    // this.form.reset();
   this.editMode=false;
   this.ngxSmartModalService.close(id);
 }

// @Output() public childEvent = new EventEmitter()

//  childClicked(){
//   console.log("button clicked");
  
//   this.childEvent.emit();
//   console.log("inside emitter");
  
// }
  raise(id: number,assetType: string) {
    this.router.navigate(['hardwareconfirmopen', id, assetType])

  }

  private search(_searchResult:string){
    this.assetservice.getSearchBySoftware(this.searchResult).subscribe({
      next:data=>{
    this.list=data;
      }
      })
  }

  onTableDataChange(event: number) {
    if(this.filterOn){
      this.onSubmit(event -1);
      this.currentPage = event;
    }
    this.getSoftwares(event - 1);
    this.currentPage = event;
  }

  goToOpen() {
    this.router.navigate(['home/user/software-open-requests'])
    }

goToCancel(){
  this.router.navigate(['home/user/software-cancel-requests'])
}
goToApprove(){
  this.router.navigate(['home/user/software-approve-requests'])
}
goToRelease(){
  this.router.navigate(['home/user/software-release-requests'])
}
}
