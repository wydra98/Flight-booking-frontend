import { SearchFlightService } from './search-flight.service';
import { URL } from '../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BookingRequest } from '../models/booking-request';
import { Passenger } from '../models/passenger';
import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { Router, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderingService {
  // private flightsToRender = new BehaviorSubject<Trip[]>([]);
  // private flightsFromDestination: Trip[];
  // private chosenFlightToDestination: Trip;
  // private chosenFlightFromDestination: Trip;
  // private bothWayTrip: boolean;
  // private passengers: Passenger[];
  // private rebuildComponentWasTriggered = false;
  // private readonly FLIGHTS_COMPONENT_FIRST_STEP_TITLE = 'Wybierz podróż do miejsca docelowego';
  // private readonly FLIGHTS_COMPONENT_SECOND_STEP_TITLE = 'Wybierz podróż z miejsca docelowego';
  //
  //
  // constructor(
  //   private router: Router,
  //   private httpClient: HttpClient,
  //   private searchFlightService: SearchFlightService,
  //   private errorService: ErrorService
  // ) {
  //   this.checkIfTripIsBothWay();
  //   this.getFetchedTripsToDestination();
  //   this.getFetchedTripsFromDestination();
  // }
  //
  // public onChosenFlight(flight: Trip): void {
  //   if (!this.shouldNavigateToOrderPage(flight)) { return; }
  //   this.navigateToOrderPage();
  //
  // }
  //
  // public onPassengerFormFilled(passenger: Passenger[]): void {
  //   this.passengers = passenger;
  //   this.orderFlight();
  // }
  //
  // public getFlightsToOrder(): Observable<Trip[]> {
  //   return this.flightsToRender.asObservable();
  // }
  //
  // public getComponentTitle = (): Observable<string> => (
  //   !this.rebuildComponentWasTriggered ? of(this.FLIGHTS_COMPONENT_FIRST_STEP_TITLE) : of(this.FLIGHTS_COMPONENT_SECOND_STEP_TITLE)
  // );
  //
  // public getPassengersNumber(): number {
  //   return this.searchFlightService.getPassengersNumber();
  // }
  //
  // public clearService(): void {
  //   this.flightsToRender.next([]);
  //   this.flightsFromDestination = null;
  //   this.chosenFlightFromDestination = null;
  //   this.chosenFlightToDestination = null;
  //   this.rebuildComponentWasTriggered = false;
  // }
  //
  // private getFetchedTripsFromDestination() {
  //   this.searchFlightService.getFoundTripsFromDestination().subscribe((trips: Trip[]) => { this.flightsFromDestination = trips; });
  // }
  //
  // private getFetchedTripsToDestination() {
  //   this.searchFlightService.getFoundTripsToDestination().subscribe((trips: Trip[]) => { this.flightsToRender.next(trips); });
  // }
  //
  // private checkIfTripIsBothWay() {
  //   this.searchFlightService.getFoundTripsFromDestination().pipe(
  //     map((trips: Trip[]) => !!trips.length)
  //   ).subscribe((isBothWay: boolean) => { this.bothWayTrip = isBothWay; });
  // }
  //
  // private shouldNavigateToOrderPage(flight: Trip): boolean {
  //   if (!this.chosenFlightToDestination) {
  //     this.chosenFlightToDestination = flight;
  //     return this.determineAndHandleIfOneWayTrip();
  //   }
  //
  //   this.chosenFlightFromDestination = flight;
  //   return true;
  // }
  //
  // private determineAndHandleIfOneWayTrip(): boolean {
  //   if (!this.bothWayTrip) { return true; }
  //   this.rebuildFlightsComponent();
  //   return false;
  // }
  //
  // private rebuildFlightsComponent(): void {
  //   this.rebuildComponentWasTriggered = true;
  //   this.flightsToRender.next(this.flightsFromDestination);
  // }
  //
  // private orderFlight(): void {
  //   const bookingRequest = this.composeBookingRequest();
  //   this.postBookingRequest(bookingRequest).subscribe(
  //     this.navigateToTripSummary(),
  //     this.handleBookingRequestError()
  //   );
  // }
  //
  // private handleBookingRequestError(): (error: any) => void {
  //   return (error: any) => { this.errorService.handleError(error); };
  // }
  //
  // private navigateToTripSummary(): (response: { tripId: string }) => void {
  //   return (response: { tripId: string }) => {
  //     const { tripId } = response;
  //     console.log('received code: ', tripId);
  //     this.router.navigate(['/tickets'], { queryParams: this.composeQueryParams(tripId) });
  //   };
  // }
  //
  //
  // private composeQueryParams(tripId: string): Params {
  //   return {
  //     code: tripId
  //   };
  // }
  //
  // private postBookingRequest(bookingRequest: BookingRequest): Observable<{ tripId: string }> {
  //   return this.httpClient.post<{ tripId: string }>(
  //     URL + '/trips/createTrip',
  //     bookingRequest
  //   );
  // }
  //
  // private composeBookingRequest(): BookingRequest {
  //   return {
  //     tripDto: this.chosenFlightToDestination,
  //     passengersDto: [...this.passengers]
  //   };
  // }
  //
  // private navigateToOrderPage(): void {
  //   this.router.navigate(['/booking/order']);
  // }
}
