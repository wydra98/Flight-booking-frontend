import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";
import {Passenger} from "../../../../models/passenger";


export class PassengersDetailsTableDataSource extends DataSource<Passenger> {
  dataSource: MatTableDataSource<Passenger>;

  constructor(public passengers: Passenger[]) {
    super();
    this.dataSource = new MatTableDataSource(passengers)
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Passenger[]> {

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
  disconnect() {}
}



