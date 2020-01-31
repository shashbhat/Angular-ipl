import { Component, OnInit } from '@angular/core';
import { IplService } from '../Services/ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pieChart: GoogleChartInterface
  tableChart: GoogleChartInterface
  players;
  teamName;
  teamNames = [];

  constructor(private iplService:IplService) { }

  ngOnInit() {

    this.iplService.teamLabels().subscribe(res=>{
      this.teamNames = res['labels'];
   
    })
  }

  getPlayers(event) {
    this.teamName = event.target.value;
    if (this.teamName.trim()) {
      this.iplService.getPlayersByTeamName(this.teamName).subscribe(res=>{
        this.players = res["players"];
        
      })

      this.iplService.getTeamRoleStat(this.teamName).subscribe(res=>{
        let stat = res["stat"];
        let data = []
        data.push(["Role","Count"]);
        for(let s of stat){
          data.push([s["role"],s['count']])
        }
        this.showRoleStatChart(data);
      })
    }
  }

  showRoleStatChart(data){
 
    this.pieChart = {
      chartType: "PieChart",
      dataTable: data,
      options: {'Role':'Count',
      'width':500,
      'height':400}
    }
  }

  onChartSelect(event:ChartSelectEvent){
    let role = event.selectedRowFormattedValues[0];
    this.iplService.getPlayersByTeamandRole(this.teamName, role).subscribe(res=>{
      let players = res["players"]
      let data = []
      data.push(["Player","Team","Role","Price"]);
      for(let p of players){
        data.push([p['player'],p['label'],p['role'],p['price']]);
      }
      this.showTableChart(data);
    })
  }

  showTableChart(data){
    
    this.tableChart = {
      chartType: "Table",
      dataTable: data
      
    }
  }

}
