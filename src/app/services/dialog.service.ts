import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatConfirmDialogComponent} from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
