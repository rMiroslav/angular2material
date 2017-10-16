import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UtilsService } from '../utils.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.component.html'
})
export class DialogOverviewExample {

  // animal: string;
  // name: string;
  data;

  constructor(public dialog: MatDialog, private utils:UtilsService) {}

  openDialog(id): void {
    
    
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '850px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result
      if(id){
        console.log('id',id)
        this.data.id = id;
      }
      if(this.data){
        this.utils.postUser(this.data);
      }
    
      // console.log('The dialog was closed', result);
        

      // this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
   user = {
    name: '',
    online_sales: '',
    store_sales: '',
    mail_order:''
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    addUser(): void {
      // console.log('new user', this.user);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */