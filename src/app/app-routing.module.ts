import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthGuardService} from "./auth/auth-guard.service";

const routes: Routes = [
  { path: 'logIn', component: LogInComponent},
  { path: 'signUp', component: SignUpComponent},
  // {
  //   path: 'booking',
  //   loadChildren: () =>
  //     import('./user/booking/booking.module').then((m) => m.BookingModule),
  // },
  // {
  //   path: 'tickets',
  //   loadChildren: () =>
  //     import('./user/tickets/tickets.module').then((m) => m.TicketsModule),
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin/admin-panel/admin.module').then((m) => m.AdminModule),
  // },
  // //{ path: '', redirectTo: '/logIn' },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
