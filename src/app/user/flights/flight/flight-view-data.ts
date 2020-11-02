export interface FlightViewData {
  sourcePlace: string;
  destinationPlace: string;
  numberOfTransfers: number;
  price: number;
  departureDate: string;
  departureTime: string;
  departureTimezone: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalTimezone: string;
  flights: Array<IntermediateConnection>;
}

export class IntermediateConnection {
  departureDate: string;
  departureTime: string;
  departureTimezone: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalTimezone: string;
  srcPlace: string;
  dstPlace: string;
  airline: string;
}
