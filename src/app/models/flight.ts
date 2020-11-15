import { Airport } from './airport';
import { Airline } from './airline';

export interface Flight {
  id?: number;
  airline: Airline;
  srcAirport: Airport;
  dstAirport: Airport;
  seatNumber?: number;
}
