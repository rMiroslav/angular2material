import { Component, OnInit, ViewChild } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { UtilsService } from '../utils.service';
import { DialogOverviewExample } from '../dialog-overview-example/dialog-overview-example.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
   displayedColumns = ['select', 'userName', 'Online Sales', 'Store Sales', 'Email Order'];
   selection = new SelectionModel<string>(true, []);
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
  selectedMore ;
  showChart;

  @ViewChild(MatPaginator) paginator: MatPaginator;
mainData:any;
  public tableData:UserData[] = [];

  constructor(private utils:UtilsService, private modal:DialogOverviewExample) {
    
   }

  ngOnInit() {
    this.utils.getUsers().subscribe(result => {
        this.tableData = result.data
        this.dataSource = new ExampleDataSource(this.tableData, this.paginator);
    } )
    
    
    // console.log(this.utils.getData());
  }

  updateUser(row){
    if(this.selection.selected.length > 1){
      this.selectedMore = true;
    }else{
      this.modal.openDialog(this.selection.selected);
      this.selection.clear();
      // console.log("update user", this.selection.selected);
    }
    
  }


  deleteUser(){
    console.log("delete User")
  }


  isAllSelected(): boolean{
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }
      return true;
    // if (this.filter.nativeElement.value) {
    //   return this.selection.selected.length == this.dataSource.renderedData.length;
    // } else {
    //   return this.selection.selected.length == this.exampleDatabase.data.length;
    // }
  }

   masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    }else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
   }
  dataChart;

  displayChart(row){
    this.showChart = true;
    this.dataChart = [120, 500, 23];
    //  this.utils.setData(this.asd);
    console.log(row);
  }

}


/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export class UserData implements ExampleDatabase{
  name: string;
  online_sales: number;
  store_salers: number;
  email_order: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };

    // this.utils.getData().subscribe(result =>  return result);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
