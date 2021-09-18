// Inject: private snackbar: CustomSnackBarService
// Example: this.snackbar.warning(proj.projectDrop, 4000, 'bottom');

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }

  error(message: string, duration: number, verticalPosition: 'top' | 'bottom') {
    return this._snackBar.open(message, 'Dismiss', {
      panelClass: ['snackbar-error'],
      duration: duration,
      verticalPosition: verticalPosition,
    });
  }

  success(message: string, duration: number, verticalPosition: 'top' | 'bottom') {
    return this._snackBar.open(message, 'Dismiss', {
      panelClass: ['snackbar-success'],
      duration: duration,
      verticalPosition: verticalPosition,
    });
  }

  info(message: string, duration: number, verticalPosition: 'top' | 'bottom') {
    return this._snackBar.open(message, 'Dismiss', {
      panelClass: ['snackbar-info'],
      duration: duration,
      verticalPosition: verticalPosition,
    });
  }

  warning(message: string, duration: number, verticalPosition: 'top' | 'bottom') {
    return this._snackBar.open(message, 'Dismiss', {
      panelClass: ['snackbar-warning'],
      duration: duration,
      verticalPosition: verticalPosition,
    });
  }
}
