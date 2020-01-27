import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.less']
})
export class UserActionComponent implements OnInit {
  @Input() username: string;
  // loggedUsers: Array<string> = [];
  constructor(
    private loginService: LoginService,
    // config: NgbDropdownConfig
    ) { 
      // config.placement = 'bottom-right';
      // config.autoClose = false;
    }
  ngOnInit() {
    // this.loggedUsers.push(this.username);
  }
  logoutClick() {
    this.loginService.logout()
      .subscribe( res => {
        window.location.href = document.location.origin + '/';
    });
  }
  ngOnDestroy() {
  // TODO unsubscribe logout
  }

}
