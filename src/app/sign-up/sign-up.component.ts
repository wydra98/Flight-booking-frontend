import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../auth/authorization.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthorizationService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }

  onSubmit() {
    const form = this.signUpForm.value;
    if (form.password == form.passwordRepeat) {
      this.auth.signUp(form.name, form.surname, form.email, form.password)
        .subscribe(() => {
            this.router.navigate(['logIn']);
            this.snackbar.showSnackbar('Pomyślnie zarejestrowano.', 'success');
          }, (err: any) => {
            console.log(err)
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        )
    }
  }
}

