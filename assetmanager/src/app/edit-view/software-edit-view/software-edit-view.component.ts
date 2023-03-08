import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareListService } from 'src/app/list-service/software-list.service';

@Component({
  selector: 'app-software-edit-view',
  templateUrl: './software-edit-view.component.html',
  styleUrls: ['./software-edit-view.component.css']
})
export class SoftwareEditViewComponent implements OnInit{
  id!: number
  page!: number
  data: any
  allocationPending!: number

  constructor(
    private _router: Router,
    private softwareService: SoftwareListService
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')||"{number:-1}").number;
    console.log(this.id);
    
    this.page = JSON.parse(localStorage.getItem('page')||"{number:-1}").number;
    this.softwareService.getSoftwareAsset(this.page, this.id).subscribe(
      (res) =>{
        console.log(res)
        this.data = res.Softwares
        this.allocationPending = this.data[0].purchased - this.data[0].installed
      }
    )
  }

  goBack(){
    this._router.navigate(["home/admin/software-list"])
  }

}
