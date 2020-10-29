import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SearchFlightComponent} from "./user/search-flight/search-flight.component";
import {FlightsComponent} from "./user/flights/flights.component";
import {OrderComponent} from "./user/order/order.component";
import {UserPanelComponent} from "./user/user-panel.component";
import {AdminPanelComponent} from "./admin/admin-panel.component";
import {AirlineComponent} from "./admin/airline/airline.component";
import {AirportComponent} from "./admin/airport/airport.component";
import {FlightComponent} from "./admin/flight/flight.component";
import {PassengerComponent} from "./admin/passenger/passenger.component";
import {TripComponent} from "./admin/trip/trip.component";
import {UserComponent} from "./admin/user/user.component";
import {TicketComponent} from "./user/tickets/ticket/ticket.component";
import {AuthGuardUserService} from "./auth/auth-guard-user.service";
import {AuthGuardAdminService} from "./auth/auth-guard-admin.service";


const routes: Routes = [
  {
    path: '', component: UserPanelComponent,
    children: [
      {path: '', redirectTo: '/search', pathMatch: 'full'},
      {path: 'search', component: SearchFlightComponent},
      {path: 'flights', component: FlightsComponent},
      {path: 'order', component: OrderComponent},
      {path: 'ticket', component: TicketComponent},
    ],
    canActivate: [AuthGuardUserService]
  },
  {
    path: '', component: AdminPanelComponent,
    children: [
      {path: '', redirectTo: '/airline', pathMatch: 'full'},
      {path: 'airline', component: AirlineComponent},
      {path: 'airport', component: AirportComponent},
      {path: 'flight', component: FlightComponent},
      {path: 'passenger', component: PassengerComponent},
      {path: 'trip', component: TripComponent},
      {path: 'user', component: UserComponent}
    ],
    canActivate: [AuthGuardAdminService]
  },
  {path: 'logIn', component: LogInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
