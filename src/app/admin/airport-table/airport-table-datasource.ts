import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {Airport} from '../../models/airport';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from '../../services/dialog.service';
import {SnackBarComponent} from '../../snack-bar/snack-bar.component';
import {AuthorizationService} from '../../auth/authorization.service';
import {AirportService} from './airport.service';
import {Router} from '@angular/router';

/**
 * Data source for the AirportTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AirportTableDataSource extends DataSource<Airport> {
  paginator: MatPaginator;
  sort: MatSort;
  dataSource: MatTableDataSource<Airport>;

  constructor(public airports: Airport[],
              public dialogService: DialogService,
              public snackbar: SnackBarComponent,
              public airportService: AirportService,
              public authorizationService: AuthorizationService,
              public router: Router) {
    super();
    this.dataSource = new MatTableDataSource(airports);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Airport[]> {
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
  private getPagedData(data: Airport[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Airport[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'country':
          return compare(a.country, b.country, isAsc);
        case 'timezone':
          return compare(a.timezone, b.timezone, isAsc);
        case 'longitude':
          return compare(a.longitude, b.longitude, isAsc);
        case 'latitude':
          return compare(a.latitude, b.latitude, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }


  delete(row) {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz usunąć lotnisko? Spowoduje to usunięcie wszystkich elementów z nim związanych' +
      ' i może potrwać chwilę czasu.')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airportService.deleteAirport(row.id).subscribe(
          () => {
            const oneAirport = this.dataSource.data.find(airport => airport.id == row.id);
            this.dataSource.data.splice(this.dataSource.data.indexOf(oneAirport), 1);
            this.airportService.isLoading.next(2);
            this.snackbar.showSnackbar('Pomyślnie usunięto lotnisko', 'success');
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas usuwania lotniska', 'fail');
          }
        );
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
