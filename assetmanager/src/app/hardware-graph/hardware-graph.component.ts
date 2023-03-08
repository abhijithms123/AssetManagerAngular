import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType, ChartData, ChartEvent, ActiveDataPoint } from 'chart.js';
import { Datastore } from '../models/datastore';
import { DashboardHardwareService } from '../services/dashboard-hardware.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AuthInterceptorService } from '../authentication/auth-interceptor.service';

@Component({
  selector: 'app-hardware-graph',
  templateUrl: './hardware-graph.component.html',
  styleUrls: ['./hardware-graph.component.css']
})
export class HardwareGraphComponent implements OnInit {


  dataSet!: Datastore[];
  assetTypes!: string[];// array of Hardware Asset Types
  assignedc!: number[];// array of counts of assigned assets
  uassignedc!: number[]; // array of counts of unassigned assets
  constructor(
    private hardwareService: DashboardHardwareService,
    private router: Router,
    private httpIntecept: AuthInterceptorService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getCountsData();
      console.log(this.chartData);
    }, 900);
  }

  private getCountsData() {
    this.hardwareService.getCounts().subscribe((response) => {
      this.dataSet = response;
      // array of Hardware Asset Types
      this.assetTypes = this.dataSet.map((a) => a.type);

      // array of counts of assigned assets
      this.assignedc = this.dataSet.map((a) => a.assignedCount);

      // array of counts of unassigned assets
      this.uassignedc = this.dataSet.map((a) => a.unassignedCount);

      this.graphData(this.assetTypes, this.assignedc, this.uassignedc);
    });
  }
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  chartData!: ChartData;
  graphData(assetTypes: string[], assignedc: number[], uassignedc: number[]) {
    this.chartData = {
      labels: assetTypes,
      datasets: [
        {
          data: assignedc,
          label: 'Assigned',
          stack: 'a',
          backgroundColor: 'rgb(31, 55, 140)',
          borderColor: 'rgb(31, 55, 140)',
          barThickness: 35,
        },
        {
          data: uassignedc,
          label: 'Available',
          stack: 'a',
          backgroundColor: 'rgb(45, 183, 128)',
          borderColor: 'rgb(45, 183, 128)',
          barThickness: 35,
        },
      ],
    };
  }

  //events
  // Bar-Click Event
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active?:any;
  }): void {
    console.log(event, active);
    if (active) {
      const arr = active as ActiveDataPoint[];
      // arr[0].index indicates position of asset type in the array
      //arr[0].datasetIndex -> contains two value 0 for assigned, 1 for unassigned/available
      this.hardwareslist(arr[0].index, arr[0].datasetIndex === 0);
    }
  }
// Chart-Hover Event
  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: any;
  }): void {
    console.log(event, active);
  }
  // this.hardwareslist() function navigate to hardware list component to display details of selected bar
  hardwareslist(assetTypeIndex: number, isAssigned: boolean) {
    this.router.navigate([
      'home/admin/hardware-flitered-list',
      {assetId:'',assetCategory: this.assetTypes[assetTypeIndex],allocatedOrAvailable: isAssigned ? 'Allocated' : 'Unallocated'}
    ]);
  }

}
