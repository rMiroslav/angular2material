import { Component, OnInit, Input  } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})

export class ChartComponent implements OnInit {

  @Input('userData') public userData: number[];
  public doughnutChartLabels:string[] = ['Online Sales', 'Store Sales', 'Email Order'];
  public doughnutChartData:number[] = [123, 334, 433];
  public doughnutChartType:string = 'doughnut';

  constructor() { }


  ngOnInit() {

  }

  ngAfterViewInit(){
      this.doughnutChartData = [];
    this.userData.map(result => 
      this.doughnutChartData.push(result)
    )
    
    console.log('after')
  }
    
  // @Input userData:any
  // Doughnut
 
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log(this.userData)
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
