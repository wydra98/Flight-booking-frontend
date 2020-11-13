import {IntermediateConnection} from "../flights/flight-view-data";

export interface TripToView {
  id: number;
  departurePlace: string;
  numberOfTransfers: number;
  departureDateParsed: Date;
  arrivalDateParsed: Date;
  departureDate: string;
  departureTime: string
  arrivalPlace: string;
  arrivalDate: string;
  arrivalTime: string
  departureTimezone: string;
  price: number;
  passengers: number;
  purchaseDate: string;
  purchaseTime: string;
  arrivalTimezone: string;
  flights: Array<IntermediateConnection>;
}


