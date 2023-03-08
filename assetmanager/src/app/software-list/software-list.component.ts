import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SoftwareListService } from '../list-service/software-list.service';
import { softwareVo } from '../models/softwareVO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css']
})
export class SoftwareListComponent implements OnInit {

  dataSource = new MatTableDataSource()  
  id?:string
  data!: softwareVo[]
  arrayAsset: number[] = []
  allChecked!: boolean;
  currentPage =0;
  searchTerm!:string;
  count!: number;

  editMode: boolean;
  editIndex:any;
  // formData!: FormGroup;
  manufacturingCompany!: string
  softwareCategory!: string
  filterOn: boolean;
  
  constructor(
    private softwareService: SoftwareListService,
    private router: Router,public ngxSmartModalService: NgxSmartModalService
    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    /* fetch all software details from database
       and stored to a variable "data" */
    this.softwareService.getBackendData(0).subscribe(
      (res) => {
        console.log(res)
        this.data = res.Softwares;
      }
    )

    this.softwareService.getSoftwareOptions().subscribe(
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
    this.softwareService.filtersoftwares(pageNumber,softwareCategory,manufacturingCompany,"Unallocated").subscribe({
      next: (res) => {
        this.data = res.Softwares
        this.count = res.totalItems
        this.filterOn = true
      }
    })
    this.formData.reset;
    this.ngxSmartModalService.close('myModal')
  
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
  

  clickToAddSoftware(){
    this.router.navigate(["home/add-software"])
  }

  /* passing a single software asset for deletion */ 
  passForDelete(asset: any, event: any) {
    if (event.target.checked) {
      this.arrayAsset.push(asset.id)
      console.log(asset.id);
      
    }
    else{
      this.arrayAsset.pop()
    }
  }

  /* Clicking select all checkbox for deletion */
  passFullListForDelete(event: any){
    if(event.target.checked) {
      for (let index = 0; index < this.data.length; index++) {
        this.arrayAsset.push(this.data[index].id)
        // console.log(this.data.Softwares[index].id);
      }
    }
    else{
      for (let index = 0; index < this.data.length; index++) {
        this.arrayAsset.pop()
      }
    }
  }

  /* Clicking delete button */
  clickDeleteButton() {
      this.softwareService.updateStatus(this.currentPage, this.arrayAsset).subscribe(
        (res) => {
          console.log("deleted")
          console.log(res);
          
        }
      )
      setTimeout(
        ()=>{
          this.callBackend();
        },1000
      );
  }
  
  callBackend(){
    this.arrayAsset = []
    this.softwareService.getBackendData(this.currentPage).subscribe(
      (res) => {
          this.data = res.Softwares;
      }
    )
  }

  /* Click to edit a software asset */
  editSoftwareAsset(id: number){
    localStorage.setItem('id',JSON.stringify({
      number: Number(id)
    }))
    localStorage.setItem('page',JSON.stringify({
      number: Number(this.currentPage)
    }))
    this.router.navigate(["home/software-edit"])
  }

  /* Click to view full details of a particular software asset */
  viewParticularSoftware(id: number){
    localStorage.setItem('id',JSON.stringify({
      number: Number(id)
    }))
    localStorage.setItem('page',JSON.stringify({
      number: Number(this.currentPage)
    }))
    this.router.navigate(["home/software-view"])
  }

  searchData(page:number,searchTerm:string){

    this.softwareService.getSearchData(page,searchTerm).subscribe(
    (response) => {
      console.log(response);
      this.data = response.Softwares;
      this.count = response.totalItems;
    },
    (error) => {
      console.log(error);
      
      this.data = [];
      this.count = 0;
    }
    );
  }

  onTableDataChange(event: any) {
    this.callApi(event-1)
    this.currentPage = event;
    
  }

  callApi(page:number){
    console.log(this.searchTerm);
    if(this.searchTerm==null){
      this.softwareService.getBackendData(page).subscribe( (res) => {
        console.log(res)
        this.data = res.Softwares;
      });
    }
    else{
      this.currentPage = 1;
      this.searchData(page,this.searchTerm);
    }
  }

  goToOpen(){
    this.router.navigate(['home/admin/software-open-requests'])
  }

  goToApprove(){
    this.router.navigate(['home/admin/software-approved-requests'])
  }

}