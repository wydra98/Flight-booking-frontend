import {Flight} from "./flight";

export interface Ticket {
  flightDto: Flight;
  departureDate: string;
  arrivalDate: string;
  arrivalTime:  string;
  departureTime:  string;
  seatNumber?: number;
  totalPrice: number;
}
