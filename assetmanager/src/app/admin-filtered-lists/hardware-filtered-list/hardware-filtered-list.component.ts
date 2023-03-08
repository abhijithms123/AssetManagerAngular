import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HardwareServiceService } from 'src/app/hardware-service.service';
import { HardwareListService } from 'src/app/list-service/hardware-list.service';
import { HwFilterModel } from 'src/app/models/HwFilterModel';
import { routerModel } from 'src/app/models/router-model';

@Component({
  selector: 'app-hardware-filtered-list',
  templateUrl: './hardware-filtered-list.component.html',
  styleUrls: ['./hardware-filtered-list.component.css']
})
export class HardwareFilteredListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ShowListHardware: HardwareServiceService
  ) {}
  dataFromRouter!: routerModel;
  assetData!: HwFilterModel[];
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      
      this.dataFromRouter = {
        assetCategory: data['assetCategory'],
        allocatedOrAvailable: data['allocatedOrAvailable'],
        assetId: data['assetId'],
      };
      console.log(this.dataFromRouter);
    
     
      this.ShowListHardware
      .getHardwaresList(this.dataFromRouter.assetCategory, this.dataFromRouter.allocatedOrAvailable, 0)
      .subscribe(
        (res)=>{
          console.log(res)
          setTimeout(() => {
            this.setAssetData(res.Hardwares);
          });
        }
      )


    });
  
}

  setAssetData(value: HwFilterModel[]) {
    this.assetData = value;
  }
}
