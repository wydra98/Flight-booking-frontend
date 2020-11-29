import {Component, OnInit} from '@angular/core';
import {TripService} from '../trip.service';
import {TripToView} from '../trip-to-view';
import {Passenger} from '../../../models/passenger';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  tripToView: TripToView;
  passengers: Passenger[] = [];

  constructor(private tripService: TripService) {
  }

  ngOnInit(): void {
    this.chosenTrip();
    this.takePassengers();
  }

  takePassengers() {
    this.tripService.getPassenger().subscribe(
      (passengers) => {
        this.passengers = passengers;
      },
      (err) => {
        console.log('error') + err;
      }
    );
  }

  chosenTrip() {
    this.tripService.getChosenTrip().subscribe(
      (tripToView) => {
        this.tripToView = tripToView;
      },
      (err) => {
        console.log('error') + err;
      }
    );
  }


}
