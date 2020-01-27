import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule, MatToolbarModule, MatIconModule, MatPaginatorModule, MatTooltipModule, MatMenuModule, MatOptionModule, MatSelectModule, MatProgressBarModule, MatCheckboxModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { BaseService } from 'src/service/base.service';
import { DataService } from 'src/service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DummyTableComponent } from './dummy-table/dummy-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DummyTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    MatProgressBarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
  ],
  providers: [
    BaseService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
