import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public dataSource =  {
    datasets: [
        {
            data: [],
            backgroundColor:[],
        }
    ],
    labels:[]
};

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      console.log(res);
      for ( var i = 0 ; i < res.length; i++) {
          this.dataSource.datasets[0].data[i] = res[i].budget;
          this.dataSource.labels[i] = res[i].title;
          this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
          this.createChart();
      }
    })
    ;
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
