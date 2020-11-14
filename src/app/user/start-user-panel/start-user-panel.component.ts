import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../auth/authorization.service";
import {OrderingService} from "../../services/ordering.service";

@Component({
  selector: 'app-start-user-panel',
  templateUrl: './start-user-panel.component.html',
  styleUrls: ['./start-user-panel.component.css']
})
export class StartUserPanelComponent implements OnInit {

  public name: string;

  constructor(private auth: AuthorizationService,
              private orderingService: OrderingService) {
  }

  ngOnInit(): void {
    this.initName()
    this.orderingService.fetchAirports2();
  }

  public initName(){
    this.name = this.auth.getName()
  }
}
