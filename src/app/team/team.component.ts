import { Component, OnInit } from '@angular/core';
import { IplService } from '../Services/ipl.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamDetails;

  constructor(private iplService:IplService) { }

  ngOnInit() {
    this.iplService.getTeamDetails().subscribe(res=>{
      this.teamDetails = res['teams'];
      console.log(this.teamDetails)
    })
  }

  getTeamDetails(){
    
  }

}
