import {Passenger} from "./passenger";
import {Trip} from "./trip";

export class BookingRequest {
  userId: number
  passengersDto: Passenger[];
  tripsDto: Trip[];
}
