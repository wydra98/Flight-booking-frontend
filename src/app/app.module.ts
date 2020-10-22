import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FlightsComponent } from './user/booking/flights/flights.component';
import { OrderComponent } from './user/booking/order/order.component';
import { SearchFlightComponent } from './user/booking/search-flight/search-flight.component';
import { AirlineComponent } from './admin/admin-panel/airline/airline.component';
import { AirportComponent } from './admin/admin-panel/airport/airport.component';
import { FlightComponent } from './admin/admin-panel/flight/flight.component';
import { PassengerComponent } from './admin/admin-panel/passenger/passenger.component';
import { TripComponent } from './admin/admin-panel/trip/trip.component';
import { UserComponent } from './admin/admin-panel/user/user.component';
import {AppRoutingModule} from "./app-routing.module";

//angular material components
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    FlightsComponent,
    OrderComponent,
    SearchFlightComponent,
    AirlineComponent,
    AirportComponent,
    FlightComponent,
    PassengerComponent,
    TripComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
