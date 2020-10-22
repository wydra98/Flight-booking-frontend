import { FlightsComponent } from './flights/flights.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BookingRoutingModule } from './booking-routing.module';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { FlightComponent } from './flights/flight/flight.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderComponent } from './order/order.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SearchFlightComponent,
    FlightsComponent,
    FlightComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class BookingModule { }
