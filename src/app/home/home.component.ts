import { Component, OnInit } from '@angular/core';
import { IplService } from '../Services/ipl.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pieChart: GoogleChartInterface
  players;
  teamName;
  teamNames = [];

  constructor(private iplService:IplService) { }

  ngOnInit() {

    this.iplService.teamLabels().subscribe(res=>{
      this.teamNames = res['labels'];
      console.log(res)
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
    console.log(data)
    this.pieChart = {
      chartType: "PieChart",
      dataTable: data,
      options: {'Role':'Count',
      'width':500,
      'height':400}
    }
  }
}
