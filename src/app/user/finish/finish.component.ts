import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../auth/authorization.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  public name: string;

  constructor(private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    this.initName();
  }

  public initName() {
    this.name = this.auth.getName();
  }

}
