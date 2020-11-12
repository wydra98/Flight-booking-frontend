import {Injectable} from '@angular/core';
import {Trip} from "../../models/trip";
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../../models/airport";
import {Ticket} from "../../models/ticket";
import {FlightToView, TripToView} from "./trip-to-view";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchTrips(id: number): Observable<any> {
    return this.httpClient.get<Trip[]>(URL + '/trips', {
      params: {
        id: id.toString()
      }
    })
  }

  public deleteTrip(id: number): Observable<any> {
    return this.httpClient.delete(URL + '/trips', {
      params: {
        id: id.toString()
      }
    })
  }



  public toViewData(trips: Trip[]): TripToView[] {
    let i = 1;
    return trips.map((trip) => {
        return {
          additionalId: i++,
          id: trip.id,
          departurePlace: this.extractPlace(trip.arraysTicket[0].flightDto.srcAirport),
          numberOfTransfers: trip.arraysTicket.length - 1,
          departureDate: trip.departureDate,
          departureTime: trip.departureTime,
          arrivalTime: trip.arrivalTime,
          arrivalPlace: this.extractPlace(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport),
          arrivalDate: trip.arrivalDate,
          departureTimezone: this.extractTimezone(trip.arraysTicket[0].flightDto.srcAirport.timezone),
          price: trip.totalPrice,
          passengers: trip.passengerNumber,
          arrivalTimezone: this.extractTimezone(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport.timezone),
          flights: this.extractIntermediateFlights(trip),
        } as TripToView;
      }
    )
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

  private extractIntermediateFlights(trip: Trip): FlightToView[] {
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
        departureTimezone: this.extractTimezone(ticket.flightDto.srcAirport.timezone)
      } as FlightToView;
    })
  }
}
