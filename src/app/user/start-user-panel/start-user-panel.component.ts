import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../auth/authorization.service";

@Component({
  selector: 'app-start-user-panel',
  templateUrl: './start-user-panel.component.html',
  styleUrls: ['./start-user-panel.component.css']
})
export class StartUserPanelComponent implements OnInit {

  public name: string;

  constructor(private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    this.initName()
  }

  public initName(){
    console.log("Name: " + this.auth.getName())
    this.name = this.auth.getName()
  }
}
