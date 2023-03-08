import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HardwareListService } from '../list-service/hardware-list.service';
import { hardwareVO } from '../models/hardwareVO';

@Component({
  selector: 'app-admin-hardware-list',
  templateUrl: './admin-hardware-list.component.html',
  styleUrls: ['./admin-hardware-list.component.css']
})
export class AdminHardwareListComponent implements OnInit {
  dataSource = new MatTableDataSource()  
  id?:string
  data!: hardwareVO[]
  arrayAsset: number[] = []
  allChecked = false
  currentPage = 0;
  searchTerm!:string;
  count!: number;

  hardwareType!: string;
  manufacturingCompany!: string;
  status!: string;
  
  formData!: FormGroup;
  editMode: boolean;
  editIndex:any;
  hardwareAsset: any;
  filterOn: boolean;
  
  constructor(private hardwareService: HardwareListService,private router: Router,public ngxSmartModalService: NgxSmartModalService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    /* fetch all software details from database
       and stored to a variable "data" */
    this.hardwareService.getBackendData(0).subscribe(
      (res) => {
          this.data = res.Hardwares;
      }
    )

    this.hardwareService.getOptionValues().subscribe(
      (response) => {
        this.hardwareType = response.hardwareType
        this.manufacturingCompany = response.manufacturingCompany
      }
    )
    this.formData = new FormGroup({

      hardwareType: new FormControl('', Validators.required),
      manufacturingCompany: new FormControl('', Validators.required),
    });

  }
  
  onSubmit(pageNumber: number){
    const hardwareType = this.formData.get('hardwareType').value
    const manufacturingCompany = this.formData.get('manufacturingCompany').value
    this.hardwareService.filterhardwares(pageNumber,hardwareType,manufacturingCompany,"Unallocated").subscribe({
     next: (res) => {
        this.data = res.Hardwares
        this.count = res.totalItems;
        this.filterOn = true;
     },
    })
    this.formData.reset;
    this.ngxSmartModalService.close('myModal');
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

  filterList = {
    hardwareType: ['Laptop', 'Monitor', 'Mouse', 'Keyboard', 'Headset'],
    manufacturingCompany: ['Dell', 'Lenovo', 'Logitech', 'Apple', 'HP', 'Asus'],
    status: ['Allocated', 'Unallocated'],
    /* here you can add as many filters as you want. */
  };


    /* function to redirect to add a new hardware page */
    clickToAddHardware(){
      this.router.navigate(["home/add-hardware"])
    }
  
    /* passing a single hardware asset for deletion */ 
    passForDelete(asset: any, event: any) {
      if (event.target.checked) {
        this.arrayAsset.push(asset.id)
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
      this.hardwareService.updateStatus(this.currentPage, this.arrayAsset).subscribe(
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
      this.hardwareService.getBackendData(this.currentPage).subscribe(
        (res) => {
            this.data = res.Hardwares;
            console.log(this.data)
        }
      )
    }
    
    /* Click to edit a hardware asset */
    editHardwareAsset(id: number){
      localStorage.setItem('id',JSON.stringify({
        number: Number(id)
      }))
      localStorage.setItem('page',JSON.stringify({
        number: Number(this.currentPage)
      }))
      this.router.navigate(["home/hardware-edit"])
    }
  
    /* Click to view full details of a particular hardware asset */
    viewParticularHardware(id: number){
      localStorage.setItem('id',JSON.stringify({
        number: Number(id)
      }))
      localStorage.setItem('page',JSON.stringify({
        number: Number(this.currentPage)
      }))
      this.router.navigate(["home/hardware-view"])
    }
  
    /* Search in hardware items */
    searchData(page:number,searchTerm:string){
  
      this.hardwareService.getSearchData(page,searchTerm).subscribe(
      (response) => {
        console.log(response);
        this.data = response.Hardwares;
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
        this.hardwareService.getBackendData(page).subscribe();
      }
      else{
        this.searchData(this.currentPage,this.searchTerm);
      }
    }

    goToOpen(){
      this.router.navigate(['home/admin/hardware-open-requests'])
    }

    goToApprove(){
      this.router.navigate(['home/admin/hardware-approved-requests'])
    }

    // function to filter hardwares by hardware type, manufacturer, status
  filterHardwares(appliedfilters: any) {
    console.log(appliedfilters);
    this.hardwareType = appliedfilters.appliedFilterValues.hardwareType;
    this.manufacturingCompany = appliedfilters.appliedFilterValues.manufacturingCompany;
    this.status = appliedfilters.appliedFilterValues.status;

    if (this.manufacturingCompany) {
      console.log(this.manufacturingCompany);
      
      this.data = this.data.filter(
        (item: hardwareVO) => item.manufacturingCompany === this.manufacturingCompany
      );
    }
    if (this.hardwareType) {
      console.log(this.hardwareType);
      
      this.data = this.data.filter(
        (item: hardwareVO) => item.hardwareType === this.hardwareType
      );
    }
    if (this.status) {
      this.data = this.data.filter(
        (item: hardwareVO) => item.status === this.status
      );
    }

  }
  

}
