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

  public refreshData(event) {
    console.log('event',event)
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