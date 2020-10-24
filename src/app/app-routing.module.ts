import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthLoginGuardService} from "./auth/auth-login.service";
import {AuthRegisterGuardService} from "./auth/auth-register.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./user/booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./user/tickets/tickets.module').then((m) => m.TicketsModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-panel/admin.module').then((m) => m.AdminModule),
  },
  {path: 'logIn', component: LogInComponent, canActivate: [AuthLoginGuardService]},
  {path: 'signUp', component: SignUpComponent, canActivate: [AuthRegisterGuardService]},
  {path: '', pathMatch: 'full', redirectTo: 'logIn'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
