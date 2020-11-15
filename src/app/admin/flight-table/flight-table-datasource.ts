import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {FlightResponseWithDate} from "./flight-to-view";
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {AuthorizationService} from "../../auth/authorization.service";
import {Router} from "@angular/router";
import {FlightService} from "./flight.service";

/**
 * Data source for the FlightTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FlightTableDataSource extends DataSource<FlightResponseWithDate> {
  paginator: MatPaginator;
  sort: MatSort;
  dataSource: MatTableDataSource<FlightResponseWithDate>;

  constructor(public flightResponse: FlightResponseWithDate[],
              public dialogService: DialogService,
              public snackbar: SnackBarComponent,
              public flightService: FlightService,
              public authorizationService: AuthorizationService,
              public router: Router) {
    super();
    this.dataSource = new MatTableDataSource(flightResponse)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FlightResponseWithDate[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.dataSource.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.dataSource.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: FlightResponseWithDate[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: FlightResponseWithDate[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'airlineName': return compare(a.airlineName, b.airlineName, isAsc);
        case 'numberSeats': return compare(a.numberSeats, b.numberSeats, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'srcAirportName': return compare(a.srcAirportName, b.srcAirportName, isAsc);
        case 'dstAirportName': return compare(a.dstAirportName, b.dstAirportName, isAsc);
        case 'departureDate': return compare(a.departureDateParse, b.departureDateParse, isAsc);
        case 'flightTime': return compare(a.flightTime, b.flightTime, isAsc);
        default: return 0;
      }
    });
  }

  delete(row) {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz usunąć lot? Spowoduje to usunięcie wszystkich elementów z nim związanych' +
      ' i może potrwać chwilę czasu.')
      .afterClosed().subscribe(res => {
      if (res) {
        this.flightService.deleteFlight(row.id).subscribe(
          () => {
            const oneFlight = this.dataSource.data.find(flight => flight.id == row.id)
            this.dataSource.data.splice(this.dataSource.data.indexOf(oneFlight), 1);
            this.flightService.isLoading.next(2);
            this.snackbar.showSnackbar('Pomyślnie usunięto lot', 'success')
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas usuwania lot', 'fail');
          }
        )
      }
    })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
