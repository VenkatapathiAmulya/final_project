import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';
import { User } from '../_models';
import { AccountService } from '../_services';
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
user: User;


  constructor(public dataService: DataService,private accountService: AccountService) {
    // this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      console.log("*8********************res",res);
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
