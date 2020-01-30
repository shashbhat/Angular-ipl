import { Component, OnInit } from '@angular/core';
import { IplService } from '../Services/ipl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  details;
  teamName;
  teamNames = [];

  constructor(private iplService:IplService) { }

  ngOnInit() {

    this.iplService.teamLabels().subscribe(res=>{
      this.teamNames = res['label'];
      console.log(res)
    })
  }

  getPlayers(event) {
    this.teamName = event.target.value;
    if (this.teamName.trim()) {
      this.iplService.getPlayersByTeamName(this.teamName).subscribe(res=>{
        this.details = res;
        console.log(res, this.details)
      })

    }
  }
}
