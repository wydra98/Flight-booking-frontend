import {DataSource} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {IntermediateConnection} from '../../flight-view-data';

export class FlightTableDataSource extends DataSource<IntermediateConnection> {
  dataSource: MatTableDataSource<IntermediateConnection>;

  constructor(public tickets: IntermediateConnection[]) {
    super();
    this.dataSource = new MatTableDataSource(tickets);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IntermediateConnection[]> {

    const dataMutations = [
      observableOf(this.dataSource.data)
    ];

    return merge(...dataMutations).pipe(map(() => {
      return [...this.dataSource.data];
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }
}


