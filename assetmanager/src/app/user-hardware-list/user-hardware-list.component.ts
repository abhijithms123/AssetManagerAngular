import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HardwareListService } from '../list-service/hardware-list.service';
import { HardwareAsset } from '../models/hardware-asset';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HardwareViewList } from '../models/hardware-view-list';

@Component({
  selector: 'app-user-hardware-list',
  templateUrl: './user-hardware-list.component.html',
  styleUrls: ['./user-hardware-list.component.css']
})
export class UserHardwareListComponent implements OnInit {
  errorMessage: any;
  hardwareAvaliableList!: HardwareAsset[]
  currentPage!: number;
  totalItem: any;
  totalPage: any;
  list!: HardwareAsset[];
  count!: number;

  searchTerm!:HardwareAsset[];
  request: Request[]=[];

  assetDetails!: HardwareAsset[];
  hardwareAsset: any;

  private _searchResult='';
  editMode: boolean;
  editIndex:any;
  form : NgForm;
  manufacturingCompany!: string
  hardwareType!: string
  inputHardwareDetails!: HardwareViewList
  filterOn: boolean;

  get searchResult(){
    return this._searchResult
  }
   set searchResult(value:string){
    this._searchResult=value;
    this.search(value);
 
   }
   
  constructor(private assetservice: HardwareListService,private router: Router,public ngxSmartModalService: NgxSmartModalService){

  }

  ngOnInit(): void {
    this.getHardwares(0);
    //get the options for filtering
    this.assetservice.getOptionValues().subscribe(
      (response) => {
        this.hardwareType = response.hardwareType
        this.manufacturingCompany = response.manufacturingCompany
      }
    )
  }
  
 formData = new FormGroup({

    hardwareType: new FormControl('', Validators.required),
    manufacturingCompany: new FormControl('', Validators.required),
  });
  
  
  onSubmit(pageNumber: number){
  const hardwareType = this.formData.get('hardwareType').value
  const manufacturingCompany = this.formData.get('manufacturingCompany').value
  this.assetservice.filterhardwares(pageNumber,hardwareType,manufacturingCompany,"Unallocated").subscribe({
   next: (res) => {
      this.hardwareAsset = res
      this.list = this.hardwareAsset.Hardwares
      this.count = this.hardwareAsset.totalItems;
      this.filterOn = true;
   },
  })
  this.formData.reset;
  this.ngxSmartModalService.close('myModal');
}

  private getHardwares(pageNumber: number){
    this.assetservice.getHardwareList(pageNumber).subscribe({
      next: data => {
        this.hardwareAsset = data
        console.log(this.hardwareAsset.hardwareAvaliableList);
        
        this.list = this.hardwareAsset.hardwareAvaliableList;
        this.count = this.hardwareAsset.totalItem;
        console.log(this.list.length);
        
      }
    })
  }

  openPopUp(){
    // this.matDialog.open(FilterPopupComponent)
    this.editMode = true;
    this.ngxSmartModalService.open('myModal');
  }

  closeModal(id:string){
    // this.form.reset();
   this.editMode=false;
   this.ngxSmartModalService.close(id);
 }

  raise(id: number,assetType: string) {
    this.router.navigate(['hardwareconfirmopen', id, assetType])

  }

  private search(_searchResult:string){
    if(_searchResult == ""){
      this.getHardwares(0)
    }
    else{
    this.assetservice.getSearchByHardware(this.searchResult).subscribe({
      next:data=>{
    this.list=data;
      }
      })}
  }

  onTableDataChange(event: number) {
    if(this.filterOn){
      this.onSubmit(event -1);
      this.currentPage = event;
    }
    else{
    this.getHardwares(event - 1);
    this.currentPage = event;
    }
  }

  goToOpen() {
    this.router.navigate(['home/user/hardware-open-requests'])
    }

goTocancel(){
  this.router.navigate(['home/user/hardware-cancel-requests'])
}
goToapprove(){
  this.router.navigate(['home/user/hardware-approve-requests'])
}
goTorelease(){
  this.router.navigate(['home/user/hardware-release-requests'])
}

}
