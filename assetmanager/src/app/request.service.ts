import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareRequest } from './models/hardware-request';
import { SoftwareRequest } from './models/Software-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  private baseUrl="http://localhost:8080/requests"
  
  //api call to save the software sset request made by the user
  sendSoftwareReqobj(requestobj:SoftwareRequest):Observable<object>{
    console.log(requestobj)
    return this.http.post(`${this.baseUrl}/software/save`,requestobj);
  }

  //api call to get all open software requests
  getSoftwareAssetRequests(requestStatus: string,requestedBy: string,pageNumber:number):Observable<SoftwareRequest>{
    return this.http.get<SoftwareRequest>(`${this.baseUrl}/software/viewAll/${requestStatus}/${requestedBy}/${pageNumber}/5`)
  }

  //api call to save the hardware asset request made by the user
  sendHardwareReqobj(requestobj:HardwareRequest):Observable<object>{
    console.log(requestobj)
    return this.http.post(`${this.baseUrl}/hardware/save`,requestobj);
  }

  //api call to get all open hardware requests
  getHardwareAssetRequests(requestStatus: string,requestedBy: string,pageNumber:number):Observable<SoftwareRequest>{
    return this.http.get<SoftwareRequest>(`${this.baseUrl}/hardware/viewAll/${requestStatus}/${requestedBy}/${pageNumber}/5`)
  }

  //api call to update software request
  updateSoftwareRequest(requestStatus: string,requestId: string,reason: string):Observable<any>{
    console.log("inside update request"+ requestStatus + requestId);
    return this.http.put(`${this.baseUrl}/software/update/?status=${requestStatus}&reqId=${requestId}&reason=${reason}`,null)
    
  }

  //api call to update hardware request
  updateHardwareRequest(requestStatus: string,requestId: string,reason: string):Observable<any>{
    console.log("inside update request"+ " "+ requestStatus+ " "+ reason+ " " + requestId);
    return this.http.put(`${this.baseUrl}/hardware/update/?status=${requestStatus}&reqId=${requestId}&reason=${reason}`,null)
    
  }

  //api call to get count of hardware requests made by a user
  
  public getHardwareRequestCount(userName: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/hardware/count/${userName}`)
  }

  //api call to get count of software requests made by a user
  
  public getSoftwareRequestCount(userName: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/software/count/${userName}`)
  }

   //api call to get all open software requests for admin
   getSoftwareRequestsAdmin(requestStatus: string,pageNumber:number):Observable<SoftwareRequest>{
    return this.http.get<SoftwareRequest>(`${this.baseUrl}/software/viewAll/${requestStatus}/${pageNumber}/5`)
  }

  //api call to get all open hardware requests for admin
  getHardwareRequestsAdmin(requestStatus: string,pageNumber:number):Observable<SoftwareRequest>{
    return this.http.get<SoftwareRequest>(`${this.baseUrl}/hardware/viewAll/${requestStatus}/${pageNumber}/5`)
  }







}
