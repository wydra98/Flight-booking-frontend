import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthorizationService} from '../auth/authorization.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthorizationService,
              private snackbar: SnackBarComponent
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.auth.signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
      .subscribe(() => {
          if (this.auth.isAdmin()) {
            this.router.navigate(['/startAdmin']);
            this.snackbar.showSnackbar('Pomyślnie zalogowano', 'success');
          } else {
            this.router.navigate(['/startUser']);
            this.snackbar.showSnackbar('Pomyślnie zalogowano', 'success');
          }
        },
        (err: any) => {
          this.snackbar.showSnackbar(err.error, 'fail');
        }
      );
  }
}
