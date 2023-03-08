import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilteredModel } from './models/FilteredAssetModel';

@Injectable({
  providedIn: 'root'
})
export class ShowlistService {
   
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getAssetData(softwareCategory:string,status:string,assetId:string) : Observable<FilteredModel[]> {
 console.log(assetId);
 
    if(assetId === ''){
      console.log(assetId);
      
      console.log("111");
      
      return this.http.get<FilteredModel[]>(`${this.baseUrl}/softwareDashboard/asset/${softwareCategory}/${status}`);
    }
    else{
      console.log(assetId);
      console.log("222");
      
      return this.http.get<FilteredModel[]>(`${this.baseUrl}/softwareDashboard/assetId/${assetId}`);
    }
  }

}
