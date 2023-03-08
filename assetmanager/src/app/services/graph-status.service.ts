import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphData } from '../models/graph-data';

@Injectable({
  providedIn: 'root'
})
export class GraphStatusService {

  private baseUrl = 'http://localhost:8080/softwareDashboard'
  constructor(private http:HttpClient) { }

  getGraphData():Observable<GraphData>{
    return this.http.get<GraphData>(`${this.baseUrl}/graphData`);
  }
}
