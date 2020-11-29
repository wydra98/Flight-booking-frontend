import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderingService} from '../../services/ordering.service';
import {Trip} from 'src/app/models/trip';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {
  public flights: Trip[];
  public title$: Observable<string>;
  public isDataFetched = false;

  constructor(
    private orderingService: OrderingService) {
  }

  ngOnInit(): void {
    this.getFlights();
    this.getSignal();
    this.isDataFetched = false;
    this.getComponentsTitle();
    setTimeout(() => this.isDataFetched = true, 40000);
  }

  public onFlightSelection(chosenFlight: Trip): void {
    this.orderingService.onChosenFlight(chosenFlight);
  }

  private getSignal(): void {
    this.orderingService.getSignal().subscribe(
      (signal) => {
        this.isDataFetched = signal;
      }
    );
  }

  private getFlights(): void {
    this.orderingService.getFlightsToOrder().subscribe(
      (flights) => {
        this.flights = flights;
        this.assignComponentsTitle();
      }
    );
  }

  private assignComponentsTitle(): void {
    this.title$ = this.getComponentsTitle();
  }

  private getComponentsTitle(): Observable<string> {
    return this.orderingService.getComponentTitle();
  }

  ngOnDestroy(): void {
    this.isDataFetched = false;
  }
}
