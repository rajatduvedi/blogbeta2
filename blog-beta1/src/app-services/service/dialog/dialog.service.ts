import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public showConfirmDialog(title: string, message: string,
        okButtonString: string, cancelButtonString: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.cancelButtonString = cancelButtonString ;
        dialogRef.componentInstance.okButtonString = okButtonString ;

        return dialogRef.afterClosed();
    }


}
