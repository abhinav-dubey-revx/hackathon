import { MatSnackBar } from '@angular/material';
import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { PopoverService } from './popover.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'popover',
    templateUrl: './popover.compopnent.html',
    styleUrls: ['./popover.compopnent.less']
})
export class PopoverComponent {
    durationInSeconds = 5 * 1000;
    @ViewChild('snackBar', {static: false}) public snackBarEle: TemplateRef<any>;

    show = false;
    private subscription: Subscription;
    constructor(
        private snackBar: MatSnackBar,
        private popoverservice: PopoverService
    ) {}
  
    ngOnInit() {
        this.subscription = this.popoverservice.popoverState
            .subscribe((state) => {
                this.show = state.show;
                this.openSnackBar();
            });
    }
    public openSnackBar() {
    //   this.snackBar.openFromComponent(PizzaPartyComponent, {
    //     duration: this.durationInSeconds * 1000,
    //   });
        this.snackBar.openFromTemplate(this.snackBarEle, {
            duration: this.durationInSeconds * 1000,
        });
    }
}     