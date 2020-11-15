import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SearchFlightComponent} from "./user/search-flight/search-flight.component";
import {FlightsComponent} from "./user/flights/flights.component";
import {OrderComponent} from "./user/order/order.component";
import {UserPanelComponent} from "./user/user-panel.component";
import {AdminPanelComponent} from "./admin/admin-panel.component";
import {AuthGuardUserService} from "./auth/auth-guard-user.service";
import {AuthGuardAdminService} from "./auth/auth-guard-admin.service";
import {StartUserPanelComponent} from "./user/start-user-panel/start-user-panel.component";
import {FinishComponent} from "./user/finish/finish.component";
import {StartAdminPanelComponent} from "./admin/start-admin-panel/start-admin-panel.component";
import {TripTableComponent} from "./user/trip-table/trip-table.component";
import {TripDetailsComponent} from "./user/trip-table/trip-details/trip-details.component";
import {UserDataComponent} from "./user/user-data/user-data.component";
import {AirlineTableComponent} from "./admin/airline-table/airline-table.component";
import {AirportTableComponent} from "./admin/airport-table/airport-table.component";
import {AirportEditComponent} from "./admin/airport-table/airport-edit/airport-edit.component";
import {AirportAddComponent} from "./admin/airport-table/airport-add/airport-add.component";
import {AirlineEditComponent} from "./admin/airline-table/airline-edit/airline-edit.component";
import {AirlineAddComponent} from "./admin/airline-table/airline-add/airline-add.component";
import {FlightTableAdminComponent} from "./admin/flight-table/flight-table.component";
import {FlightEditComponent} from "./admin/flight-table/flight-edit/flight-edit.component";
import {FlightAddComponent} from "./admin/flight-table/flight-add/flight-add.component";
import {TripAdminTableComponent} from "./admin/trip-admin-table/trip-admin-table.component";
import {TripAdminDetailsComponent} from "./admin/trip-admin-table/trip-admin-details/trip-admin-details.component";
import {PassengerTableComponent} from "./admin/passenger-table/passenger-table.component";
import {UserTableComponent} from "./admin/user-table/user-table.component";

const routes: Routes = [
  {
    path: '', component: UserPanelComponent,
    children: [
      {path: '', redirectTo: '/startUser', pathMatch: 'full'},
      {path: 'startUser', component: StartUserPanelComponent},
      {path: 'search', component: SearchFlightComponent},
      {path: 'flights', component: FlightsComponent},
      {path: 'order', component: OrderComponent},
      {path: 'ticket', component: TripTableComponent},
      {path: 'finish', component: FinishComponent},
      {path: 'tripDetails', component: TripDetailsComponent},
      {path: 'userData', component: UserDataComponent},
    ],
    canActivate: [AuthGuardUserService]
  },
  {
    path: '', component: AdminPanelComponent,
    children: [
      {path: '', redirectTo: '/startAdmin', pathMatch: 'full'},
      {path: 'startAdmin', component: StartAdminPanelComponent},
      {path: 'airline', component: AirlineTableComponent},
      {path: 'airlineEdit', component: AirlineEditComponent},
      {path: 'airlineAdd', component: AirlineAddComponent},
      {path: 'airport', component: AirportTableComponent},
      {path: 'airportEdit', component: AirportEditComponent},
      {path: 'airportAdd', component: AirportAddComponent},
      {path: 'flight', component: FlightTableAdminComponent},
      {path: 'flightEdit', component: FlightEditComponent},
      {path: 'flightAdd', component: FlightAddComponent},
      {path: 'passenger', component: PassengerTableComponent},
      {path: 'trip', component: TripAdminTableComponent},
      {path: 'tripAdminDetails', component: TripAdminDetailsComponent},
      {path: 'user', component: UserTableComponent}
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
