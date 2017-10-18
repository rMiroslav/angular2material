import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSortModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { UtilsService } from './utils.service';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { DialogOverviewExample, DialogOverviewExampleDialog } from './dialog-overview-example/dialog-overview-example.component';
import { ChartComponent } from './chart/chart.component';
import { OrderByPipe } from './order-by.pipe';
import {MomentModule} from 'angular2-moment/moment.module';

@NgModule({
  entryComponents: [ 
    DialogOverviewExample, 
    DialogOverviewExampleDialog 
    ],
  declarations: [
    AppComponent,
    TableComponent,
    DialogOverviewExample,
    DialogOverviewExampleDialog,
    ChartComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MomentModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [UtilsService, DialogOverviewExample],
  bootstrap: [AppComponent]
})
export class AppModule { }
