import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveDataPoint, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { GraphData } from '../models/graph-data';
import { GraphStatusService } from '../services/graph-status.service';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-software-graph',
  templateUrl: './software-graph.component.html',
  styleUrls: ['./software-graph.component.css']
})
export class SoftwareGraphComponent implements OnInit {

  constructor(
    private graphService: GraphStatusService,
    private router: Router
  ) {}
  chart!: any[];
  softwareCategory = "all"


  ngOnInit(): void {
    this.graphService.getGraphData().subscribe((res) => {

      this.setChartData(res);
    });
 
    
  }

  doughnutChartLabels: string[] = ['Allocated', 'Available'];
  public doughnutChartType: ChartType = 'doughnut';
  public barChartPlugins = [DataLabelsPlugin];

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
    if (active) {
      const indexValue = active as ActiveDataPoint[];
      this.gotoHardwareList(indexValue[0].index);
      console.log(indexValue[0].index);
    }
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  options: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title() {
            return `Software Assets`;
          },
          label(context) {
            return `${context.label} ${context.parsed}`;
          },
        },
      },
      datalabels: {
        color: 'white',
        font: {
          size: 15,
        },
      },
    },
  };

  chartData!: ChartData;
  setChartData(graphResult: GraphData) {
    console.log(graphResult);
    
    this.chartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [ graphResult.totalInstalled,graphResult.totalAvailable],

          backgroundColor: ['rgb(31, 55, 140)', 'rgb(45, 183, 128)'],
          borderWidth: 0,
          hoverOffset: 3,
        },
      ],
    };
  }

  gotoHardwareList(indexValue: number) {
    if (indexValue == 0) {
      this.router.navigate([
        'home/admin/software-filtered-list',
        {
          assetCategory: this.softwareCategory,
          allocatedOrAvailable: 'Allocated',
          assetId: '',
        },
      ]);
    } else {
      this.router.navigate([
        'home/admin/software-filtered-list',
        {
          assetCategory: this.softwareCategory,
          allocatedOrAvailable: 'Unallocated',
          assetId: '',
        },
      ]);
    }
  }

}
