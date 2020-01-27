import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule, MatToolbarModule, MatIconModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SharedModule } from 'src/shared-module/shared-module.module';
import { BaseService } from 'src/service/base.service';
import { DataService } from 'src/service/data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

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
