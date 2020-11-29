import {Injectable} from '@angular/core';
import {Trip} from '../../models/trip';
import {URL} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Airport} from '../../models/airport';
import {Ticket} from '../../models/ticket';
import {TripToView} from './trip-to-view';
import {Router} from '@angular/router';
import {IntermediateConnection} from '../flights/flight-view-data';
import {Passenger} from '../../models/passenger';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  chosenTrip = new BehaviorSubject<TripToView>(null);
  passengers = new BehaviorSubject<Passenger[]>([]);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getChosenTrip(): Observable<TripToView> {
    return this.chosenTrip.asObservable();
  }

  getPassenger(): Observable<Passenger[]> {
    return this.passengers.asObservable();
  }


  public fetchTrips(id: number): Observable<any> {
    return this.httpClient.get<Trip[]>(URL + '/trips/user', {
      params: {
        id: id.toString()
      }
    });
  }

  public fetchTripsAll(): Observable<any> {
    return this.httpClient.get<Trip[]>(URL + '/trips/all');
  }

  public getUser(id: number): Observable<any> {
    return this.httpClient.get<User[]>(URL + '/users/trip', {
      params: {
        id: id.toString()
      }
    });
  }

  public deleteTrip(id: number): Observable<any> {
    return this.httpClient.delete(URL + '/trips/delete', {
      params: {
        id: id.toString()
      }
    });
  }

  public getPassengers(row): void {
    this.httpClient.get<Passenger[]>(URL + '/passengers/trip', {
      params: {
        id: row.id.toString()
      }
    }).subscribe(
      (passenger) => {
        this.passengers.next(passenger);
        this.navigateToDetails(row);
      }
    );
  }

  public getPassengers2(row): void {
    this.httpClient.get<Passenger[]>(URL + '/passengers/trip', {
      params: {
        id: row.id.toString()
      }
    }).subscribe(
      (passenger) => {
        this.passengers.next(passenger);
        this.navigateToDetails2(row);
      }
    );
  }

  navigateToDetails(row) {
    this.chosenTrip.next(row);
    this.router.navigate(['/tripAdminDetails']);
  }

  navigateToDetails2(row) {
    this.chosenTrip.next(row);
    this.router.navigate(['/tripDetails']);
  }

  public toViewData(trips: Trip[]): TripToView[] {
    return trips.map((trip) => {
         let trips = {
          id: trip.id,
          purchaseDate: trip.purchaseDate,
          purchaseTime: trip.purchaseTime,
          arrivalDateParsed: this.parsedDate(trip.arrivalDate),
          departureDateParsed: this.parsedDate(trip.departureDate),
          departurePlace: this.extractPlace(trip.arraysTicket[0].flightDto.srcAirport),
          numberOfTransfers: trip.arraysTicket.length,
          departureDate: trip.departureDate,
          departureTime: trip.departureTime,
          arrivalTime: trip.arrivalTime,
          departureDateGMT: trip.departureDateGMT,
          departureTimeGMT: trip.departureTimeGMT,
          arrivalDateGMT: trip.arrivalDateGMT,
          arrivalTimeGMT: trip.arrivalTimeGMT,
          arrivalPlace: this.extractPlace(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport),
          arrivalDate: trip.arrivalDate,
          departureTimezone: this.extractTimezone(trip.arraysTicket[0].flightDto.srcAirport.timezone),
          price: trip.totalPrice,
          passengers: trip.passengerNumber,
          arrivalTimezone: this.extractTimezone(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport.timezone),
          flights: this.extractIntermediateFlights(trip),
        } as TripToView;

        return trips;
      }
    );
  }

  private parsedDate(date: string) {
    let [year, month, day] = date.toString().split('-');
    return new Date(parseInt(year), parseInt(month), parseInt(day));
  }

  private extractTimezone(timezone: number): string {
    if (timezone >= 0) {
      return `+${timezone}`;
    } else {
      return `${timezone}`;
    }
  }

  private extractPlace(airport: Airport): string {
    return airport.city + ', '
      + airport.country;
  }

  private extractAirport(airport: Airport): string {
    return airport.name;
  }

  private extractIntermediateFlights(trip: Trip): IntermediateConnection[] {
    return trip.arraysTicket.map((ticket: Ticket) => {

      return {
        srcPlace: this.extractPlace(ticket.flightDto.srcAirport),
        dstPlace: this.extractPlace(ticket.flightDto.dstAirport),
        sourceAirport: this.extractAirport(ticket.flightDto.srcAirport),
        destinationAirport: this.extractAirport(ticket.flightDto.dstAirport),
        airline: ticket.flightDto.airline.name,
        arrivalDate: ticket.arrivalDate,
        arrivalTime: ticket.arrivalTime,
        arrivalTimezone: this.extractTimezone(ticket.flightDto.dstAirport.timezone),
        departureDate: ticket.departureDate,
        departureTime: ticket.departureTime,
        departureDateGMT: ticket.departureDateGMT,
        departureTimeGMT: ticket.departureTimeGMT,
        arrivalDateGMT: ticket.arrivalDateGMT,
        arrivalTimeGMT: ticket.arrivalTimeGMT,
        departureTimezone: this.extractTimezone(ticket.flightDto.srcAirport.timezone),
        price: ticket.totalPrice,
        seatNumber: ticket.seatNumber,
      } as IntermediateConnection;
    });
  }
}
