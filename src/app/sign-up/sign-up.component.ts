import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../auth/authorization.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {GeneralService} from "../services/general.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private auth: AuthorizationService,
              private router: Router,
              private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    const form = this.signUpForm.value;
    this.auth.signUp(form.name, form.surname, form.email, form.phoneNumber, form.password)
      .subscribe(() => {
        this.router.navigate(['signIn']);
        this.generalService.showSnackbar('Register was succesful. You can now sign in', 'Close');
      }, () => {
        this.generalService.showSnackbar('Failed to register.', 'Close');
        this.loading = false;
      });
  }

}
