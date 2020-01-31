import { Component, OnInit } from '@angular/core';
import { IplService } from '../Services/ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamDetails;
  teamName;
  ColumnChart:GoogleChartInterface
  pieChart:GoogleChartInterface

  constructor(private iplService:IplService) { }

  ngOnInit() {
    this.iplService.getTeamDetails().subscribe(res=>{
      this.teamDetails = res['teams'];
      // console.log(this.teamDetails)
    })

    this.iplService.getTotalPrice().subscribe(res=>{
      let totalPrice = res['price'];
      let data = []
      data.push(['team','price'])
      for(let i of totalPrice){
        data.push([i["label"],i["total"]])
      }
      console.log(data)
      this.showColumnChart(data);
    })
  }

  showColumnChart(data){
  
    this.ColumnChart = {
      chartType: "ColumnChart",
      dataTable: data,
      options:{
        'title':'Total Cost of Players',
        'width' : 650,
        'height' : 500
      }
    }
  }

  onChartSelect(event:ChartSelectEvent){
    let team = event.selectedRowFormattedValues[0]
    this.teamName = team
    this.iplService.getPriceByTeam(team).subscribe(res=>{
      let price = res["stats"]
      let data = []
      data.push(["Role","Amount"]);
      for(let p of price){
        data.push([p['role'],p['price']]);
      }
      this.showPieChart(data);
      console.log(data)
    })
  }

  showPieChart(data){
    this.pieChart={
      chartType:"PieChart",
      dataTable:data,
      options:{
        "title": `Team - ${this.teamName}`,
        'width':600,
        'height':500

      }
    }
  }
}
