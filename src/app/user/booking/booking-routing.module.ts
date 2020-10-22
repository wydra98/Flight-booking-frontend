import { FlightsComponent } from './flights/flights.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchFlightComponent
  },
  {
    path: 'flights',
    component: FlightsComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
