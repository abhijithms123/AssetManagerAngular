import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareListService } from 'src/app/list-service/hardware-list.service';
import { HardwareModel } from 'src/app/models/hardware-model';

@Component({
  selector: 'app-hardware-edit-view',
  templateUrl: './hardware-edit-view.component.html',
  styleUrls: ['./hardware-edit-view.component.css']
})
export class HardwareEditViewComponent implements OnInit{
   
  id!: number
  page!: number
  data!: HardwareModel[]
  allocationPending!: number

  constructor(
    private _router: Router,
    private hardwareService: HardwareListService
  ) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id')||"{number:-1}").number;
    console.log(this.id);
    
    this.page = JSON.parse(localStorage.getItem('page')||"{number:-1}").number;
    this.hardwareService.getHardwareAsset(this.page, this.id).subscribe(
      (res) =>{
        console.log(res.Hardwares)
        this.data = res.Hardwares
      }
    )
  }

  goBack(){
    this._router.navigate(["home/admin/hardware-list"])
  }
}
