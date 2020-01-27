import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface PopoverState {
  show: boolean;
}
@Injectable()
export class PopoverService {
    private popoverSubject = new Subject<PopoverState>();
    popoverState = this.popoverSubject.asObservable();
    constructor() { }
    ng
    public show() {
        this.popoverSubject.next(<PopoverState>{ show: true });
    }
    hide() {
        this.popoverSubject.next(<PopoverState>{ show: false });
    }
}