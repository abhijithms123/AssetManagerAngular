import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datastore } from '../models/datastore';
import { ResponseWidget } from '../models/response-widget';
import { AssetStatusWidgetService } from '../services/asset-status-widget.service';

@Component({
  selector: 'app-asset-category-widget',
  templateUrl: './asset-category-widget.component.html',
  styleUrls: ['./asset-category-widget.component.css']
})
export class AssetCategoryWidgetComponent implements OnInit {

  dataSet! :Datastore[];
  data:ResponseWidget[] =[]
 
  constructor(
    private assetStatusWidgetService:AssetStatusWidgetService,
    private router:Router
    ) { }
  ngOnInit(): void {

    this.assetStatusWidgetService.getAssetWidgetData().subscribe(res =>{
        console.log(res);
        
        this.data = res
    })

    this.assetStatusWidgetService.getCounts().subscribe(response =>{
      console.log(response);
      
      this.dataSet = response;
    })
  }

  onClick(softwareCategory:string){
    this.router.navigate(['/dashboard/home/list',{assetId:'',assetCategory: softwareCategory,allocatedOrAvailable:'Unallocated'}])   
  }

  onClickHw(hardwareType: string){
    this.router.navigate(['/dashboard/home/hw-list',{assetId:'',assetCategory: hardwareType,allocatedOrAvailable:'Allocated'}])
  }

}
