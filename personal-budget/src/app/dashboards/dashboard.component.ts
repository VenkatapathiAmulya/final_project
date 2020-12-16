import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';
import * as d3 from 'd3';

import { AccountService } from '../_services';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private svg;
  private margin = 50;
  private width = 400;
  private height = 300;

  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private data = [];
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
    console.log("*********************res",res);
    for ( var i = 0 ; i < res.length; i++) {
        this.dataSource.datasets[0].data[i] = res[i].budget;
        this.dataSource.labels[i] = res[i].title;
        this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
        this.createChart();
        this.barchartfunction();

    }
    this.data= res;
    this.createSvg();
      this.createColors();
      this.drawChart();
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

deleteData(id: String) {
  const userbudgetdata = this.usersbudgetdata.find(x => x.id === id);
  userbudgetdata.isDeleting = true;
  this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.usersbudgetdata = this.usersbudgetdata.filter(x => x.id !== id));
}


barchartfunction(){
  var densityData = {
    label: 'Density of Planet (kg/m3)',
    data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderColor: 'rgba(0, 99, 132, 1)',
    yAxisID: "y-axis-density"
  };

  var gravityData = {
    label: 'Gravity of Planet (m/s2)',
    data: [3.7, 8.9, 9.8, 3.7, 23.1, 9.0, 8.7, 11.0],
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderColor: 'rgba(99, 132, 0, 1)',
    yAxisID: "y-axis-gravity"
  };

  var planetData = {
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [densityData, gravityData]
  };

  var chartOptions = {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.6
      }],
      yAxes: [{
        id: "y-axis-density"
      }, {
        id: "y-axis-gravity"
      }]
    }
  };

  var densityCanvas = document.getElementById("bargraph")
  var barChart = new Chart(densityCanvas, {
    type: 'bar',
    data: planetData,
    options: chartOptions
  });
}


private createSvg(): void {
  this.svg = d3.select("figure#pie")
  .append("svg")
  .attr("width", this.width)
  .attr("height", this.height)
  .append("g")
  .attr(
    "transform",
    "translate(" + this.width / 2 + "," + this.height / 2 + ")"
  );
}
private createColors(): void {
this.colors = d3.scaleOrdinal()
.domain(this.data.map(d => d.budget.toString()))
//.range(["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19", "#fdfd19","#189c40","#04350c","#652e7a"]);
.range(this.data.map(d => d.color.toString()));
}
private drawChart(): void {
// Compute the position of each group on the pie:
const pie = d3.pie<any>().value((d: any) => Number(d.budget));

// Build the pie chart
this.svg
.selectAll('pieces')
.data(pie(this.data))
.enter()
.append('path')
.attr('d', d3.arc()
  .innerRadius(0)
  .outerRadius(this.radius)
)
.attr('fill', (d, i) => (this.colors(i)))
.attr("stroke", "#121926")
.style("stroke-width", "1px");

// Add labels
const labelLocation = d3.arc()
.innerRadius(100)
.outerRadius(this.radius);

this.svg
.selectAll('pieces')
.data(pie(this.data))
.enter()
.append('text')
.text(d => d.data.title)
.attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
.style("text-anchor", "middle")
.style("font-size", 15);
}


}
