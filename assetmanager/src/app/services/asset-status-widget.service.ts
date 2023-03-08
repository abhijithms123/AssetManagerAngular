import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datastore } from '../models/datastore';
import { ResponseWidget } from '../models/response-widget';

@Injectable({
  providedIn: 'root'
})
export class AssetStatusWidgetService {

  private baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getAssetWidgetData():Observable<ResponseWidget[]>{
   return this.http.get<ResponseWidget[]>(`${this.baseUrl}/softwareDashboard/asset-status-widget`)
  }

  getCounts(): Observable<Datastore[]>{
    return this.http.get<Datastore[]>(`${this.baseUrl}/hardwareDashboard/counts`);
  }
}
