import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datastore } from './models/datastore';

@Injectable({
  providedIn: 'root'
})
export class HardwareServiceService {


  private baseURL = "http://localhost:8080";
  
  constructor(private httpClient: HttpClient) { }

  getHardwaresList(assetType: string, assignStatus: string,page:number): Observable<any>{
    const pageSize=6
    return this.httpClient.get<any>(`${this.baseURL}/hardwareDashboard/list/${assetType}/${assignStatus}/${page}/${pageSize}`);
  }

  getCounts(): Observable<Datastore[]>{
    return this.httpClient.get<Datastore[]>(`${this.baseURL}/hardwareDashboard/counts`);
  }
}
