import { Component } from '@angular/core';

@Component({
  selector: 'app-gantchart',
  templateUrl: './gantchart.component.html',
  styleUrls: ['./gantchart.component.css'],
})
export class GantchartComponent {
  
  // Pie
  public pieChartOptions = {
    responsive: false,
  };
  public pieChartLabels = [ 'PSA,', 'Buria Assistance', 'Kasalang Bayan','Voters' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ,100]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {}
}
