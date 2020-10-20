import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  { path: 'logIn', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
