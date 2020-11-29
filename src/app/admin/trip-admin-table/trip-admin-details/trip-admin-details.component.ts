import {Component, OnInit} from '@angular/core';
import {TripToView} from '../../../user/trip-table/trip-to-view';
import {Passenger} from '../../../models/passenger';
import {TripService} from '../../../user/trip-table/trip.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-trip-admin-details',
  templateUrl: './trip-admin-details.component.html',
  styleUrls: ['./trip-admin-details.component.css']
})
export class TripAdminDetailsComponent implements OnInit {

  tripToView: TripToView;
  user: User;
  passengers: Passenger[] = [];

  constructor(private tripService: TripService) {
  }

  ngOnInit(): void {
    this.chosenTrip();
    this.takeUser(this.tripToView.id);
    this.takePassengers(this.tripToView.id);
  }

  takeUser(id: number) {
    this.tripService.getUser(id).subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.log('error') + err;
      }
    );
  }

  takePassengers(id: number) {
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
