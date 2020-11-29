import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {UserTableDataSource} from './user-table-datasource';
import {User} from '../../models/user';
import {AuthorizationService} from '../../auth/authorization.service';
import {DialogService} from '../../services/dialog.service';
import {SnackBarComponent} from '../../snack-bar/snack-bar.component';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: UserTableDataSource;
  users: User[];
  isDataFetched: boolean;

  constructor(private userService: UserService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'surname', 'email', 'delete'];

  ngOnInit() {
    this.userService.isLoading.next(0);
    this.fetchUsers();
    this.userService.getLoading().subscribe(
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

  public fetchUsers(): void {
    this.userService.fetchUsers()
      .subscribe(
        (users: User[]) => {
          let usersFiltered = [];
          for (let i = 0; i < users.length; i++) {
            if (users[i].role == 'ROLE_USER') {
              usersFiltered.push(users[i]);
            }
          }
          this.users = usersFiltered;
          this.dataSource = new UserTableDataSource(this.users, this.dialogService, this.snackbar,
            this.userService, this.auth, this.router);

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }
      );
  }

  delete(row) {
    this.dataSource.delete(row);
  }
}
