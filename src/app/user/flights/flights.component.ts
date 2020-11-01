import { Component, OnInit } from '@angular/core';
import { OrderingService } from '../../services/ordering.service';
import { Trip } from 'src/app/models/trip';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  public flights: Trip[];
  public title$: Observable<string>;
  public isDataFetched = false;

  constructor(
    private orderingService: OrderingService) { }

  ngOnInit(): void {
    this.getFlights();
    this.getComponentsTitle()
  }

  public onFlightSelection(chosenFlight: Trip): void {
    this.orderingService.onChosenFlight(chosenFlight);
  }

  private getFlights(): void {
    this.isDataFetched = false;
    this.orderingService.getFlightsToOrder().subscribe(
      (flights) => {
        this.flights = flights;
        this.assignComponentsTitle();
        setTimeout(() => { this.isDataFetched = true; }, 2000);
      }
    );
  }

  private assignComponentsTitle(): void {
    this.title$ = this.getComponentsTitle();
  }

  private getComponentsTitle(): Observable<string> {
    return this.orderingService.getComponentTitle();
  }
}
