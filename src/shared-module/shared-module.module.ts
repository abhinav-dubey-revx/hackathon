import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover/popover.compopnent';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { LoaderService } from './loader/loader.service';
import { PopoverService } from './popover/popover.service';

@NgModule({
  declarations: [
    PopoverComponent,
    LoaderComponent
  ],
  exports: [
    PopoverComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class SharedModule { 
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        LoaderService,
        PopoverService
      ]
    };
  }
}
