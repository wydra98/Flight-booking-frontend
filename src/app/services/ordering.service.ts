import {Injectable} from '@angular/core';
import {URL} from '../../environments/environment';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SearchFlightService} from "./search-flight.service";
import {Trip} from "../models/trip";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Passenger} from "../models/passenger";
import {map} from "rxjs/operators";
import {BookingRequest} from "../models/booking-request";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {AuthorizationService} from "../auth/authorization.service";
import {FlightRequestQueryParams} from "../models/flight-request-query-params";

@Injectable({
  providedIn: 'root'
})
export class OrderingService {
  private flightsToRender = new BehaviorSubject<Trip[]>([]);
  private flightsFromDestination: Trip[];
  private chosenFlightToDestination: Trip;
  private chosenFlightFromDestination: Trip;
  private bothWayTrip: boolean;
  private passengers: Passenger[];
  private rebuildComponentWasTriggered = false;
  private readonly FLIGHTS_COMPONENT_FIRST_STEP_TITLE = 'Wybierz podróż do miejsca docelowego';
  private readonly FLIGHTS_COMPONENT_SECOND_STEP_TITLE = 'Wybierz podróż z miejsca docelowego';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private searchFlightService: SearchFlightService,
    private snackbar: SnackBarComponent,
    private auth: AuthorizationService
  ) {
    this.checkIfTripIsBothWay();
    this.getFetchedTripsToDestination();
    this.getFetchedTripsFromDestination();
  }

  public onPassengerFormFilled(passenger: Passenger[]): void {
    this.passengers = passenger;
    this.orderFlight();
  }

  public getFlightsToOrder(): Observable<Trip[]> {
    return this.flightsToRender.asObservable();
  }

  public getComponentTitle = (): Observable<string> => (
    !this.rebuildComponentWasTriggered ? of(this.FLIGHTS_COMPONENT_FIRST_STEP_TITLE) : of(this.FLIGHTS_COMPONENT_SECOND_STEP_TITLE)
  );

  public getPassengersNumber(): number {
    return this.searchFlightService.getPassengersNumber();
  }

  public clearService(): void {
    this.flightsToRender.next([]);
    this.flightsFromDestination = null;
    this.chosenFlightFromDestination = null;
    this.chosenFlightToDestination = null;
    this.rebuildComponentWasTriggered = false;
  }

  private getFetchedTripsFromDestination() {
    this.searchFlightService.getFoundTripsFromDestination().subscribe((trips: Trip[]) => {
      this.flightsFromDestination = trips;
    });
  }

  private getFetchedTripsToDestination() {
    this.searchFlightService.getFoundTripsToDestination().subscribe((trips: Trip[]) => {
      this.flightsToRender.next(trips);
    });
  }

  private checkIfTripIsBothWay() {
    this.searchFlightService.getFoundTripsFromDestination().pipe(
      map((trips: Trip[]) => !!trips.length)
    ).subscribe((isBothWay: boolean) => {
      this.bothWayTrip = isBothWay;
    });
  }

  public onChosenFlight(flight: Trip): void {
    if (!this.shouldNavigateToOrderPage(flight)) {
      return;
    }
    this.router.navigate(['/order']);
  }

  private shouldNavigateToOrderPage(flight: Trip): boolean {
    if (!this.chosenFlightToDestination) {
      this.chosenFlightToDestination = flight;
      return this.determineAndHandleIfOneWayTrip();
    }
    this.chosenFlightFromDestination = flight;
    return true;
  }

  private determineAndHandleIfOneWayTrip(): boolean {
    if (!this.bothWayTrip) {
      return true;
    }
    this.rebuildFlightsComponent();
    return false;
  }

  private rebuildFlightsComponent(): void {
    this.rebuildComponentWasTriggered = true;
    this.flightsToRender.next(this.flightsFromDestination);
  }

  private composeBookingRequest(): BookingRequest {
    return {
      userId: parseInt(this.auth.getId()),
      tripDto: this.chosenFlightToDestination,
      passengersDto: [...this.passengers]
    };
  }

  private createHttpOptions(params: BookingRequest): object {
    return {
      params,
      responseType: 'json',
    };
  }

  private orderFlight(): void {
    const bookingRequest = this.composeBookingRequest();
    this.httpClient.post(URL + '/trips/createTrip', bookingRequest).subscribe(
      () => {
        this.router.navigate(['/finish']);
        this.snackbar.showSnackbar('Zarezerwowano lot', 'success');
      },
      (err: any) => {
        this.snackbar.showSnackbar(err.error, 'fail');
      }
    );
  }

}
