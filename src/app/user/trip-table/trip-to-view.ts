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
  flights: Array<FlightToView>;
}

export class FlightToView {
  departureDate: string;
  departureTime: string;
  sourceAirport: string;
  destinationAirport: string;
  departureTimezone: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalTimezone: string;
  srcPlace: string;
  dstPlace: string;
  airline: string;
}
