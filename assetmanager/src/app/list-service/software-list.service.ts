import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoftwareAsset } from '../models/softwareAsset';

@Injectable({
  providedIn: 'root'
})
export class SoftwareListService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080";

  /* Get method to fetch details of all the software assets */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public getBackendData(page: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/software?page=${page}&size=6`);
  }

  /* Get method to fetch details of a particular software */
  public getSoftwareAsset(page: number, id : number): Observable<any>{
    return this.http.get(`${this.baseUrl}/software/find?page=${page}&size=6&softwareId=${id}`);
  }

  /* Put method to update some features of a particular software asset */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public putBackendData(softwareAsset: any, id: number): Observable<Object>{
    return this.http.put(`${this.baseUrl}/software/update?softwareId=${id}` ,softwareAsset);
  }

  /* Get method to change the property of status of a software asset to inactive */ 
  // eslint-disable-next-line @typescript-eslint/ban-types
  public updateStatus(page: number, id: number[]): Observable<Object>{
    return this.http.put(`${this.baseUrl}/software/update/status`, id)
  }

  /* Search software assets */
  getSearchData(page:number,searchTerm:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/software/search?page=${page}&size=6&searchTerm=${searchTerm}`);
  }

  postData(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/software`,data);
  }

  /* Get options for dropdown */
  getSoftwareOptions(): Observable<any>{
    return this.http.get(`${this.baseUrl}/options/softwareFields`)
  }

  //get the list of all available software for user
  getSoftwareList(pageNumber:number):Observable<SoftwareAsset>{
    return this.http.get<SoftwareAsset>(`${this.baseUrl}/software/user/viewAll/${pageNumber}/5`);
    }

    //get the details of a single software asset for user using asset id.
    getSoftwareById(id:number):Observable<SoftwareAsset>{
      return this.http.get<SoftwareAsset>(`${this.baseUrl}/software/id/${id}`)
}

//api call to update the status of a software asset for admin
updateSoftwareAdmin(id:number,status: string): Observable<any>{
  return this.http.put(`${this.baseUrl}/software/update/${id}/${status}`,null)
}

//to search available software for user
getSearchBySoftware(searchTerm:string):Observable<SoftwareAsset[]>{
  return this.http.get<SoftwareAsset[]>(`${this.baseUrl}/software/usersearch/${searchTerm}`);

}

 
  //filter the hardwares based on hardwareType and Manufacturer
  filtersoftwares(page: number, softwareCategory: string | null, manufacturer: string, status: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/software/filter?page=${page}&size=6&softwareCategory=${softwareCategory}&manufacturer=${manufacturer}&assignStatus=${status}`)
  }

  
 
}
