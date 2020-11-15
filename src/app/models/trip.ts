import {Ticket} from './ticket';

export interface Trip {
  id?: number;
  arraysTicket: Ticket[];
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  totalPrice: number;
  normalOffer: boolean;
  purchaseDate?: string;
  purchaseTime?: string;
  passengerNumber?: number;
}
