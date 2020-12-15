import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dataSource =  {
    datasets: [
        {
            data: [],
            backgroundColor:[],
        }
    ],
    labels:[]
};
usersbudgetdata = null;

constructor(public dataService: DataService,
  private accountService: AccountService
) { }

ngOnInit(): void {

  this.accountService.getAll()
  .pipe(first())
  .subscribe(usersbudgetdata => this.usersbudgetdata = usersbudgetdata);


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

deleteData(id: Number) {
  const userbudgetdata = this.usersbudgetdata.find(x => x.id === id);
  userbudgetdata.isDeleting = true;
  this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.usersbudgetdata = this.usersbudgetdata.filter(x => x.id !== id));
}


}
