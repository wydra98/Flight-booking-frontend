import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {AuthorizationService} from "../../auth/authorization.service";
import {Router} from "@angular/router";
import {Airline} from "../../models/airline";
import {AirlineService} from "./airline.service";

/**
 * Data source for the AirlineTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AirlineTableDataSource extends DataSource<Airline> {
  paginator: MatPaginator;
  sort: MatSort;
  dataSource: MatTableDataSource<Airline>;

  constructor(public airlines: Airline[],
              public dialogService: DialogService,
              public snackbar: SnackBarComponent,
              public airlineService: AirlineService,
              public authorizationService: AuthorizationService,
              public router: Router) {
    super();
    this.dataSource = new MatTableDataSource(airlines)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Airline[]> {
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
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Airline[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Airline[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'country':
          return compare(a.country, b.country, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  delete(row) {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz usunąć linię lotniczą? Spowoduje to usunięcie wszystkich elementów z nim związanych' +
      ' i może potrwać chwilę czasu.')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airlineService.deleteAirline(row.id).subscribe(
          () => {
            const oneAirline = this.dataSource.data.find(airline => airline.id == row.id)
            this.dataSource.data.splice(this.dataSource.data.indexOf(oneAirline), 1);
            this.airlineService.isLoading.next(2);
            this.snackbar.showSnackbar('Pomyślnie usunięto linię lotniczą', 'success')
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas usuwania linii lotniczej', 'fail');
          }
        )
      }
    })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
