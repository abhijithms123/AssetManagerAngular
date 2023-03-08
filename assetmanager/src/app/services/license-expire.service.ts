import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { expireDataModel } from '../models/expire-model';

@Injectable({
  providedIn: 'root'
})
export class LicenseExpireService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getExpireData() : Observable<expireDataModel[]> {
    return this.http.get<expireDataModel[]>(`${this.baseUrl}/softwareDashboard/aboutToExpire`);
  }

}
