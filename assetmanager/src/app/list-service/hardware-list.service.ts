import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareAsset } from '../models/hardware-asset';

@Injectable({
  providedIn: 'root'
})
export class HardwareListService {

  
  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080";

  /* Get method to fetch details of all the software assets */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public getBackendData(page: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/hardware/all?page=${page}&size=6`);
  }

  /* Get method to fetch details of a particular software */
  public getHardwareAsset(page: number, id : number): Observable<any>{
    return this.http.get(`${this.baseUrl}/hardware/find?page=${page}&size=10&hardwareId=${id}`);
  }

  /* Put method to update some features of a particular software asset */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public putBackendData(softwareAsset: any, id: number): Observable<Object>{
    return this.http.put(`${this.baseUrl}/hardware/update?hardwareId=${id}` ,softwareAsset);
  }

  /* Get method to change the property of status of a software asset to inactive */ 
  // eslint-disable-next-line @typescript-eslint/ban-types
  public updateStatus(page: number, id: number[]): Observable<Object>{
    return this.http.put(`${this.baseUrl}/hardware/update/status`, id)
  }

  /* Search software assets */
  getSearchData(page:number,searchTerm:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/hardware/search?page=${page}&size=6&searchTerm=${searchTerm}`);
  }

  postData(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/hardware`,data);
  }
  
  //filter the hardwares based on hardwareType and Manufacturer
  filterhardwares(page: number, hardwareType: string, manufacturer: string, status: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/hardware/filter?page=${page}&size=6&hardwareType=${hardwareType}&manufacturer=${manufacturer}&assignStatus=${status}`)
  }

  /* get values for dropdown values */
  getOptionValues(): Observable<any>{
    return this.http.get(`${this.baseUrl}/options/hardwareFields`);
  }

   //get the list of all avilable hardware for user using asset id;
   getHardwareList(pageNumber:number):Observable<HardwareAsset>{
    return this.http.get<HardwareAsset>(`${this.baseUrl}/hardware/user/viewAll/${pageNumber}/5`)
  }

  //get the details of a single software asset for user using asset id.
  getHardwareById(id:number):Observable<HardwareAsset>{
    return this.http.get<HardwareAsset>(`${this.baseUrl}/hardware/id/${id}`)
}

//api call to update the status of a hardware asset for admin
updateHardwareAdmin(id:number,status: string): Observable<any>{
  return this.http.put(`${this.baseUrl}/hardware/update/${id}/${status}`,null)
}

//to search available software for user
getSearchByHardware(searchTerm:string):Observable<HardwareAsset[]>{
  return this.http.get<HardwareAsset[]>(`${this.baseUrl}/hardware/usersearch/${searchTerm}`);

}
 
}
