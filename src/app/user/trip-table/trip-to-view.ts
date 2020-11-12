import {IntermediateConnection} from "../flights/flight-view-data";

export interface TripToView {
  additionalId: number;
  id: number;
  departurePlace: string;
  numberOfTransfers: number;
  departureDate: string;
  departureTime: string
  arrivalPlace: string;
  arrivalDate: string;
  arrivalTime: string
  departureTimezone: string;
  price: number;
  passengers: number;
  arrivalTimezone: string;
  flights: Array<IntermediateConnection>;
}


