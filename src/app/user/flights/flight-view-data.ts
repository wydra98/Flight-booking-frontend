export interface FlightViewData {
  sourcePlace: string;
  destinationPlace: string;
  numberOfTransfers: number;
  normalOffer: boolean;
  price: number;
  departureDate: string;
  departureTime: string;
  departureTimeGMT: string;
  arrivalTimeGMT: string;
  departureDateGMT: string;
  arrivalDateGMT: string;
  departureTimezone: string;
  passengersNumber: number
  arrivalDate: string;
  arrivalTime: string;
  arrivalTimezone: string;
  flights: Array<IntermediateConnection>;
}

export class IntermediateConnection {
  departureDate: string;
  departureTime: string;
  sourceAirport: string;
  destinationAirport: string;
  departureTimezone: string;
  arrivalDate: string;
  arrivalTime: string;
  departureTimeGMT: string;
  arrivalTimeGMT: string;
  departureDateGMT: string;
  arrivalDateGMT: string;
  arrivalTimezone: string;
  srcPlace: string;
  dstPlace: string;
  airline: string;
  price: number;
}
