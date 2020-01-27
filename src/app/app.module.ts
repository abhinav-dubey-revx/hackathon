import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SharedModule } from 'src/shared-module/shared-module.module';
import { BaseService } from 'src/service/base.service';
import { DataService } from 'src/service/data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
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
