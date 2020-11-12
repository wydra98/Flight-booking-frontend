import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {TripToView} from "./trip-to-view";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {TripService} from "./trip.service";
import {AuthorizationService} from "../../auth/authorization.service";
import {ChangeDetectorRef} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

/**
 * Data source for the TicketTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TripTableDatasource extends DataSource<TripToView> {
  paginator: MatPaginator;
  sort: MatSort;
  dataSource: MatTableDataSource<TripToView>;

  constructor(public trips: TripToView[],
              public dialogService: DialogService,
              public snackbar: SnackBarComponent,
              public tripService: TripService,
              public authorizationService: AuthorizationService,
              public cd: ChangeDetectorRef) {
    super();
    this.dataSource = new MatTableDataSource(trips)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TripToView[]> {
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
  private getPagedData(data: TripToView[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TripToView[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        //   case 'name': return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  delete(row) {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz anulować rezerwację?')
      .afterClosed().subscribe(res => {
      if (res) {
        //console.log(row.id)
        this.tripService.deleteTrip(row.id).subscribe(
          () => {
            const oneTrip = this.dataSource.data.find(trip => trip.id == row.id)
            this.dataSource.data.splice(this.dataSource.data.indexOf(oneTrip), 1);
            this.connect()
            this.paginator._changePageSize(this.paginator.pageSize);

            this.snackbar.showSnackbar('Pomyślnie anulowano rezerwację', 'success');
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas usuwania', 'fail');
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

