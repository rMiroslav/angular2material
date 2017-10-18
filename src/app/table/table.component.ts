// import { Component, OnInit, ViewChild } from '@angular/core';
// import {DataSource} from '@angular/cdk/collections';
// import {MatPaginator} from '@angular/material';
// import {SelectionModel} from '@angular/cdk/collections';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';

// import { UtilsService } from '../utils.service';


// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit {
//   displayedColumns = ['select', 'userName', 'Online Sales', 'Store Sales', 'Email Order'];
//   selection = new SelectionModel<string>(true, []);
//   exampleDatabase = new ExampleDatabase();
//   dataSource: ExampleDataSource | null;
//   selectedMore ;
//   showChart;

//   @ViewChild(MatPaginator) paginator: MatPaginator;
//     mainData:any;
//     public tableData = new ExampleDatabase();

//   constructor(private utils:UtilsService, private modal:DialogOverviewExample) { }

//   ngOnInit() {
//     this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);

//     this.utils.getUsers().subscribe(result => {
//         // this.dataSource = new ExampleDataSource(this.tableData, this.paginator)
//     });
//   }

//   updateUser(row){
//     if(this.selection.selected.length > 1){
//       this.selectedMore = true;
//     }else{
//       this.modal.openDialog(this.selection.selected);
//       this.selection.clear();
//       // console.log("update user", this.selection.selected);
//     }

//   }


//   deleteUser(){
//     console.log("delete User")
//   }


//   isAllSelected(): boolean{
//    // if (!this.dataSource) { return false; }
//     if (this.selection.isEmpty()) { return false; }
//       return true;
//     // if (this.filter.nativeElement.value) {
//     //   return this.selection.selected.length == this.dataSource.renderedData.length;
//     // } else {
//     //   return this.selection.selected.length == this.exampleDatabase.data.length;
//     // }
//   }

//    masterToggle() {
//     //if (!this.dataSource) { return; }

//     if (this.isAllSelected()) {
//       this.selection.clear();
//     }else {
//       //this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
//     }
//    }
//   dataChart;

//   displayChart(row){
//     this.showChart = true;
//     this.dataChart = [120, 500, 23];
//     //  this.utils.setData(this.asd);
//     console.log(row);
//   }

// }


// /** Constants used to fill up our data base. */
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

// export interface UserData {
//   id?: number | string;
//   name: number | string;
//   online_sales: number | string;
//   store_salers: number | string;
//   email_order: number | string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
//  export class ExampleDatabase {
//   dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
//   get data(): UserData[] { return this.dataChange.value; }

//   constructor() {
//     // Fill up the database with 100 users.
//     for (let i = 0; i < 100; i++) { this.addUser(i); }
//   }

//   /** Adds a new user to the database. */
//   addUser(i) {
//     const copiedData = this.data.slice();
//     copiedData.push(this.createNewUser());
//     this.dataChange.next(copiedData);
//   }

//   /** Builds and returns a new User. */
//   private createNewUser() {
//     const name =
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//     return {
//       id: (this.data.length + 1).toString(),
//       name: name,
//       online_sales: Math.round(Math.random() * 100).toString(),
//       store_salers: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
//       email_order: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//     };

//     // this.utils.getData().subscribe(result =>  return result);
//   }
// }

// /**
//  * Data source to provide what data should be rendered in the table. Note that the data source
//  * can retrieve its data in any way. In this case, the data source is provided a reference
//  * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
//  * the underlying data. Instead, it only needs to take the data and send the table exactly what
//  * should be rendered.
//  */
// export class ExampleDataSource extends DataSource<any> {
//   constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
//     super();
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<UserData[]> {
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._paginator.page,
//     ];

//     return Observable.merge(...displayDataChanges).map(() => {
//       const data = this._exampleDatabase.data.slice();

//       // Grab the page's slice of data.
//       const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//       return data.splice(startIndex, this._paginator.pageSize);
//     });
//   }

//   disconnect() {}
// }
import { MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { UtilsService } from '../utils.service';
import { OrderByPipe } from '../order-by.pipe';
import { DialogOverviewExample } from '../dialog-overview-example/dialog-overview-example.component';
import * as moment from 'moment';
/**
 * @title Basic table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public data: any[] = [];
  subscription: Subscription;
  displayedColumns = ['name', 'online sales', 'store sales', 'email order', 'update', 'delete'];
  dataSource: ExampleDataSource;
  postData;
  userUpdate;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];
  constructor(private utils: UtilsService, private modal: DialogOverviewExample) {

  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public refreshData($event) {
    this.getData();
  }

  ngOnInit() {
     this.getData();
  }

  updateUser(row) {
    this.modal.openDialog(row);
  }

  deleteUser(row) {
    this.utils.deleteUser(row._id).subscribe(result => {
      this.getData();
    });
    
  }



  dataChart;
  displayChart(row) {
    this.dataChart = [row['online_sales'], row['store_sales'], row['mail_order']];
  }

  onPaginateChange(event){
    this.getData(event)
    console.log(event)
  }
  changePage(event){
    console.log(event)
    this.getData(event)
  }
  

  private getData(page?): void {

    if(page){
      this.pageSize = page.pageSize
      this.pageIndex = page.pageIndex;
    }    
    //get all users
    this.utils.getAllUsers().subscribe(result =>{
        this.data = result.data;
    })

        this.utils.getUsers(this.pageIndex, this.pageSize ).subscribe(result =>{
          this.dataSource = new ExampleDataSource(result.data, this.sort, this.utils, this.paginator)
      
    })
   
  }


}

export interface Element {
  name: string;
  online_sales: number;
  store_sales: number;
  mail_order: number;
}


/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
let myData: Element[] = []
export class ExampleDataSource extends DataSource<any> {
  subscription: Subscription;
  constructor(private data: any, private _sort: MatSort, private service: any, private _paginator: MatPaginator) {
    super();
  }
  


  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {

    const displayDataChanges = [
      this.data,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {

      return this.getSortedData();
    });

     
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  getSortedData(): Element[] {
    const data = this.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'online sales': [propertyA, propertyB] = [a.online_sales, b.online_sales]; break;
        case 'store sales': [propertyA, propertyB] = [a.store_sales, b.store_sales]; break;
        case 'email order': [propertyA, propertyB] = [a.mail_order, b.mail_order]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

}