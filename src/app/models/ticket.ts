import {Flight} from "./flight";

export interface Ticket {
  flightDto: Flight;
  departureDate: string;
  arrivalDate: string;
  arrivalTime: string;
  departureTime: string;
  departureDateGMT: string;
  departureTimeGMT: string;
  arrivalDateGMT: string;
  arrivalTimeGMT: string;
  seatNumber?: number;
  totalPrice: number;
}
