import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilteredModel } from 'src/app/models/FilteredAssetModel';
import { routerModel } from 'src/app/models/router-model';
import { ShowlistService } from 'src/app/showlist.service';

@Component({
  selector: 'app-asset-filtered-list',
  templateUrl: './asset-filtered-list.component.html',
  styleUrls: ['./asset-filtered-list.component.css']
})
export class AssetFilteredListComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private showListService: ShowlistService,
  ) { }
  dataFromRouter!: routerModel;
  assetData!: FilteredModel[];
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.dataFromRouter = {
        assetCategory: data['assetCategory'],
        allocatedOrAvailable: data['allocatedOrAvailable'],
        assetId: data['assetId'],
      };
      console.log(this.dataFromRouter);

      this.showListService
        .getAssetData(
          this.dataFromRouter.assetCategory,
          this.dataFromRouter.allocatedOrAvailable,
          this.dataFromRouter.assetId
        )
        .subscribe((res) => {
          console.log(res);

          setTimeout(() => {
            this.setAssetData(res);
          });
        });
    });

  }

  setAssetData(value: FilteredModel[]) {
    this.assetData = value;
  }
}
