export interface FlightRequest {
  id?: number;
  airlineId: number;
  numberSeats: number;
  price: number;
  srcAirportId: number;
  dstAirportId: number;
  departureDate: string;
  departureTime: string;
  flightTime: string;
}

export interface FlightResponse {
  id?: number;
  airlineName: string;
  numberSeats: number;
  price: number;
  srcAirportName: string;
  dstAirportName: string;
  departureDate: string;
  departureTime: string;
  flightTime: string;
}

export interface FlightResponseWithDate {
  id?: number;
  airlineName: string;
  numberSeats: number;
  price: number;
  srcAirportName: string;
  dstAirportName: string;
  departureDate: string;
  departureDateParse: Date;
  departureTime: string;
  flightTime: string;
}

