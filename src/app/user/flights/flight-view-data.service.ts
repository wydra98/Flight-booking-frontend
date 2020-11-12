import { Injectable } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { FlightViewData, IntermediateConnection } from 'src/app/user/flights/flight-view-data';
import { Ticket } from 'src/app/models/ticket';
import { Airport } from 'src/app/models/airport';

@Injectable({
  providedIn: 'root'
})
export class TripViewDataService {
  constructor() { }

  public toViewData(trip: Trip): FlightViewData {

    return {
      sourcePlace: this.extractPlace(trip.arraysTicket[0].flightDto.srcAirport),
      destinationPlace: this.extractPlace(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport),
      numberOfTransfers: trip.arraysTicket.length - 1,
      normalOffer: trip.normalOffer,
      price: trip.totalPrice,
      arrivalDate: trip.arrivalDate,
      departureDate: trip.departureDate,
      flights: this.extractIntermediateFlights(trip),
      departureTime: trip.departureTime,
      departureTimezone: this.extractTimezone(trip.arraysTicket[0].flightDto.srcAirport.timezone),
      arrivalTime: trip.arrivalTime,
      arrivalTimezone: this.extractTimezone(trip.arraysTicket[trip.arraysTicket.length - 1].flightDto.dstAirport.timezone)
    }
  }

  private extractTimezone(timezone: number): string {
    if (timezone >= 0) { return `+${timezone}`; }
    else { return `${timezone}`; }
  }

  private extractPlace(airport: Airport): string {
    return airport.city + ', '
         + airport.country;
  }

  private extractAirport(airport: Airport): string {
    return airport.name;
  }

  private extractIntermediateFlights(trip: Trip): IntermediateConnection[] {
    let i = 1;
    return trip.arraysTicket.map((ticket: Ticket) => {

      return {
        additionalId: i++,
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
        departureTimezone: this.extractTimezone(ticket.flightDto.srcAirport.timezone),
        price: ticket.totalPrice
      } as IntermediateConnection;
    })
  }
}
