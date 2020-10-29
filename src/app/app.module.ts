import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {AppComponent} from './app.component';

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

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MainUserNavComponent } from './user/main-user-nav/main-user-nav.component';
import { AdminMainNavComponent } from './admin/admin-main-nav/admin-main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    UserPanelComponent,
    AdminPanelComponent,
    SnackBarComponent,
    MainUserNavComponent,
    AdminMainNavComponent,
    SearchFlightComponent,
    FlightsComponent,
    OrderComponent,
    AirlineComponent,
    AirportComponent,
    FlightComponent,
    PassengerComponent,
    TripComponent,
    UserComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCheckboxModule,
    LayoutModule,
    MatButtonModule,
    FormsModule,
    MatNativeDateModule,
    MatCardModule,
    BrowserModule,
    FormsModule
  ],
  providers: [SnackBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
