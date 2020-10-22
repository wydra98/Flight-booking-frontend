import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../auth/authorization.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{



  constructor(private auth: AuthorizationService) { }

}
