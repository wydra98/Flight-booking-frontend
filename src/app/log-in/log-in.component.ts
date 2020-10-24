import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthorizationService} from "../auth/authorization.service";
import {GeneralService} from "../services/general.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;

  constructor( private fb: FormBuilder,
               private router: Router,
               private auth: AuthorizationService,
               private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;

    this.auth.signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
      .subscribe(() => {
        if(this.auth.isAdmin()){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user']);
        }
        this.generalService.showSnackbar('Login was successful', 'Close');
      }, () => {
        this.generalService.showSnackbar('Failed to login', 'Close');
        this.loading = false;
      });
  }
}
