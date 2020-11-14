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
import {FlightComponent} from "./user/flights/flight/flight.component";
import {PassengerComponent} from "./admin/passenger/passenger.component";
import {TripComponent} from "./admin/trip/trip.component";
import {UserComponent} from "./admin/user/user.component";

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
import {MainUserNavComponent} from './user/main-user-nav/main-user-nav.component';
import {AdminMainNavComponent} from './admin/admin-main-nav/admin-main-nav.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AddTokenInterceptor} from "./auth/add-token.interceptor";
import {ResponseInterceptor} from "./auth/response.interceptor";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import { FlightAdminComponent } from './admin/flight-admin/flight-admin.component';
import {MatStepperModule} from "@angular/material/stepper";
import { StartUserPanelComponent } from './user/start-user-panel/start-user-panel.component';
import { FinishComponent } from './user/finish/finish.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { StartAdminPanelComponent } from './admin/start-admin-panel/start-admin-panel.component';
import { TripTableComponent } from './user/trip-table/trip-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlightTableComponent } from './user/flights/flight/flight-table/flight-table.component';
import { TripDetailsComponent } from './user/trip-table/trip-details/trip-details.component';
import { PassengersDetailsTableComponent } from './user/trip-table/trip-details/passengers-details-table/passengers-details-table.component';
import { UserDataComponent } from './user/user-data/user-data.component';
import { AirportTableComponent } from './admin/airport-table/airport-table.component';
import { AirlineTableComponent } from './admin/airline-table/airline-table.component';
import { AirportEditComponent } from './admin/airport-table/airport-edit/airport-edit.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AirportAddComponent } from './admin/airport-table/airport-add/airport-add.component';
import { AirlineAddComponent } from './admin/airline-table/airline-add/airline-add.component';
import { AirlineEditComponent } from './admin/airline-table/airline-edit/airline-edit.component';

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
    FlightComponent,
    PassengerComponent,
    TripComponent,
    UserComponent,
    FlightAdminComponent,
    StartUserPanelComponent,
    FinishComponent,
    MatConfirmDialogComponent,
    StartAdminPanelComponent,
    TripTableComponent,
    FlightTableComponent,
    TripDetailsComponent,
    PassengersDetailsTableComponent,
    UserDataComponent,
    AirportTableComponent,
    AirlineTableComponent,
    AirportEditComponent,
    AirportAddComponent,
    AirlineAddComponent,
    AirlineEditComponent,
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
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatRadioModule,
        MatStepperModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonToggleModule
    ],
  providers: [SnackBarComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule {
}
