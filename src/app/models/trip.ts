import {Ticket} from './ticket';

export interface Trip {
  id?: number;
  arraysTicket: Ticket[];
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  departureDateGMT: string;
  departureTimeGMT: string;
  arrivalDateGMT: string;
  arrivalTimeGMT: string;
  totalPrice: number;
  normalOffer: boolean;
  purchaseDate?: string;
  purchaseTime?: string;
  passengerNumber?: number;
}
