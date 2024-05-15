import {Component, NgIterable, OnInit} from '@angular/core';
import {AuthAgentService} from "../../../services/authAgent/auth-agent.service";

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit{
  clients:any[]=[];
  constructor(public service:AuthAgentService) {
  }

  ngOnInit(): void {
    this.clients=this.service.allClients;
    console.log(this.clients)
  }


}
