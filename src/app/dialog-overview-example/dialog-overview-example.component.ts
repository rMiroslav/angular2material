import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilsService } from '../utils.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.component.html'
})
export class DialogOverviewExample {
  @Output('onReceiveData') public onReceiveData: EventEmitter<any> = new EventEmitter();
  // animal: string;
  // name: string;
  data;
  newUser;

  constructor(public dialog: MatDialog, private utils:UtilsService) {}

  openDialog(user): void {
      //new DialogOverviewExampleDialog()
    let info = { user: null };
    if (user) {
      info.user = user;
      
    }

    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '850px',
      data: info
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result
          
      
      if(!user && this.data){
        this.utils.postUser(this.data).subscribe(result => {
          this.newUser = result;
          this.onReceiveData.next(result.data);
        });
      }else if(user && this.data){
        this.utils.updateUser(user._id, user).subscribe(result=> console.log(result))
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  // userForm = new FormGroup({
  //   name: new FormControl(),
  //   online_sales
  // })
   user = {
    name: '',
    online_sales: '',
    store_sales: '',
    mail_order:''
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
      if(this.data.user !== null ){
        this.user = this.data.user;
        // console.log(this.data.user);
      }
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */