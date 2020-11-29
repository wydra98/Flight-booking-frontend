import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {FlightTableDataSource} from './flight-table-datasource';
import {FlightResponseWithDate} from './flight-to-view';
import {AuthorizationService} from '../../auth/authorization.service';
import {DialogService} from '../../services/dialog.service';
import {SnackBarComponent} from '../../snack-bar/snack-bar.component';
import {Router} from '@angular/router';
import {FlightService} from './flight.service';

@Component({
  selector: 'app-flight-admin-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.css']
})
export class FlightTableAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FlightResponseWithDate>;
  dataSource: FlightTableDataSource;
  flightResponses: FlightResponseWithDate[];
  isDataFetched: boolean = false;

  constructor(private flightService: FlightService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'srcAirportName', 'departureDate', 'dstAirportName', 'numberSeats', 'price', 'edit', 'delete'];

  ngOnInit() {
    this.flightService.isLoading.next(0);
    this.fetchFlightResponse();
    this.flightService.getLoading().subscribe(
      (number) => {
        switch (number) {
          case 0:
            this.isDataFetched = true;
            break;
          case 1:
            this.isDataFetched = false;
            break;
          case 2:
            this.ngOnInit();
            break;
        }
      }
    );
  }

  public fetchFlightResponse(): void {
    this.flightService.fetchFlightResponse().subscribe(
      (flightsResponse) => {
        flightsResponse.map((flightResponse) => {
          this.flightService.toViewData(flightResponse);
        });
        this.flightResponses = flightsResponse;
        this.dataSource = new FlightTableDataSource(this.flightResponses, this.dialogService, this.snackbar,
          this.flightService, this.auth, this.router);
        this.isDataFetched = true;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    );
  }

  navigateToAddPanel() {
    this.router.navigate(['/flightAdd']);
  }

  navigateToEdit(row) {
    this.flightService.navigateToEdit(row);
  }

  delete(row) {
    this.dataSource.delete(row);
  }

}
